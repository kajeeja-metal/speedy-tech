import Head from 'next/head'
import Image from 'next/image'
import Pages from '/layout/pageMain'
import Link from 'next/link'
import style from '@/styles/productList.module.scss'
import DetailProduct from '@/components/detailProduct'
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
const Index = (props) => {
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
  console.log(dataContext)
  const openModelDataItem = (data) => {
    setDataItems(data)
    setDetail(true)
  }
  return (
    <Pages isDetail={isDetail} setSearch={setSearch}>
      {Search == '' ?
        <>
          <section className={style.productRec} id={'sec_20'}>
            <h1 className={style.title}>Recommended</h1>
            <div className={style.group}>
              <div className={style.item} onClick={(e) => setDetail(true)}>
                <div className={style.pic}>
                  <Image src="/img/product.jpg" alt="" width={300} height={300} />
                </div>
                <div className={style.detail}>
                  <h1>Product Rec</h1>
                  <p>158</p>
                </div>
              </div>
              <div className={style.item} onClick={(e) => setDetail(true)}>
                <div className={style.pic}>
                  <Image src="/img/product.jpg" alt="" width={300} height={300} />
                </div>
                <div className={style.detail}>
                  <h1>Product Rec</h1>
                  <p>158</p>
                </div>
              </div>
              <div className={style.item} onClick={(e) => setDetail(true)}>
                <div className={style.pic}>
                  <Image src="/img/product.jpg" alt="" width={300} height={300} />
                </div>
                <div className={style.detail}>
                  <h1>Product Rec</h1>
                  <p>158</p>
                </div>
              </div>
            </div>
          </section>
          {
            dataContext.products.map((group_cat,index) => {
              return (
                <section className={style.productList} id={`sec_${index}`}>
                  <h1 className={style.title}>{group_cat.category_name[locale]}</h1>
                  <div className={style.group}>
                    {
                      group_cat.menus.map((menu,i) => {
                        return (
                          <div className={style.item} onClick={(e) => openModelDataItem(menu)}>
                            <div className={style.pic}>
                              <Image src="/img/product.jpg" alt="" width={100} height={100} />
                            </div>
                            <div className={style.detail}>
                              <div className={style.row}>
                                <h1>{menu.name[locale]}</h1>
                                <p>{menu.description[locale]}</p>
                              </div>
                              <div className={style.row}>
                                <p className='txt-md text-dark'>{menu.sale_price != null ? menu.sale_price : menu.price}฿</p>
                              </div>
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
          
          {/* <section className={style.productList} id={'sec_3'}>
            <h1 className={style.title}>Menu-2</h1>
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
