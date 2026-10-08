import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { coverImage } from '../../../utlis/product';
import { Price } from '../../../components/Price';
import fallback from '../../../assets/img/cloth1.png';

export default function WeekCollection({ products = [] }) {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const week = products.slice(0, 12);

    return (
        <div className="pt-[100px] week-collection">
            <div className="head flex justify-between items-end pr-[52px]">
                <div className="heading">
                    <h1>NEW <br /> THIS WEEK</h1>
                    <p>({products.length})</p>
                </div>
                <Link to="/products" className='!text-[16px] text-[#8A8A8A] float-right pt-[45px] cursor-pointer hover:underline'>View All</Link>
            </div>

            {week.length === 0 ? (
                <p className="pt-[30px]">Products will show here once they are added.</p>
            ) : (
                <Swiper
                    slidesPerView={Math.min(3, week.length)}
                    spaceBetween={40}
                    navigation={{
                        nextEl: '.week-next',
                        prevEl: '.week-prev',
                    }}
                    modules={[Navigation]}
                    className="products !pt-[30px] !pr-[52px]"
                    onInit={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                >
                    {week.map((product) => (
                        <SwiperSlide key={product.id} style={{ width: '302px' }} className="product">
                            <Link to={`/product/${product.id}`}>
                                <div className="img relative">
                                    <img src={coverImage(product) || fallback} alt={product.name} className="w-full" loading="lazy" decoding="async" />
                                    <span className="absolute bottom-0 bg-[#dcdcdc9c] w-[34px] h-[34px] right-[45%] flex items-center justify-center cursor-pointer">
                                        <GoPlus className="text-white text-[20px]" />
                                    </span>
                                </div>
                                <div className="details pt-[14px]">
                                    <span className="type text-[#525252] text-[12px]">{product.collection || product.type}</span>
                                    <div className="detail flex justify-between">
                                        <span className="text-[14px]">{product.name}</span>
                                        <Price product={product} />
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}

                    <div className='latest-pagination flex justify-center items-center gap-[20px] pt-[30px]'>
                        <div className={`week-prev w-[45px] h-[48px] flex items-center justify-center border border-[#a5a5a5] ${isBeginning ? 'opacity-50' : 'cursor-pointer'}`}>
                            <IoIosArrowBack className='text-[24px]' />
                        </div>
                        <div className={`week-next w-[45px] h-[48px] flex items-center justify-center border border-[#a5a5a5] ${isEnd ? 'opacity-50' : 'cursor-pointer'}`}>
                            <IoIosArrowForward className='text-[24px]' />
                        </div>
                    </div>
                </Swiper>
            )}
        </div>
    );
}
