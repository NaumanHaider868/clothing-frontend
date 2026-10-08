import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from './Footer';
import arrowLeftLong from '../../../assets/img/actions/big-arrow-left.png';
import fallback from '../../../assets/img/product1.png';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { api } from '../../../utlis/customAPI';
import { apiError } from '../../../utlis/apiError';
import { lineTotal, money, variantImage } from '../../../utlis/product';

const ProductItem = ({ imgSrc, title, price, colorSize, count }) => (
    <div className="item">
        <div className="img">
            <img src={imgSrc} className="w-full h-full" alt={title} loading="lazy" decoding="async" />
        </div>
        <div className="content">
            <div className="detail">
                <div className="flex justify-between">
                    <span className="title">{title}</span>
                    <span className="price">{price}</span>
                </div>
                <span className="color-size">{colorSize}</span>
            </div>
            <div className="action flex justify-between">
                <span className="count">({count})</span>
                <Link to="/cart" className="link">Change</Link>
            </div>
        </div>
    </div>
);

export default function Checkout() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { items, refresh, ready } = useCart();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
        address: user?.address || '',
    });
    const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0);

    const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

    const placeOrder = async () => {
        if (!items.length) {
            toast.error("Your cart is empty");
            return;
        }
        if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim() || !form.address.trim()) {
            toast.error("Add your contact details and address");
            return;
        }
        setSaving(true);
        try {
            await api.patch('/auth/profile', form);
            const response = await api.post('/order/checkout');
            await refresh();
            toast.success(response.data.message);
            navigate(`/orders?placed=${response.data.data.id}`);
        } catch (error) {
            toast.error(apiError(error, "Could not place the order"));
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div className="main-section h-auto overflow-hidden">
                <div className="w-full">
                    <section className="flex h-full">
                        <div className="checkout">
                            <div className="header">
                                <img src={arrowLeftLong} className="cursor-pointer" alt="Back" onClick={() => navigate('/cart')} />
                            </div>
                            <div className="content">
                                <div className="content-head">
                                    <div className="head">
                                        <h1>CHECKOUT</h1>
                                    </div>
                                    <div className="according">
                                        <ul>
                                            <li className="active">INFORMATION</li>
                                            <li>ORDER</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="content-main">
                                    <div className="left">
                                        <div className="contact">
                                            <label>CONTACT INFO</label>
                                            <input type="email" className="input" value={user?.email || ''} readOnly />
                                            <input type="tel" className="input" placeholder="Phone" value={form.phone} onChange={update('phone')} />
                                        </div>
                                        <div className="shipping">
                                            <label>SHIPPING ADDRESS</label>
                                            <div className="flex gap-3">
                                                <input type="text" placeholder="First Name" value={form.firstName} onChange={update('firstName')} />
                                                <input type="text" placeholder="Last Name" value={form.lastName} onChange={update('lastName')} />
                                            </div>
                                            <input type="text" placeholder="Address" value={form.address} onChange={update('address')} />
                                        </div>
                                        <div className="order">
                                            <p className="text-[13px] pb-3">Payment is added later. Placing the order reserves these items.</p>
                                            <button type="button" onClick={placeOrder} disabled={saving || !ready || !items.length}>
                                                {saving ? 'Placing...' : 'Place order'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="flex justify-end">
                                            <span className="like w-[34px] h-[34px] bg-white text-[#000E8A] text-[16px] font-semibold flex items-center justify-center">
                                                ( {items.reduce((sum, item) => sum + item.quantity, 0)} )
                                            </span>
                                        </div>
                                        <div className="products">
                                            <h4 className="head">YOUR ORDER</h4>
                                            <div className="mt-[20px] flex flex-col gap-5">
                                                {items.map((item) => (
                                                    <ProductItem
                                                        key={item.id}
                                                        imgSrc={variantImage(item.variant) || fallback}
                                                        title={item.product.name}
                                                        price={money(lineTotal(item))}
                                                        colorSize={`${item.variant.color} / ${item.size.size}`}
                                                        count={item.quantity}
                                                    />
                                                ))}
                                            </div>
                                            <div className='sub-total'>
                                                <div className="total">
                                                    <span>Subtotal</span>
                                                    <span>{money(subtotal)}</span>
                                                </div>
                                            </div>
                                            <div className="total">
                                                <span>Total</span>
                                                <span>{money(subtotal)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
