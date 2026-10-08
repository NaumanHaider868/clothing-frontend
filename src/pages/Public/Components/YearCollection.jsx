import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import { coverImage, unitPrice } from '../../../utlis/product';
import { Price } from '../../../components/Price';
import fallback from '../../../assets/img/cloth1.png';

const GROUPS = [
    { label: '(All)', value: '' },
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'KID', value: 'kids' },
];

export default function YearCollection({ products = [] }) {
    const [gender, setGender] = useState('');
    const [sort, setSort] = useState('asc');
    const visible = products
        .filter((product) => !gender || product.gender === gender)
        .slice()
        .sort((a, b) => (sort === 'asc' ? unitPrice(a) - unitPrice(b) : unitPrice(b) - unitPrice(a)))
        .slice(0, 3);

    return (
        <div className='pt-[100px] year-collections pr-[52px]'>
            <div className='collection-head'>
                <h1 className='text-[48px] font-bold leading-[40px] tracking-[2px]'>XIV<br />COLLECTIONS<br />23-24</h1>
                <div className='collection-accordion'>
                    <ul>
                        {GROUPS.map((group) => (
                            <li
                                key={group.label}
                                className={gender === group.value ? 'active' : ''}
                                onClick={() => setGender(group.value)}
                            >
                                {group.label}
                            </li>
                        ))}
                    </ul>
                    <div className="sort">
                        <p>Sort(-)</p>
                        <button type="button" className='text-[#8A8A8A]' onClick={() => setSort('asc')}>Less to more</button>
                        <br />
                        <button type="button" className='text-[#8A8A8A]' onClick={() => setSort('desc')}>More to less</button>
                    </div>
                </div>
            </div>
            <div className="products pt-[30px] flex justify-between">
                {visible.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="product w-[366px]">
                        <div className="img relative">
                            <img src={coverImage(product) || fallback} alt={product.name} className="w-full object-cover" loading="lazy" decoding="async" />
                            <span className="absolute bottom-0 bg-[#dcdcdc9c] right-[45%] flex items-center justify-center cursor-pointer">
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
                ))}
            </div>

            <Link to={gender ? `/products?gender=${gender}` : '/products'} className='text-[#8A8A8A] float-right pt-[45px] cursor-pointer hover:underline'>View All</Link>
        </div>
    )
}
