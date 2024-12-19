import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';

export default function ProductSidebar() {
    const [openSections, setOpenSections] = useState([]);
    const [price, setPrice] = useState(500); // Default price

    const colors = ['black', 'red', 'green', 'yellow', 'brown', 'blue', 'purple'];

    const toggleSection = (section) => {
        if (openSections.includes(section)) {
            setOpenSections(openSections.filter((s) => s !== section));
        } else {
            setOpenSections([...openSections, section]);
        }
    };

    const handlePriceChange = (e) => {
        setPrice(parseInt(e.target.value, 10));
    };

    return (
        <div className="pt-[64px]">
            <span className="text-[16px] font-medium">Filters</span>

            {/* Sizes */}
            <div className="sizes">
                <span>Size</span>
                <div className="size">
                    <div className="">XS</div>
                    <div className="">S</div>
                    <div className="">M</div>
                    <div className="">L</div>
                    <div className="">XL</div>
                    <div className="">2X</div>
                </div>
            </div>

            {/* Accordions */}
            <div className="accordions w-full max-w-sm mx-auto mt-5">
                {/* Availability */}
                <div className="accordion">
                    <button
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
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" />
                                <span>In Stock (450)</span>
                            </label>
                            <label className="flex items-center space-x-2 mt-2">
                                <input type="checkbox" />
                                <span>Out Of Stock (18)</span>
                            </label>
                        </div>
                    )}
                </div>

                {/* Colors */}
                <div className="accordion">
                    <button
                        className="w-full text-left py-3 flex justify-between items-center"
                        onClick={() => toggleSection('colors')}
                    >
                        <span className="font-semibold">Colors</span>
                        <span>
                            {openSections.includes('colors') ? <IoIosArrowUp /> : <IoIosArrowForward />}
                        </span>
                    </button>
                    {openSections.includes('colors') && (
                        <div className="pb-3 pl-4 flex gap-2 flex-wrap">
                            {colors.map((color) => (
                                <label key={color} className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <div
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: color,
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                        }}
                                    ></div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Range */}
                <div className="accordion">
                    <button
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
                            <div className="relative">
                                <input
                                    type="range"
                                    min="50"
                                    max="1000"
                                    value={price}
                                    onChange={handlePriceChange}
                                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-sm text-gray-600">Selected Price:</p>
                                <p className="text-lg font-semibold">${price}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
