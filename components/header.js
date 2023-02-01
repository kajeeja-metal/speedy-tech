import React, { useState, useEffect } from 'react'
import style from '@/styles/header.module.scss'
import Image from 'next/image'
import { Link, animateScroll as scroll } from "react-scroll";

import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
const Header = (props) => {
    const [isSearchBar, setSearchBar] = useState(false)
    const data = useAuth()
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const onChangeFunc = (e) => {
        const { name, value } = e.target
        props.setSearch(value)
    }
    const backBtn = (e) => {
        setSearchBar(false)
        props.setSearch('')
    }
    
    return (
        <>
            <header className={style.header}>
                <div className={style.appName}>
                    {isSearchBar &&
                        <div className={style.btnBack + ' icon_back'} onClick={(e) => backBtn()} />
                    }
                    <div className={style.groupText}>
                        <h1>{data?.user?.shop_name[locale]}</h1>
                        <p>{data?.user?.branch_name[locale] +" - "+ data?.user?.table_name[locale]}</p>
                    </div>
                </div>
                <div className={style.swichNav}>
                    {isSearchBar == true ?
                        <div className={style.searchBar}>
                            <div className={style.icon + ' icon_search'} />
                            <input type={'text'} placeholder={'Search menu'} onChange={(e) => onChangeFunc(e)} />
                        </div>
                        :
                        <div className={style.navBar + ' navBar'}>
                            <div className={style.icon + ' icon_search'} onClick={(e) => setSearchBar(true)} />
                            <div className={style.groupNav}>
                                {
                                    data?.products && data.products.map((item,i) =>{
                                        return <Link className={style.navItem} to={`sec_${i}`} spy={true} smooth={true} exact='true' offset={-50} duration={50} >
                                        <span>{item.category_name[locale]}</span>
                                    </Link>
                                    })
                                }
                                {/* <Link className={style.navItem} to="sec_1" spy={true} smooth={true} offset={-200} duration={50} >
                                    <span>Recommended</span>
                                </Link>
                                <Link className={style.navItem} to="sec_2" spy={true} smooth={true} offset={-200} duration={50} >
                                    <span>Menu-1</span>
                                </Link>
                                <Link className={style.navItem} to="sec_3" spy={true} smooth={true} offset={-200} duration={50} >
                                    <span>Menu-2</span>
                                </Link> */}
                            </div>
                        </div>
                    }
                </div>
            </header>
        </>

    )
}
export default Header