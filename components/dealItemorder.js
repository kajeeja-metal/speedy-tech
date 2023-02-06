import React ,{useEffect,useState} from "react";
import style from "@/styles/DealItemOrder.module.scss"
import Image from "next/image";
import Router ,{useRouter}from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
import { useAuth } from '@/context/useAuth';
const DealItemOrder = (props) => {
    const {dealItem } = props
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    console.log(dealItem)
return (
    <div className={style.dealItem}>
        
            <div className={style.dealImages}>
                <Image src={dealItem?.product?.image_url ? dealItem?.product?.image_url : "/img/product.jpg"} width={70} height={70}></Image>
            </div>
            <div className={style.group_dealitem}>
                <div className={style.deal_name}>{dealItem.product.name[locale]} <span>฿ {dealItem.unit_price.toLocaleString('en-US')} x {dealItem.qty}</span></div>
                <div className={style.deal_detail}>{
                    dealItem.options.map((opt,i) =>{
                        return opt.option.name[locale]+ ","
                    })
                }</div>
                <div className={style.bottom_deal_item}>
                    <div className={[style.deal_status,style.bottom_deal_item].join(' ')}>
                        <span>กำลังรอ</span>
                    </div>
                </div>
                
            </div>
        
        
    </div>
)
}
export default DealItemOrder