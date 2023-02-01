import React, { useState, useEffect,useRef } from "react"
import Header from '../components/header'
import Footer from '../components/footer'
import { Link, animateScroll as scroll } from "react-scroll";
const Pages = (props) => {
    const scrollToTop = () => {
        scroll.scrollToTop(); 
    };
    const wheelTimeout = useRef()
    const onWheel = e => {
        // ... some code I needed ...
    
        // while wheel is moving, do not release the lock
        clearTimeout(wheelTimeout.current)
    
        // flag indicating to lock page scrolling (setTimeout returns a number)
        wheelTimeout.current = setTimeout(() => {
          wheelTimeout.current = false
        }, 300)
    }
    useEffect(() => {
        const cancelWheel = e => wheelTimeout.current && e.preventDefault()
        document.body.addEventListener('wheel', cancelWheel, {passive:false})
        return () => document.body.removeEventListener('wheel', cancelWheel)
    }, [])
    return (
        <div className={props.isDetail == true ? 'contentArea hidden' : 'contentArea'}>
            <Header setSearch={props.setSearch} />
            <div className="contentArea_wrapper">
                {props.children}
            </div>
            <div onClick={() => scrollToTop()}> top </div>
            <Footer />
        </div>
    )
}
export default Pages
