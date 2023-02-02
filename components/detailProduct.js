import React, { useState, useEffect } from 'react'
import style from '@/styles/detailProduct.module.scss'
import Image from 'next/legacy/image'
import Accordion from 'react-bootstrap/Accordion';
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
const DetailProduct = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const [count, setCount] = useState(1);
    const plusFunc = () => {
        setCount(count + 1);
    };
    const minusFunc = () => {
        if (count === 0) {
            return;
        }
        setCount(count - 1);
    };
    const { dataItem } = props
    return (
        <>
            <div className={style.overlay} onClick={(e) => props.setDetail(false)} ></div>
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className={style.DetailProduct}
            >
                <div className={style.title}>
                    <h1>{dataItem.name[locale]}</h1>
                    <div className={style.btnClose + ' icon_close'} onClick={(e) => props.setDetail(false)} />
                </div>
                <div className={style.scrollDtail}>
                    <div className={style.pic}>
                        <Image src={dataItem?.image_url ? dataItem?.image_url : "/img/product.jpg"} alt="" width={300} height={300} layout={'responsive'} style={{objectFit:"cover"}} />
                    </div>
                    <div className={style.nameProduct}>
                        <div className={style.row}>
                            <h1 style={{ paddingRight: "30px" }}>{dataItem.name[locale]}</h1>
                            <h1>{dataItem?.sale_price != 0 && dataItem?.sale_price ? <>
                                <span>
                                  {dataItem.sale_price} ฿
                                </span>
                                <span  className='discount-price'>
                                  {
                                     dataItem.price
                                  } ฿

                                </span>
                                </> : ""}</h1>
                        </div>
                        <div className={style.row}>
                            <p>{dataItem.description[locale]}</p>
                        </div>
                    </div>

                    <Accordion className='AccordionCustom' defaultActiveKey={[0, 1]} alwaysOpen>
                        {
                            dataItem.attributes.map((attr, i) => {
                                return (
                                    <Accordion.Item eventKey={i}>
                                        <Accordion.Header>
                                            <p className={style.subMenu}> {attr.attribute.name[locale]} <span>Select at least {attr.attribute.choice_limit} item</span></p>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {
                                                attr.attribute.choice_limit <= 1 ?
                                                    <div className='optionItem'>
                                                        {
                                                            attr.options.map((opt, i) => {
                                                                return (

                                                                    <div className="form-check mb-3">
                                                                        <input className="form-check-input" type="radio" name={attr.attribute._id} id="radio_1" />
                                                                        <label className="form-check-label" htmlFor="radio_1">
                                                                            <span>{opt.name[locale]}</span>
                                                                            <span>{opt.price ? "฿" : ''}</span>
                                                                        </label>
                                                                    </div>

                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    <div className='optionItem'>
                                                        {
                                                            attr.options.map((opt, i) => {
                                                                return (

                                                                    <div className="form-check mb-3">
                                                                        <input className="form-check-input" type="checkbox" id={"check_" + opt._id} />
                                                                        <label className="form-check-label" htmlFor={"check_" + opt._id}>
                                                                            <span>{opt.name[locale]}</span>
                                                                            <span>{opt.price ? "฿" : ''} </span>
                                                                        </label>
                                                                    </div>

                                                                )
                                                            })
                                                        }
                                                    </div>
                                            }

                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            })
                        }
                    </Accordion>



                    <div className={style.note}>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="note">Additional info</label>
                            <textarea className="form-control" id="note" rows={3} defaultValue={"Example No Vegetable"} />
                        </div>
                    </div>
                    <div className={style.countNumber}>
                        <button className={style.btnCount} onClick={() => minusFunc()}>-</button>
                        <h1>{count}</h1>
                        <button className={style.btnCount} onClick={() => plusFunc()}>+</button>
                    </div>
                    <div className={style.group_button + ' p-3'}>
                        <button className={style.addToCart}>
                            <span>Add to cart</span>
                            <span>฿ 0</span>
                        </button>
                    </div>

                </div>
            </motion.div>
        </>

    )
}
export default DetailProduct