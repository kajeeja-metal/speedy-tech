import React, { useState, useEffect } from 'react'
import style from '@/styles/detailProduct.module.scss'
import Image from 'next/image'
import Accordion from 'react-bootstrap/Accordion';
const DetailProduct = (props) => {

    const [count, setCount] = useState(0);

    const plusFunc = () => {
        setCount(count + 1);
    };
    const minusFunc = () => {
        if (count === 0) {
            return;
        }
        setCount(count - 1);
    };
    console.log(props.isDetail)
    return (
        <>
            <div className={style.overlay} onClick={(e) => props.setDetail(false)} />
            <section className={style.DetailProduct}>
                <div className={style.title}>
                    <h1>Product Name</h1>
                    <div className={style.btnClose + ' icon_close'} onClick={(e) => props.setDetail(false)} />
                </div>
                <div className={style.scrollDtail}>
                    <div className={style.pic}>
                        <Image src="/img/product.jpg" alt="" width={300} height={350} />
                    </div>
                    <div className={style.nameProduct}>
                        <div className={style.row}>
                            <h1>Product</h1>
                            <h1>69 $</h1>
                        </div>
                        <div className={style.row}>
                            <p>นื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงา</p>
                        </div>
                    </div>
                    <Accordion className='AccordionCustom' defaultActiveKey={["0", "1"]} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <p> Accordion Item #1<br /><span>Select at least 1 item</span></p>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className='optionItem'>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="radio" name="RadioGroup_1" id="radio_1" />
                                        <label className="form-check-label" htmlFor="radio_1">
                                            <span>checked radio</span>
                                            <span>0$</span>
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="radio" name="RadioGroup_1" id="radio_2" />
                                        <label className="form-check-label" htmlFor="radio_2">
                                            <span>checked radio</span>
                                            <span>0$</span>
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="radio" name="RadioGroup_1" id="radio_3" />
                                        <label className="form-check-label" htmlFor="radio_3">
                                            <span>checked radio</span>
                                            <span>0$</span>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="RadioGroup_1" id="radio_4" />
                                        <label className="form-check-label" htmlFor="radio_4">
                                            <span>checked radio</span>
                                            <span>0$</span>
                                        </label>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                <p> Accordion Item #2<br /><span>Select at least 1 item</span></p>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className='optionItem'>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="check_1" />
                                        <label className="form-check-label" htmlFor="check_1">
                                            <span>Default checkbox</span>
                                            <span>10$</span>
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="check_2" />
                                        <label className="form-check-label" htmlFor="check_2">
                                            <span>Default checkbox</span>
                                            <span>90$</span>
                                        </label>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
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
                    <button className={style.addToCart}>
                        <span>Add to cart</span>
                        <span>0$</span>
                    </button>

                </div>
            </section>
        </>

    )
}
export default DetailProduct