//  change name to Marquee
import React from 'react';
import Marquee from "react-fast-marquee";
import logo1 from '../../assets/Logos/GSC-Navi_Mumbai-Logo.png'
import logo2 from '../../assets/Logos/Official Humans Of Queer Logo.png'
import logo3 from '../../assets/Logos/Saksharta Foundation Logo.png'
import logo4 from '../../assets/Logos/Untitled design (1).png'
import logo5 from '../../assets/Logos/Untitled design (3).png'
import logo6 from '../../assets/Logos/Untitled design (4).png'
import logo7 from '../../assets/Logos/Untitled design.png'



const Footer: React.FC = () => {

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
  return (
    <div className='flex gap-5 items-center h-[200px] lg:h-[250px] w-[98%] overflow-hidden'>
     <Marquee
     speed={100} play={true} direction='left' autoFill='true' pauseOnHover='true' pauseOnClick='false' delay={0}  
     >
       {logos.map((logo, index) => (
         <img key={index} src={logo} alt="" className='h-[90px] mr-[80px]' />
       ))}
     </Marquee>

     
    </div>
  );
};

export default Footer;