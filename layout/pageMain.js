import React, { useState, useEffect,useRef } from "react"
import Header from '../components/header'
import Footer from '../components/footer'

import dynamic from 'next/dynamic'
import { motion } from "framer-motion";
import Router ,{useRouter}from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
import { Link, animateScroll as scroll } from "react-scroll";
const Pages = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const scrollToTop = () => {
        scroll.scrollToTop(); 
    };
    const[state,setState] = useState({
        loading : false
    })
    const wheelTimeout = useRef()
    const Spinner = () => {
        const content = <div className="loading-pages">
            {/* <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            >
            <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#000"
                strokeWidth="10"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
                transform="rotate(275.845 50 50)"
            >
                <animateTransform
                attributeName="transform"
                type="rotate"
                calcMode="linear"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
                />
            </circle>
            </svg> */}
        </div>;
        return content
    }
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
    useEffect(() => {
        const routeChange = () => {
            // Temporary fix to avoid flash of unstyled content
            // during route transitions. Keep an eye on this
            // issue and remove this code when resolved:
            // https://github.com/vercel/next.js/issues/17464
      
            const tempFix = () => {
              const allStyleElems = document.querySelectorAll('style[media="x"]');
              allStyleElems.forEach((elem) => {
                elem.removeAttribute("media");
              });
            };
            tempFix();
        };
      
        Router.events.on('routeChangeStart', () => {
            routeChange()
            setState({ isLoading: true });
            var body = document.body;
            body.classList.add("lockPage");
            
          });
          Router.events.on('routeChangeComplete', () => {
            routeChange()
            setState({ isLoading: false });
            var body = document.body;
            body.classList.remove("lockPage");
          });
      
          Router.events.on('routeChangeError', () => {
            setState({ isLoading: false });
          });
    },[]);
    return (
        <div className={props.isDetail == true ? 'contentArea hidden' : 'contentArea'}>
            <motion.div className={(state.isLoading ? 'loadingBlur' : '')} initial="initial" animate="animate" exit={{ opacity: 0 }}>
            <Header setSearch={props.setSearch} />
            <div className="contentArea_wrapper">
                {props.children}
            </div>
            <div onClick={() => scrollToTop()}> top </div>
            <Footer />
            </motion.div>
        </div>
    )
}
export default Pages
