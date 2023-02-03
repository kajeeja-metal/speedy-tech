import React ,{useEffect,useState} from "react";
import style from "@/styles/DealItemEdit.module.scss"
import Image from "next/image";
import Router ,{useRouter}from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
import { useAuth } from '@/context/useAuth';
import Swal from 'sweetalert2'
const DealItemEdit = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const[state,setState] = useState({
        loading : false
    })
    let dataContext = useAuth()
    const [count, setCount] = useState(props.dealItem.qty);
    const Order = () =>{
        
    }
    const plusFunc = (i) => {
        setCount(count + 1);
        dataContext.editToOrder(props.index, count + 1 , 1,props.dealItem.order)
    };
    const minusFunc = (i) => {
        if((count - 1) > 0){
            setCount(count - 1);
            dataContext.editToOrder(props.index, count - 1,-1,props.dealItem.order)
        }else{
            Swal.fire({
                title: 'ยกเลิก!',
                text: 'คุณต้องการยกเลิก......ใช่ไหม?',
                icon: 'error',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
                reverseButtons: true
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    // router.push('/')
                    let remove = dataContext.transitions.products.splice(props.index, 1);

                    dataContext.setTransitions((prev) => ({
                        customer : {
                            ...prev.customer,
                            priceTotal :prev.customer.priceTotal - (props.dealItem.order.sale_price != 0 ? (props.dealItem.order.sale_price * props.dealItem.qty)  :  (props.dealItem.order.price * props.dealItem.qty))
                        },
                        products : dataContext.transitions.products
                    }))
                    console.log(dataContext)
                } else if (result.isDenied) {
                    // Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
    };
    return (
        <div className={style.dealItem}>
            <div className={style.dealImages}>
                <Image src={props.dealItem.order?.image_url ? props.dealItem.order?.image_url : "/img/product.jpg"}  alt={props.dealItem.order?.image_url} width={40} height={40} layout={'responsive'} style={{objectFit:"cover"}}></Image>
            </div>
            <div className={style.group_dealitem}>
                <div className={style.deal_name}>{props.dealItem.order.name[locale]}<span>฿ {props.dealItem.order.sale_price != 0 ? props.dealItem.order.sale_price :  props.dealItem.order.price} x {count}</span></div>
                <div className={style.deal_detail}>{props.dealItem.order.description[locale]}</div>
                <div className={style.bottom_deal_item}>
                    <div className={style.deal_price}>
                        <span>แก้ไข</span>
                    </div>
                    <div className={style.group_qty}>
                        <div className={style.min_qty} onClick={() => minusFunc()}>
                            <i className="fal fa-minus"></i>
                        </div>
                        <div className={style.qty}>{count}</div>
                        <div className={style.max_qty} onClick={() => plusFunc()}>
                        <i className="fal fa-plus"></i>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default DealItemEdit