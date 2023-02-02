import React, { useState, useEffect } from 'react'
import style from '@/styles/header.module.scss'
import Image from 'next/legacy/image'
import { Link, animateScroll as scroll } from "react-scroll";

import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
import Slider from "react-slick";
const Header = (props) => {
    const [isSearchBar, setSearchBar] = useState(false)
    const data = useAuth()
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const settings = {
        className: "slider variable-width",
        centerMode: false,
        infinite: false,
        slidesToShow: 3,
        speed: 500,
        variableWidth: true
      };
    const onChangeFunc = (e) => {
        const { name, value } = e.target
        props.setSearch(value)
    }
    const backBtn = (e) => {
        setSearchBar(false)
        props.setSearch('')
    }
    const handleRoute = (locale) => router.push(`${locale}${router.asPath}`, `${locale}${router.asPath}`, { locale: false })
    return (
        <>
            <header className={style.header}>
                <div className={style.topbar_menu}>
                    <div className={style.logo}>
                        <Image src={'/images/logo.png'} width={36} height={36} alt="logo"></Image>
                    </div>
                    <div className={style.group_shop}>
                        <div className={style.name}>{data?.user?.shop_name[locale]}</div>
                        <div className={style.table}><span>{data?.user?.table_name[locale]}</span></div>
                    </div>
                    <div className={style.active_all_menu}>
                        <div>
                            <i className="fal fa-bell" aria-hidden="true"></i>
                        </div>
                        <div>
                        <i className="fal fa-file-text" aria-hidden="true" onClick={() => {router.push('/order')}}></i>
                        </div>
                        {
                            router.locale == "th" ? 
                            <div className={style.lang_change} onClick={() => handleRoute("en")}>
                                <img src="/images/thai.png" width={20}></img>
                            </div> 
                            : 
                            <div className={style.lang_change}>
                                <img src="/images/thai.png" width={20}  onClick={() => handleRoute("th")}></img>
                            </div>
                        }
                        
                    </div>
                </div>
                {/* <div className={style.appName}>
                    {isSearchBar &&
                        <div className={style.btnBack + ' icon_back'} onClick={(e) => backBtn()} />
                    }
                    <div className={style.groupText}>
                        <h1>{data?.user?.shop_name[locale]}</h1>
                        <p>{data?.user?.branch_name[locale] +" - "+ data?.user?.table_name[locale]}</p>
                    </div>
                </div> */}
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
                                <Slider {...settings}>
                                {
                                    data?.products && data.products.map((item,i) =>{
                                        return <Link className={style.navItem} to={`sec_${i}`} spy={true} smooth={true} exact='true' offset={-50} duration={50} >
                                        <span>{item.category_name[locale]}</span>
                                    </Link>
                                    })
                                }
                                </Slider>
                                {/* {
                                    data?.products && data.products.map((item,i) =>{
                                        return <div onClick={(e) => data.scrolLWithUseRef(i,e)} className={style.navItem} to={`sec_${i}`} spy={true} smooth={true} exact='true' offset={-50} duration={50} >
                                        <span>{item.category_name[locale]}</span>
                                    </div>
                                    })
                                } */}
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