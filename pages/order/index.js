import React,{ useEffect, useState } from "react";
import Pagemini from '@/layouts/pageMini'
import Router, { useRouter } from 'next/router'
import Image from 'next/image';
import en from '@/locales/en'
import th from '@/locales/th'
import DealItemOrder from "@/components/dealItemorder";
import style from "@/styles/DealItemOrder.module.scss"
import { Modal } from 'react-bootstrap';
import { getHistory } from "@/services/getServices";
import moment from 'moment';
const Order = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const [showConfirm,setShowConfirm] = useState(false)
    const [history,setHistory] = useState([])
    const [total,setTotal] = useState(0)
    const loadHistory = async () => {
        let historys = await getHistory()
        const sumTotal = historys.data.reduce((accumulator, object) => {
            return accumulator + object.total_amount;
        }, 0);
        setTotal(sumTotal)
        console.log(sumTotal)
        setHistory(historys.data)
    }
    useEffect(()=>{
        loadHistory()
    },[])
    const onClickAddOrder = async () =>{
        router.push('/checkout')
        // setShowConfirm(true)
    }
    return (
        <Pagemini  title={'รายการที่สั่งทั้งหมด'}>
            <div className={style.number_bill}>
                หมายเลขบิล: <span>{history[0]?.order_booking}</span>
            </div>
            <div className="height-100">
                <div className="container_deal">
                    {
                        history.langth != 0 && history.map((item,i) => {
                            
                            return (
                                <>
                                <div className={style.order_all_time_bill}>
                                    <div className={style.order_time_bill}>
                                    <span>{item.order_no}</span>
                                        <span>{moment(item.created_at).format('LT')}</span>
                                    </div>
                                    {
                                        item.details.map((dataItem,i) => {
                                            return <DealItemOrder dealItem={dataItem} />
                                        })
                                    }
                                    
                                    <div className={style.total_number_bill}>
                                        <span className={style.text_total}>รวมค่าอาหาร:</span> <span className={style.price}>฿ {item.total_amount.toLocaleString('en-US')}</span>
                                    </div>
                                </div>
                                <br/>
                                </>
                            )
                        })
                    }
                    
                    
                </div>
            </div>
            
            <div className={style.group_button_bottom}>
                <div className={style.group_total}>
                    <div className={style.titletotal}>รวมค่าอาหาร</div>
                    <div className={style.price}>฿ {total.toLocaleString('en-US')}</div>
                </div>
                <div className={style.group_addtocart}>
                    <div className={style.btn_addtocart} onClick={()=> onClickAddOrder()}>ชำระเงิน</div>
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
                            <div className="btn btn_false">ยกเลิก</div>
                            <div className="btn btn_true" onClick={() => {router.push('/')}}>ยืนยัน</div>
                       </div>
                    </div>
                </Modal.Body>
        </Modal>
        </Pagemini>
    )
}
export default Order