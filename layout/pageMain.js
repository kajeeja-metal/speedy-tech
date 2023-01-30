import React, { useState, useEffect } from "react"
import Header from '../components/header'
import Footer from '../components/footer'
const Pages = (props) => {


    useEffect(() => {

    }, [])
    return (
        <div className={props.isDetail == true ? 'contentArea hidden' : 'contentArea'} >
            <Header setSearch={props.setSearch} />
            <div className="contentArea_wrapper">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}
export default Pages
