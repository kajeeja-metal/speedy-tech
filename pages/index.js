import Head from 'next/head'
import Image from 'next/legacy/image'
import Pages from '/layout/pageMain'
import Link from 'next/link'
import style from '@/styles/productList.module.scss'
import DetailProduct from '@/components/detailProduct'
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
import ScrollSpy from "react-ui-scrollspy";
import Slider from "react-slick";
const Index = (props) => {
  let refs = useRef(null);
  const [isDetail, setDetail] = useState(false)
  const [dataItems, setDataItems] = useState([])
  const dataContext = useAuth()
  const router = useRouter()
  const { locale } = router
  const t = locale === "en" ? en : th
  const [Search, setSearch] = useState('')
  useEffect(() => {
    if (Search != '') {
      window.scrollTo(0, 0)
    }
  }, [Search])
  // useEffect(() => {
  //   // refs.current[0].current.focus()
  //   refs.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  //   // dataContext.setHeightCateory()
  // }, [dataContext.heightCateory]);
  useEffect(()=>{
    if(!isDetail){
      var body = document.body;
      body.classList.remove("lockPage");
    }
    
  },[isDetail])
  const openModelDataItem = (data) => {
    var body = document.body;
    body.classList.add("lockPage");
    setDataItems(data)
    setDetail(true)
  }
  // console.log(dataContext.transitions)
  return (
    <Pages isDetail={isDetail} setSearch={setSearch}>
      
      {Search == '' ?
        <>
          {
            dataContext.products.map((group_cat,index) => {
              return (
                group_cat.category_recommend ? 
                <section className={style.productRec} id={`sec_${index}`} ref={index === dataContext?.heightCateory ? refs : null}>
                  <h1 className={style.title}>{group_cat.category_name[locale]}</h1>
                  <div className={style.group}>
                    
                    {group_cat.menus.map((menu,i) => {
                      return (
                          <div className={style.item} onClick={(e) => openModelDataItem(menu)}>
                            <div className={style.pic}>
                              <Image src={menu?.image_url ? menu?.image_url : "/img/product.jpg"}  alt={menu?.image_url} width={300} height={300} layout={'responsive'} style={{objectFit:"cover"}} />
                            </div>
                            <div className={style.detail}>
                              <h1>{menu.name[locale]}</h1>
                              <p>{menu?.sale_price != 0 && menu?.sale_price ?  (
                                <>
                                <span>
                                  {menu.sale_price} ฿
                                </span>
                                <span  className='discount-price'>
                                  {
                                     menu.price
                                  } ฿
                                </span>
                                </>
                              ) : menu.price +" ฿"} </p>
                            </div>
                          </div>
                      )
                    })}
                  </div>
                </section>
                :
                <section className={style.productList} id={`sec_${index}`} ref={index === dataContext?.heightCateory ? refs : null}>
                  <h1 className={style.title}>{group_cat.category_name[locale]}</h1>
                  <div className={style.group}>
                    {
                      group_cat.menus.map((menu,i) => {
                        return (
                          <div className={style.item} onClick={(e) => openModelDataItem(menu)}>
                            <div className={style.pic}>
                              <Image src={menu?.image_url ? menu?.image_url : "/img/product.jpg"} alt="" width={110} height={110} objectFit={"cover"} />
                            </div>
                            <div className={style.detail}>
                              <div className={style.row}>
                                <h1>{menu.name[locale]}</h1>
                                <p>{menu.description[locale]}</p>
                              </div>
                              {menu.price != 0 && <div className={style.row}>
                                <p className='txt-md text-dark' style={{'fontSize' : '20px'}}>{menu?.sale_price != 0 && menu?.sale_price ?  (
                                <>
                                <span>
                                  {menu.sale_price} ฿
                                </span>
                                <span  className='discount-price'>
                                  {
                                     menu.price
                                  } ฿

                                </span>
                                </>
                              ) : menu.price + " ฿"}</p>
                              </div>}
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </section>
              )
            })
          }
          
        </>
        :
        <>
          {/* <section className={style.productList}>
            <div className={style.group}>
              <div className={style.item} onClick={(e) => setDetail(true)}>
                <div className={style.pic}>
                  <Image src="/img/product.jpg" alt="" width={100} height={100} />
                </div>
                <div className={style.detail}>
                  <div className={style.row}>
                    <h1>Product Rec</h1>
                    <p>Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่</p>
                  </div>
                  <div className={style.row}>
                    <p className='txt-md text-dark'>990$</p>
                  </div>
                </div>
              </div>
              <div className={style.item} onClick={(e) => setDetail(true)}>
                <div className={style.pic}>
                  <Image src="/img/product.jpg" alt="" width={100} height={100} />
                </div>
                <div className={style.detail}>
                  <div className={style.row}>
                    <h1>Product Rec</h1>
                    <p>Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่</p>
                  </div>
                  <div className={style.row}>
                    <p className='txt-md text-dark'>990$</p>
                  </div>
                </div>
              </div>
              <div className={style.item} onClick={(e) => setDetail(true)}>
                <div className={style.pic}>
                  <Image src="/img/product.jpg" alt="" width={100} height={100} />
                </div>
                <div className={style.detail}>
                  <div className={style.row}>
                    <h1>Product Rec</h1>
                    <p>Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่</p>
                  </div>
                  <div className={style.row}>
                    <p className='txt-md text-dark'>990$</p>
                  </div>
                </div>
              </div>
              <div className={style.item} onClick={(e) => setDetail(true)}>
                <div className={style.pic}>
                  <Image src="/img/product.jpg" alt="" width={100} height={100} />
                </div>
                <div className={style.detail}>
                  <div className={style.row}>
                    <h1>Product Rec</h1>
                    <p>Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่</p>
                  </div>
                  <div className={style.row}>
                    <p className='txt-md text-dark'>990$</p>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </>
      }

      <AnimatePresence initial={false}>
        {isDetail &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modelUp"
          >
            
            <DetailProduct setDetail={setDetail} dataItem={dataItems} />
          </motion.div>
        }
      </AnimatePresence>


    </Pages>
  )
}
export default Index
