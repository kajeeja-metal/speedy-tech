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
    const [idCate,setIdCate ] = useState(null)
    const [heightCateory,setHeightCateory ] = useState(0)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            const account = Cookies.get('table')
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
                setProducts(product.data)
                setIdCate(product.data)
                setUser(JSON.parse(account))
                // router.push("error")
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])
    const scrolLWithUseRef = (e,i) => {
        
        setHeightCateory(e)
        
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


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout,products,setProducts,idCate,setIdCate,scrolLWithUseRef,setHeightCateory,heightCateory }}>
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