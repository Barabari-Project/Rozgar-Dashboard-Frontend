import React from 'react';
import './Footer.css';
import logo1 from '../../assets/Logos/GSC-Navi_Mumbai-Logo.png'
import logo2 from '../../assets/Logos/Official Humans Of Queer Logo.png'
import logo3 from '../../assets/Logos/Saksharta Foundation Logo.png'
import { nanoid } from '@reduxjs/toolkit';


const Footer: React.FC = () => {

  const logos = [logo1, logo2, logo3, logo1, logo2, logo3,logo1, logo2, logo3, logo1, logo2, logo3,logo1, logo2, logo3];
  return (
    <div className="marquee h-[400px] flex items-center">
      <div className="marquee-content">
        <div className='flex gap-20'>{logos.map(img => (<img src={img} key={nanoid()} className='h-[70px]' />))}</div>
      </div>
    </div>
  );
};

export default Footer;