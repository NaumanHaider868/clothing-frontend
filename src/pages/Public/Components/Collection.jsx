import React from 'react';
import '../../../assets/css/style.scss';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Cloth1 from '../../../assets/img/cloth1.png';
import Cloth2 from '../../../assets/img/cloth2.png';

// images for week collection

import Cloth3 from '../../../assets/img/cloth3.png'
import Cloth4 from '../../../assets/img/cloth4.png'
import Cloth5 from '../../../assets/img/cloth5.png'
import Cloth6 from '../../../assets/img/cloth6.png'
import Cloth7 from '../../../assets/img/cloth7.png'

export default function Collection() {
    const images = [Cloth1, Cloth2, Cloth1, Cloth2];

    return (
        <div className='collection'>
            <div className="first-sec flex">
                <div className="collection-side">
                    <div className='collection-head'>
                        <ul>
                            <li>MEN</li>
                            <li>WOMAN</li>
                            <li>KIDS</li>
                        </ul>
                        <div className='collection-search'>
                            <input placeholder='Search' />
                            <i></i>
                        </div>
                    </div>
                    <div className='collection-text'>
                        <h1>NEW<br />COLLECTION</h1>
                        <p>
                            Summer<br />2024
                        </p>
                    </div>
                    <div className='collection-bottom'>
                        <button>Go To Shop <i></i></button>
                        <div className='latest-pagination'>
                            {/* className='none-active' */}
                            <div className='prev'><IoIosArrowBack /></div>
                            <div className='next'><IoIosArrowForward /></div>
                        </div>
                    </div>
                </div>
                <div className="collection-latest">
                    <div className='h-[139px]'></div>
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.next',
                            prevEl: '.prev',
                        }}
                        slidesPerView={3}
                        loop={true}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} alt={`Cloth ${index + 1}`} style={{ width: '366px', height: '376px' }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className='pt-[100px] week-collection'>
                <div className="head flex justify-between items-end pr-[52px]">
                    <div className='heading'>
                        <h1>NEW <br /> THIS WEEK</h1>
                        <p>(50)</p>
                    </div>
                    <span>See All</span>
                </div>
                <div className='products pt-[30px] flex gap-[26px]'>
                    <div className='product w-[305px] h-[313px]'>
                        <div className="img relative">
                            <img src={Cloth7} />
                            <span className='absolute bottom-0 bg-[#dcdcdc9c] w-[34px] h-[34px] right-[45%] flex items-center justify-center cursor-pointer'>
                                <GoPlus className='text-whte text-[20px]' />
                            </span>
                        </div>
                        <div className='details pt-[14px]'>
                            <span className='type text-[#525252] text-[12px]'>V-Neck T-Shirt</span>
                            <div className='detail flex justify-between'>
                                <span className='text-[14px]'>Embroidered Seersucker Shirt</span>
                                <span className='price text-[14px]'>$ 99</span>
                            </div>
                        </div>
                    </div>
                    <div className='product w-[305px] h-[313px]'>
                        <div className="img relative">
                            <img src={Cloth4} />
                            <span className='absolute bottom-0 bg-[#dcdcdc9c] w-[34px] h-[34px] right-[45%] flex items-center justify-center cursor-pointer'>
                                <GoPlus className='text-whte text-[20px]' />
                            </span>
                        </div>
                        <div className='details pt-[14px]'>
                            <span className='type text-[#525252] text-[12px]'>Cotton T-Shirt</span>
                            <div className='detail flex justify-between'>
                                <span className='text-[14px]'>Basic Slim Fit T-Shirt</span>
                                <span className='price text-[14px]'>$ 120</span>
                            </div>
                        </div>
                    </div>
                    <div className='product w-[305px] h-[313px]'>
                        <div className="img relative">
                            <img src={Cloth5} />
                            <span className='absolute bottom-0 bg-[#dcdcdc9c] w-[34px] h-[34px] right-[45%] flex items-center justify-center cursor-pointer'>
                                <GoPlus className='text-whte text-[20px]' />
                            </span>
                        </div>
                        <div className='details pt-[14px]'>
                            <span className='type text-[#525252] text-[12px]'>Henley T-Shirt</span>
                            <div className='detail flex justify-between'>
                                <span className='text-[14px]'>Blurred Print T-Shirt</span>
                                <span className='price text-[14px]'>$ 70</span>
                            </div>
                        </div>
                    </div>
                    <div className='product w-[305px] h-[313px]'>
                        <div className="img relative">
                            <img src={Cloth6} />
                            <span className='absolute bottom-0 bg-[#dcdcdc9c] w-[34px] h-[34px] right-[45%] flex items-center justify-center cursor-pointer'>
                                <GoPlus className='text-whte text-[20px]' />
                            </span>
                        </div>
                        <div className='details pt-[14px]'>
                            <span className='type text-[#525252] text-[12px]'>Crewneek T-Shirt</span>
                            <div className='detail flex justify-between'>
                                <span className='text-[14px]'>Full Sleeve Zipper</span>
                                <span className='price text-[14px]'>$ 89</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}