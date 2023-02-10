import React, { useState, useEffect } from 'react'
import style from '@/styles/detailProduct.module.scss'
import Image from 'next/legacy/image'
import Accordion from 'react-bootstrap/Accordion';
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/router'
import { useAuth } from '@/context/useAuth';
import en from '@/locales/en'
import th from '@/locales/th'
const DetailProduct = (props) => {
    const { dataItem } = props
    const router = useRouter()
    const { locale } = router
    const { addToOrder,setTransitions } = useAuth()
    const [options,setOptions] = useState([])
    const [options_detail,setOptionsDetail] = useState([])
    const [note,setNote] = useState('')
    const t = locale === "en" ? en : th
    const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(dataItem?.sale_price != 0 && dataItem?.sale_price ? dataItem?.sale_price : dataItem?.price);
    const [req , setReq] = useState(dataItem.attributes)
    const [enabled, setEnabled] = useState(true)
    const plusFunc = () => {
        let priceItem = dataItem?.sale_price != 0 && dataItem?.sale_price ? dataItem?.sale_price : dataItem?.price
        setCount(count + 1);
        setTotalPrice(priceItem * (count + 1))
    };
    const minusFunc = () => {
        let priceItem = dataItem?.sale_price != 0 && dataItem?.sale_price ? dataItem?.sale_price : dataItem?.price
        if (count === 0) {
            return;
        }
        setCount(count - 1);
        setTotalPrice(priceItem * (count - 1))
    };
    const onChangeAddtoOrder = (e,id,limit,data,cho_id) => {
        const {name,value,checked,type} = e.target
        var checks = document.querySelectorAll("."+id);
        var max = limit;
        for (var i = 0; i < checks.length; i++)
        checks[i].onclick = selectiveCheck;
        var checkedCheckss = document.querySelectorAll("."+id+":checked");
        function selectiveCheck (event) {
            var checkedChecks = document.querySelectorAll("."+id+":checked");
            if (checkedChecks.length >= max + 1){
                return false
            }
        }

        if(type != "radio"){
            if(checked && checkedCheckss.length <= limit){
                setOptions((prev) => [...prev,value])
                setOptionsDetail((prev) => [...prev,{ch_id:cho_id,...data}])
                setTotalPrice((prev) => prev + data.price)
                if(checkedCheckss.length == limit){
                    var arr = Array.from(document.getElementsByClassName("check_" + cho_id));
                    arr.map((checkbox) =>  {
                        if(!checkbox.checked){
                           
                           checkbox.disabled = true 
                        }
                        
                    })
                }
            }else{
                if(checkedCheckss.length <= limit){
                    const index = options.indexOf(value);
                    const x = options.splice(index, 1);
                    options_detail.splice(index, 1);
                    setOptions(options)
                    setOptionsDetail(options_detail)
                    setTotalPrice((prev) => prev - data.price)
                    var arr = Array.from(document.getElementsByClassName("check_" + cho_id));
                    arr.map((checkbox) =>  {
                        if(!checkbox.checked){
                           checkbox.disabled = false 
                        }
                    })
                }else{
                    
                    return false
                }
            }
        }else{
            if(options_detail.filter((v) => v.ch_id == cho_id).length == 0){
                setOptions((prev) => [...prev,value])
                setOptionsDetail((prev) => [...prev,{ch_id:cho_id,...data}])
                setTotalPrice((prev) => prev + data.price)
            }else{
                let indexOptions = options.indexOf(value);
                options.splice(indexOptions, 1);
                let index = options_detail.map(e => e.ch_id).indexOf(cho_id)
                options_detail.splice(index, 1);
                setOptionsDetail((prev) => [...options_detail,{ch_id:cho_id,...data}])
                setOptions(options)
                const sum = [...options_detail,{ch_id:cho_id,...data}].reduce((accumulator, object) => {
                    return accumulator + object.price;
                }, 0);
                setTotalPrice((dataItem?.sale_price != 0 && dataItem?.sale_price ? dataItem?.sale_price : dataItem?.price) + sum)
            }
        }
    }
    const onChangeNoteOrder = (e) => {
        const {name,value} = e.target
        setNote(value)
    }
    useEffect(() => {
        let checkLimit = dataItem.attributes.map(e => e.attribute)
        let checkSelectOptions = options_detail.map(e => e.ch_id)
        checkLimit.filter((limit) => limit.choice_min >= 0)
        console.log(checkLimit.length)
        setEnabled(checkLimit.length > 0)
        console.log(checkLimit , checkSelectOptions )
    },[options_detail])

    // useEffect(() => {
    //     console.log(dataItem.attributes.map(e => e.attribute).filter(v => v.choice_min == 0).length <= 0)
    //     if(dataItem.attributes.map(e => e.attribute).filter(v => v.choice_min == 0).length <= 0){
    //         setEnabled(false)
    //     }else{
    //         setEnabled(true)
    //     }
    // },[dataItem])
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
                            <h1>{dataItem.name[locale]}</h1>
                            <h1 style={{ width: "100px",textAlign:'center' }}>{dataItem?.sale_price != 0 && dataItem?.sale_price ? <>
                                <span>
                                  {dataItem.sale_price} ฿
                                </span>
                                <span  className='discount-price'>
                                  {
                                     dataItem.price
                                  } ฿

                                </span>
                                </> : dataItem.price + " ฿"}</h1>
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
                                            <p className={style.subMenu}> {attr.attribute.choice_min > 0  && <span style={{color: "red",fontSize : '20px'}}>* </span>}{attr.attribute.name[locale]} <span style={{display : "block"}}>Select at least {attr.attribute.choice_limit} item</span></p>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {
                                                attr.attribute.choice_limit <= 1 ?
                                                    <div className='optionItem'>
                                                        {
                                                            attr.options.map((opt, i) => {
                                                                return (

                                                                    <div className="form-check mb-3">
                                                                        <input className="form-check-input" type="radio" name={attr.attribute._id} id={"radio_"+i} value={opt._id} onClick={(e) => {onChangeAddtoOrder(e,"check_" + attr.attribute._id,attr.attribute.choice_limi,opt,attr.attribute._id)}} />
                                                                        <label className="form-check-label" htmlFor={"radio_"+i}>
                                                                            <span>{opt.name[locale]}</span>
                                                                            <span>{opt.price ? "+"+opt.price +" ฿" : ''}</span>
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
                                                                        <input className={"form-check-input"+" check_" + attr.attribute._id} type="checkbox" id={"check_" + opt._id} value={opt._id} onClick={(e) => {onChangeAddtoOrder(e,"check_" + attr.attribute._id,attr.attribute.choice_limit,opt,attr.attribute._id)}} />
                                                                        <label className="form-check-label" htmlFor={"check_" + opt._id}>
                                                                            <span>{opt.name[locale]}</span>
                                                                            <span>{opt.price ? "+"+opt.price +" ฿" : ''} </span>
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
                            <textarea className="form-control" id="note" rows={3} placeholder={t.additional} defaultValue={""} onChange={(e) => {onChangeNoteOrder(e)}} />
                        </div>
                    </div>
                    <div className={style.countNumber}>
                        <button className={style.btnCount} onClick={() => minusFunc()}>-</button>
                        <h1>{count}</h1>
                        <button className={style.btnCount} onClick={() => plusFunc()}>+</button>
                    </div>
                    <div className={style.group_button + ' p-3 ' + enabled} disabled={enabled} onClick={() => {
                        if(!enabled) {
                            addToOrder(dataItem,count,options,note,totalPrice,options_detail)
                            props.setDetails(false)
                        }
                        }}>
                        <button className={style.addToCart +' addToCart'} disabled={enabled}>
                            <span>Add to cart</span>
                            <span>{dataItem?.sale_price != 0 && dataItem?.sale_price ? <>
                                  {totalPrice} ฿
                                </> : totalPrice + " ฿"}</span>
                            
                        </button>
                    </div>

                </div>
            </motion.div>
        </>

    )
}
export default DetailProduct