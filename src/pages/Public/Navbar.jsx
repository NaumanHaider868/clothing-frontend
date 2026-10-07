import React from 'react'
import '../../assets/css/style.scss'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useSaved } from '../../context/SavedContext'
import { GENDERS, SEASONS } from '../../utlis/shopMenu'

const shopLink = (gender, extra = {}) => {
    const params = new URLSearchParams({ gender, ...extra })
    return `/products?${params.toString()}`
}

export default function Navbar() {
    const { user, logout } = useAuth()
    const { count } = useCart()
    const { count: savedCount } = useSaved()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
    const activeGender = pathname.startsWith('/products') ? (searchParams.get('gender') || '') : ''

    return (
        <div className='navbar pr-[52px]'>
            <div className='flex justify-between items-center'>
                <div className='option-l flex justify-between items-center'>
                    <ul className='web-option'>
                        <li className={pathname === '/' ? 'active' : ''}>
                            <Link to="/">Home</Link>
                        </li>
                        {GENDERS.map((gender) => (
                            <li
                                key={gender.value}
                                className={`has-menu ${activeGender === gender.value ? 'active' : ''}`}
                            >
                                <Link to={shopLink(gender.value)}>{gender.label}</Link>
                                <div className="menu">
                                    <div>
                                        <span className="menu-title">Categories</span>
                                        <Link to={shopLink(gender.value)}>All {gender.label}</Link>
                                        {gender.categories.map((category) => (
                                            <Link key={category} to={shopLink(gender.value, { collection: category })}>
                                                {category}
                                            </Link>
                                        ))}
                                    </div>
                                    <div>
                                        <span className="menu-title">Seasons</span>
                                        {SEASONS.map((season) => (
                                            <Link key={season} to={shopLink(gender.value, { season })}>
                                                {season.charAt(0).toUpperCase() + season.slice(1)}
                                            </Link>
                                        ))}
                                    </div>
                                    <div>
                                        <span className="menu-title">Offers</span>
                                        <Link to={shopLink(gender.value, { sale: '1' })}>Sale</Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                        <li className={pathname === '/orders' ? 'active' : ''}>
                            {user ? <Link to="/orders">Orders</Link> : <Link to="/login?next=%2Forders">Orders</Link>}
                        </li>
                    </ul>
                </div>
                <Link to="/" className='logo'><span></span></Link>
                <div className='option-r flex justify-between items-center'>
                    <ul className='user-option'>
                        <li className='like'>
                            <Link to="/saved" aria-label="Saved products">
                                <span></span>
                                {savedCount ? <i className="saved-count">{savedCount}</i> : null}
                            </Link>
                        </li>
                        <li className='cart' onClick={() => navigate('/cart')}>
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
