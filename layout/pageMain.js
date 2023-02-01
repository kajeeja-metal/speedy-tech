import React, { useState, useEffect } from "react"
import Header from '../components/header'
import Footer from '../components/footer'
import { Link, animateScroll as scroll } from "react-scroll";
const Pages = (props) => {
    const scrollToTop = () => {
        scroll.scrollToTop(); 
    };

    useEffect(() => {

    }, [])
    return (
        <div className={props.isDetail == true ? 'contentArea hidden' : 'contentArea'} >
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
