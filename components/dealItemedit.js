import React ,{useEffect,useState} from "react";
import style from "@/styles/DealItemEdit.module.scss"
import Image from "next/image";
const DealItemEdit = (props) => {
return (
    <div className={style.dealItem}>
        <div className={style.dealImages}>
            <Image src={'/images/item1.png'} width={40} height={40}></Image>
        </div>
        <div className={style.group_dealitem}>
            <div className={style.deal_name}>Pro Hot Milk Caramel<span>฿180 x 2</span></div>
            <div className={style.deal_detail}>โปรโมชั่นนมสดคาราเมลร้อน 2 แก้ว จากปกติ 130 บาท เหลือเพียง 109 บาท</div>
            <div className={style.bottom_deal_item}>
                <div className={style.deal_price}>
                    <span>แก้ไข</span>
                </div>
                <div className={style.group_qty}>
                    <div className={style.min_qty}>
                        <i className="fal fa-minus"></i>
                    </div>
                    <div className={style.qty}>1</div>
                    <div className={style.max_qty}>
                     <i className="fal fa-plus"></i>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
)
}
export default DealItemEdit