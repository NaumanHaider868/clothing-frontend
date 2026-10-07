import React, { useState } from 'react';
import '../../../assets/css/style.scss';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import WeekCollection from './WeekCollection';
import YearCollection from './YearCollection';
import Approach from './Approach';
import { useProducts } from '../../../utlis/useProducts';
import { coverImage } from '../../../utlis/product';
import fallback from '../../../assets/img/cloth1.png';

export default function Collection() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { products, loading } = useProducts();
    const slides = products.slice(0, 8);

    const submitSearch = (event) => {
        event.preventDefault();
        const term = search.trim();
        navigate(term ? `/products?search=${encodeURIComponent(term)}` : '/products');
    };

    return (
        <>
            <div className='collection'>
                <div className="first-sec flex">
                    <div className="collection-side">
                        <div className='collection-head'>
                            <ul>
                                <li><Link to="/products?gender=men">MEN</Link></li>
                                <li><Link to="/products?gender=women">WOMAN</Link></li>
                                <li><Link to="/products?gender=kids">KIDS</Link></li>
                            </ul>
                            <form className='collection-search' onSubmit={submitSearch}>
                                <input
                                    placeholder='Search'
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                                <i></i>
                            </form>
                        </div>
                        <div className='collection-text'>
                            <h1>NEW<br />COLLECTION</h1>
                            <p>
                                {products[0]?.type || 'Season'}<br />
                                {new Date().getFullYear()}
                            </p>
                        </div>
                        <div className='collection-bottom'>
                            <button type="button" onClick={() => navigate('/products')}>Go To Shop <i></i></button>
                            <div className='latest-pagination'>
                                <div className='latest-prev'><IoIosArrowBack /></div>
                                <div className='latest-next'><IoIosArrowForward /></div>
                            </div>
                        </div>
                    </div>
                    <div className="collection-latest">
                        <div className='h-[139px]'></div>
                        {loading ? null : slides.length === 0 ? (
                            <p className="px-6">No products yet.</p>
                        ) : (
                            <Swiper
                                modules={[Navigation]}
                                navigation={{
                                    nextEl: '.latest-next',
                                    prevEl: '.latest-prev',
                                }}
                                slidesPerView={Math.min(3, slides.length)}
                                loop={slides.length > 3}
                            >
                                {slides.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <Link to={`/product/${product.id}`}>
                                            <img
                                                src={coverImage(product) || fallback}
                                                alt={product.name}
                                                style={{ width: '366px', height: '376px', objectFit: 'cover' }}
                                            />
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
                <WeekCollection products={products} />
                <YearCollection products={products} />
                <Approach />
            </div>
        </>
    )
}
