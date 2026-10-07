import React from 'react'
import '../../assets/css/style.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
    const { user, logout } = useAuth()
    const { count } = useCart()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const openCart = () => {
        navigate('/cart')
    }

    return (
        <div className='navbar pr-[52px]'>
            <div className='flex justify-between items-center'>
                <div className='option-l flex justify-between items-center'>
                    <ul className='web-option'>
                        <li className={pathname === '/' ? 'active' : ''}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={pathname.startsWith('/products') || pathname.startsWith('/product/') ? 'active' : ''}>
                            <Link to="/products">Shop</Link>
                        </li>
                        <li className={pathname === '/orders' ? 'active' : ''}>
                            {user ? <Link to="/orders">Orders</Link> : <Link to="/login?next=%2Forders">Orders</Link>}
                        </li>
                    </ul>
                </div>
                <Link to="/" className='logo'><span></span></Link>
                <div className='option-r flex justify-between items-center'>
                    <ul className='user-option'>
                        <li className='cart' onClick={openCart}>
                            <div className='cart-text'><span>Cart{count ? ` (${count})` : ''}</span></div>
                            <span className='cart-icon'><i></i></span>
                        </li>
                        {user ? (
                            <>
                                <li className='user'>
                                    <Link to="/orders" title={user.email}><span></span></Link>
                                </li>
                                <li>
                                    <button type="button" onClick={logout} className="text-[14px]">Log out</button>
                                </li>
                            </>
                        ) : (
                            <li className='user'>
                                <Link to="/login"><span></span></Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
