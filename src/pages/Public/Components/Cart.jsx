import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { IoMdClose } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { IoRemoveOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useCart } from '../../../context/CartContext';
import { apiError } from '../../../utlis/apiError';
import { lineTotal, money, variantImage } from '../../../utlis/product';
import fallback from '../../../assets/img/product1.png';

export default function Cart() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { items, updateItem, removeItem } = useCart();
    const [agreed, setAgreed] = useState(false);
    const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0);

    const changeQuantity = async (item, next) => {
        try {
            if (next < 1) {
                await removeItem(item.id);
                return;
            }
            await updateItem(item.id, next);
        } catch (error) {
            toast.error(error?.response ? apiError(error, "Could not update the cart") : error.message);
        }
    };

    return (
        <div className='cart pt-[65px] pr-[52px]'>
            <div className="cart-head">
                <ul>
                    <li className='active'>SHOPPING BAG</li>
                </ul>
            </div>
            <div className='flex justify-between'>
                <div className="left">
                    <div className='products'>
                        {items.length === 0 ? <p className="py-10">Your bag is empty.</p> : null}
                        {items.map((item) => (
                            <div className="product" key={item.id}>
                                <div className='detail'>
                                    <div className="image">
                                        <img src={variantImage(item.variant) || fallback} alt={item.product.name} />
                                        <span>{item.product.collection || item.product.type}</span>
                                    </div>
                                    <div className='price'>
                                        <span>{item.product.name}</span>
                                        <span>{money(lineTotal(item))}</span>
                                    </div>
                                </div>
                                <div className="action">
                                    <button type="button" className="close" onClick={() => changeQuantity(item, 0)}>
                                        <IoMdClose />
                                    </button>
                                    <div className='flex flex-col gap-[20px] mt-20'>
                                        <div className='size'>
                                            <span>{item.size.size}</span>
                                        </div>
                                        <div className="color" style={{ background: item.variant.color }}></div>
                                        <div className="add-remove">
                                            <button type="button" className="add" onClick={() => changeQuantity(item, item.quantity + 1)}><GoPlus /></button>
                                            <div className="num text-[20px]">{item.quantity}</div>
                                            <button type="button" className="remove" onClick={() => changeQuantity(item, item.quantity - 1)}><IoRemoveOutline /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="right">
                    <div className="head">
                        <span className='text-[18px]'>ORDER SUMMARY</span>
                    </div>
                    <div className='pt-[20px] pb-[20px] border-b-2 border-[#D9D9D9]'>
                        <div className="flex justify-between">
                            <span className='font-semibold'>Subtotal</span>
                            <span className='font-semibold'>{money(subtotal)}</span>
                        </div>
                    </div>
                    <div className='pt-[30px]'>
                        <div className="flex justify-between">
                            <span className='font-semibold flex items-baseline'>TOTAL &nbsp; <p className='text-[#6E6E6E] text-[10px]'>(TAX INCL.)</p></span>
                            <span className='font-semibold'>{money(subtotal)}</span>
                        </div>
                    </div>
                    <div className='pt-[30px]'>
                        <label className='flex gap-[10px]'>
                            <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />
                            <p className='text-[13px]'>I agree to the Terms and Conditions</p>
                        </label>
                    </div>
                    <button
                        type="button"
                        className='bg-[#D9D9D9] w-full pt-[10px] pb-[10px] mt-[18px]'
                        disabled={!items.length}
                        onClick={() => {
                            if (!agreed) {
                                toast.error("Agree to the terms to continue");
                                return;
                            }
                            if (!user) {
                                navigate('/login?next=%2Fcheckout');
                                return;
                            }
                            navigate('/checkout');
                        }}
                    >
                        CONTINUE
                    </button>
                </div>
            </div>
        </div>
    )
}
