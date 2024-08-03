import React from 'react';
import './Footer.css';
import logo1 from '../../assets/Logos/GSC-Navi_Mumbai-Logo.png'
import logo2 from '../../assets/Logos/Official Humans Of Queer Logo.png'
import logo3 from '../../assets/Logos/Saksharta Foundation Logo.png'
import logo4 from '../../assets/Logos/Untitled design (1).png'
import logo5 from '../../assets/Logos/Untitled design (3).png'
import logo6 from '../../assets/Logos/Untitled design (4).png'
import logo7 from '../../assets/Logos/Untitled design.png'

import { nanoid } from '@reduxjs/toolkit';


const Footer: React.FC = () => {

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7,logo1, logo2, logo3, logo4, logo5, logo6, logo7,logo1, logo2, logo3, logo4, logo5, logo6, logo7];
  return (
    <div className="marquee h-[200px] lg:h-[250px]">
      <div className="marquee-content">
        <div className='flex gap-20'>{logos.map(img => (<img src={img} key={nanoid()} className='h-[90px]' />))}</div>
      </div>
    </div>
  );
};

export default Footer;