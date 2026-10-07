import React from 'react'
import { Link } from 'react-router-dom'
import footerImg from '../../../assets/img/actions/footerImg.png'
import logo from '../../../assets/img/actions/logo.png'

export default function Footer() {
    return (
        <div className='footer'>
            <div className='flex justify-between'>
                <div className='first-section'>
                    <div className='info'>
                        <span>INFO</span>
                        <ul>
                            <li>PRICING <span className='text-[#C3C3C3]'>/</span></li>
                            <li><Link to="/about">ABOUT</Link> <span className='text-[#C3C3C3]'>/</span></li>
                            <li><Link to="/contact">CONTACTS</Link></li>
                        </ul>
                    </div>
                    <div className='languages'>
                        <span>LANGUAGES</span>
                        <ul>
                            <li>ENG <span className='text-[#C3C3C3]'>/</span></li>
                            <li>ESP <span className='text-[#C3C3C3]'>/</span></li>
                            <li>SVE</li>
                        </ul>
                    </div>
                </div>
                <div className='sec-section'>
                    <span>TECHNOLOGIES</span>
                    <div className='pt-[20px] footer-sec'>
                        <img src={logo} className='logo' />
                        <img src={footerImg} className='img' />
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}
