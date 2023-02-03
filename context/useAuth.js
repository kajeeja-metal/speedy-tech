import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { getMe,getScanqr } from '@/services/auth'
import {getProducts} from "@/services/getServices"
import Router ,{ useRouter } from 'next/router';
import { connect } from 'react-redux';
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [slideIndex, setSlideIndex] = useState(0)
    const [updateCount, setUpdateCount] = useState(0)
    const [transitions, setTransitions] = useState({
        customer : {
            name : "",
            tel : "",
            line_uid : "",
            note : "",
            expected_date : "",
            total : ""
        },
        products : []
    })
    const [idCate,setIdCate ] = useState(null)
    const [heightCateory,setHeightCateory ] = useState(0)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            const account = Cookies.get('table')
            setTransitions({
                customer : {
                    name : "",
                    tel : "",
                    line_uid : "",
                    note : "",
                    expected_date : "",
                    total : ""
                },
                products : []
            })
            if (router.query?.slug || !account ) {
                // console.log(router.query.code)
                const data = await getScanqr(router.query.slug)
                if(data?.data){
                    Cookies.set('token', data.data.token, { expires: 1 })
                    let product = await getProducts().then((res)=>{
                        return res
                    })
                    setProducts(product.data)
                    
                    setUser(data.data)
                    setTransitions({
                        customer : {
                            name : "",
                            tel : "",
                            line_uid : "",
                            note : "",
                            expected_date : "",
                            total : ""
                        },
                        products : []
                    })
                    // setIdCate(product.data)
                    Cookies.set('table',JSON.stringify(data.data), { expires: 1 })
                    Router.push('/')
                }else{
                    // throw new Exception('Unauthorized', 401)
                }
                
                // console.log("Got a token in the cookies, let's see if it is valid")
                // const data = await getMe(token)
                // if (data) setUser(data);
            }else{
                let product = await getProducts().then((res)=>{
                    return res
                })
                console.log(JSON.parse(account))
                setProducts(product.data)
                setIdCate(product.data)
                setTransitions({
                    customer : {
                        name : "",
                        tel : "",
                        line_uid : "",
                        note : "",
                        expected_date : "",
                        total : ""
                    },
                    products : []
                })
                setUser(JSON.parse(account))
                // router.push("error")
            }
            setLoading(false)
        }
        loadUserFromCookies()
        console.log("transitions",transitions)
    }, [])
    const scrolLWithUseRef = (e,i) => {
        
        setHeightCateory(e)
        setUpdateCount(e)
        console.log('scrolLWithUseRef',e,i)
        // divFive.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    };
    const login = async (code) => {
        const { data: token } = await getScanqr(code)
        if (token) {
            // console.log("Got token")
            Cookies.set('token', token.token, { expires: 1 })
            // api.defaults.headers.Authorization = `Bearer ${token.token}`
            // const { data: user } = await getMe(token.token)
            // setUser(user)
            //     ("Got user", user)
        }
    }

    const logout = (email, password) => {
        Cookies.remove('token')
        setUser(null)
        delete api.defaults.headers.Authorization
        // window.location.pathname = '/login'
    }

    const addToOrder = (order,qty,options,note) => {
        // console.log('transitions',order._id,qty,options,note)
        const sum = transitions.products.reduce((accumulator, object) => {
            return accumulator + object.qty;
        }, 0);
        setTransitions((prev) => ({
            customer : {
                name : "",
                tel : "",
                line_uid : "",
                note : "",
                expected_date : "",
                total : sum + qty
            },
            products : [
                ...prev.products , {
                    product_id : order._id,
                    qty: qty,
                    note : note,
                    options : options
                }
            ]
        }))
        
        
    }
    console.log(transitions)
    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout,products,setProducts,idCate,setIdCate,scrolLWithUseRef,setHeightCateory,heightCateory,transitions, setTransitions,slideIndex, setSlideIndex , updateCount, setUpdateCount ,addToOrder}}>
            {children}
        </AuthContext.Provider>
    )
}

export const login = async (email, password) => {
    const { data: token } = await getAuth(email, password)
    if (token) {
        // console.log("Got token")
        Cookies.set('token', token.token, { expires: 60 })
        // api.defaults.headers.Authorization = `Bearer ${token.token}`
        const { data: user } = await getMe(token.token)
        setUser(user)
        // console.log("Got user", user)
    }
}

export const useAuth = () => useContext(AuthContext)