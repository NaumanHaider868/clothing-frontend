import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';
import { Range } from 'react-range';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2X'];

export default function Filter({
    seasons,
    season,
    size,
    stock,
    priceRange,
    onSeason,
    onSize,
    onStock,
    onPrice,
}) {
    const [openSections, setOpenSections] = useState(['seasons']);

    const toggleSection = (section) => {
        setOpenSections((current) =>
            current.includes(section) ? current.filter((item) => item !== section) : [...current, section]
        );
    };

    return (
        <div className="sidebar">
            <span className="text-[16px] font-medium">Filters</span>

            <div className="sizes">
                <span>Size</span>
                <div className="size flex gap-2 mt-2">
                    {SIZES.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => onSize(size === item ? '' : item)}
                            className={`px-3 py-1 border text-center cursor-pointer ${size === item ? 'bg-black text-white' : ''}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="accordions w-full max-w-sm mx-auto mt-5">
                <div className="accordion">
                    <button
                        type="button"
                        className="w-full text-left py-3 flex justify-between items-center"
                        onClick={() => toggleSection('availability')}
                    >
                        <span className="font-semibold">Availability</span>
                        <span>
                            {openSections.includes('availability') ? <IoIosArrowUp /> : <IoIosArrowForward />}
                        </span>
                    </button>
                    {openSections.includes('availability') && (
                        <div className="pb-3 pl-4">
                            {[
                                { label: 'In stock', value: 'in' },
                                { label: 'Out of stock', value: 'out' },
                            ].map((option) => (
                                <label key={option.value} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={stock === option.value}
                                        onChange={() => onStock(stock === option.value ? '' : option.value)}
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="accordion">
                    <button
                        type="button"
                        className="w-full text-left py-3 flex justify-between items-center"
                        onClick={() => toggleSection('price')}
                    >
                        <span className="font-semibold">Price Range</span>
                        <span>
                            {openSections.includes('price') ? <IoIosArrowUp /> : <IoIosArrowForward />}
                        </span>
                    </button>
                    {openSections.includes('price') && (
                        <div className="pb-3 pl-4">
                            <Range
                                values={priceRange}
                                step={10}
                                min={0}
                                max={1000}
                                onChange={onPrice}
                                renderTrack={({ props, children }) => (
                                    <div {...props} className="w-full h-2 bg-gray-300 rounded-lg">
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div {...props} className="w-5 h-5 bg-black rounded-full shadow-md" />
                                )}
                            />
                            <p className="text-sm mt-2">${priceRange[0]} - ${priceRange[1]}</p>
                        </div>
                    )}
                </div>

                <div className="accordion">
                    <button
                        type="button"
                        className="w-full text-left py-3 flex justify-between items-center"
                        onClick={() => toggleSection('seasons')}
                    >
                        <span className="font-semibold">Seasons</span>
                        <span>
                            {openSections.includes('seasons') ? <IoIosArrowUp /> : <IoIosArrowForward />}
                        </span>
                    </button>
                    {openSections.includes('seasons') && (
                        <div className="product-btns pb-3 pl-4">
                            {seasons.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    className={season === item ? 'bg-black text-white' : ''}
                                    onClick={() => onSeason(season === item ? '' : item)}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
