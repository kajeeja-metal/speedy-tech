import React,{ useEffect, useState } from "react";
import Pagemini from '@/layouts/pageMini'
import Router, { useRouter } from 'next/router'
import Image from 'next/image';
import en from '@/locales/en'
import th from '@/locales/th'
import DealItemCheckOut from "@/components/dealItemcheckout";
import style from "@/styles/DealItemCheckOut.module.scss"
import { Modal } from 'react-bootstrap';
const Checkout = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const [showConfirm,setShowConfirm] = useState(false)
    useEffect(()=>{

    },[])
    const onClickAddOrder = async () =>{
        setShowConfirm(true)
    }
    return (
        <Pagemini  title={'ชำระเงิน'}>
            <div className={style.number_bill}>
                หมายเลขบิล: <span>NV0029388902</span>
            </div>
            <div className="height-100">
                <div className="container_deal">
                    {/* loop */}
                    <div className={style.order_all_time_bill}>
                        <div className={style.order_time_bill}>
                        <span>OD0000042</span>
                            <span>13:28 น.</span>
                        </div>
                        <DealItemCheckOut />
                        <DealItemCheckOut />
                        <div className={style.total_number_bill}>
                            <span className={style.text_total}>รวมค่าอาหาร:</span> <span className={style.price}>฿265.00</span>
                        </div>
                    </div>
                    <div className={style.order_all_time_bill}>
                        <div className={style.order_time_bill}>
                        <span>OD0000042</span>
                            <span>13:28 น.</span>
                        </div>
                        <DealItemCheckOut />
                        <DealItemCheckOut />
                        <div className={style.total_number_bill}>
                            <span className={style.text_total}>รวมค่าอาหาร:</span> <span className={style.price}>฿265.00</span>
                        </div>
                    </div>
                    {/* loop */}
                    <div className={style.total_number_bill}>
                        <div className={style.text_total}>ให้ทิปพนักงาน</div>
                        <div className={style.inputTrap}><input type={'tel'} placeholder="0.00"></input></div>
                    </div>
                </div>
            </div>
            <div className={style.group_button_bottom}>
               <div className={style.group_vat}>
                <div className={style.total_number_bill}>
                        <div className={style.text_total}>รวมค่าอาหาร</div>
                        <div className={style.text_total}>108.00</div>
                    </div>
                    <div className={style.total_number_bill}>
                        <div className={style.text_total}>VAT 7%</div>
                        <div className={style.text_total}>108.00</div>
                    </div>
                    <div className={style.total_number_bill}>
                        <div className={style.text_total}>Service charge 10%</div>
                        <div className={style.text_total}>108.00</div>
                    </div>
               </div>
                
                <div className={style.group_total}>
                    <div className={style.titletotal}>รวมค่าอาหาร</div>
                    <div className={style.price}>฿265.00</div>
                </div>
                <div className={style.group_addtocart}>
                    <div className={style.btn_addtocart} onClick={()=> onClickAddOrder()}>เรียกพนักงาน</div>
                </div>
           </div>
           <Modal key={1} show={showConfirm} onHide={()=> setShowConfirm(false)} size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div className='group-modal'>
                       <div className="title_name_modal">
                            <div className="title_text">เรียกพนักงาน</div>
                            <p className="subtitle_text">คุณต้องการเรียกพนักงานเพื่อชำระเงินใช่หรือไม่</p>
                       </div>
                       <div className="group_btn_confirm">
                            <div className="btn btn_false" onClick={() => {setShowConfirm(false)}}>ยกเลิก</div>
                            <div className="btn btn_true" onClick={() => {router.push('/')}}>ยืนยัน</div>
                       </div>
                    </div>
                </Modal.Body>
        </Modal>
        </Pagemini>
    )
}
export default Checkout