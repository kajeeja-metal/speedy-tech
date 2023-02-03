import React,{ useEffect, useState } from "react";
import Pagemini from '@/layouts/pageMini'
import Router, { useRouter } from 'next/router'
import Image from 'next/image';
import en from '@/locales/en'
import th from '@/locales/th'
import DealItemEdit from "@/components/dealItemedit";
import style from "@/styles/DealItemEdit.module.scss"
import { Modal } from 'react-bootstrap';
import { useAuth } from '@/context/useAuth'
import { addTransactions ,getProducts } from "@/services/getServices";
const Cart = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const dataContext = useAuth()
    const [dataItems, setDataItems] = useState([])
    
    const [showConfirm,setShowConfirm] = useState(false)
    useEffect(()=>{

    },[])
    const onClickAddOrder = async () =>{
        setShowConfirm(true)
        
    }
    const onTransactions = async () =>{
        let data = await addTransactions(dataContext.transitions)
        setShowConfirm(false)
    }
    return (
        <Pagemini  title={'รายการที่สั่ง'}>
            
            <div className="container_deal">
                {
                    dataContext?.transitions.products.map((item,i) => {
                        return <DealItemEdit dealItem={item} index={i} />
                    })
                }
            </div>
            <div className={style.group_button_bottom}>
                <div className={style.group_total}>
                    <div className={style.titletotal}>รวมค่าอาหาร</div>
                    <div className={style.price}>฿ {dataContext?.transitions.customer.priceTotal.toLocaleString('en-US')}</div>
                </div>
                <div className={style.group_addtocart}>
                    <div className={style.btn_addtocart} onClick={()=> onClickAddOrder()}>ส่งรายการ</div>
                </div>
           </div>
           <Modal key={1} show={showConfirm} onHide={()=> setShowConfirm(false)} size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div className='group-modal'>
                       <div className="title_name_modal">
                            <div className="title_text">ยืนยันรายการ</div>
                            <p className="subtitle_text">คุณต้องการส่งรายการอาหารนี้ใช่หรือไม่</p>
                       </div>
                       <div className="group_btn_confirm">
                            <div className="btn btn_false" onClick={()=> setShowConfirm(false)}>ยกเลิก</div>
                            <div className="btn btn_true" onClick={() => onTransactions()}>ยืนยัน</div>
                       </div>
                    </div>
                </Modal.Body>
        </Modal>
        </Pagemini>
    )
}
export default Cart