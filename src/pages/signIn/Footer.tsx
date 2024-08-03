import React from 'react';
import './Footer.css';
import logo1 from '../../assets/Logos/GSC-Navi_Mumbai-Logo.png'
import logo2 from '../../assets/Logos/Official Humans Of Queer Logo.png'
import logo3 from '../../assets/Logos/Saksharta Foundation Logo.png'


const Footer: React.FC = () => {

  const logos = [logo1, logo2, logo3, logo1, logo2, logo3,logo1, logo2, logo3, logo1, logo2, logo3,logo1, logo2, logo3];
  return (
    <div className="marquee h-[400px] flex items-center">
      <div className="marquee-content flex items-center w-full h-[100px]">
        <div className='w-fit mx-24 flex gap-10'>{logos.map((img,index) => (<img src={img} key={index} className=" h-[70px] w-fit mr-10" />))}</div>
      </div>
    </div>
  );
};

export default Footer;
