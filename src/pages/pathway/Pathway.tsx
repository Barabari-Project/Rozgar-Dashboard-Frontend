import React from 'react'
import html from '../../assets/Logos/html.jpg'
import css from '../../assets/Logos/css.png'
import js from '../../assets/Logos/javascript.png'





const Pathway = ()=>{
    const color = {
        marineBlue : "#324498",
        sunglow : "#FFCB33",
        davyGrey : "#595959",
        white : "#FCFCFC",
        black : "#1B1B1C"
    }


    return (
        <div className='flex flex-col gap-8 rounded-xl shadow-xl p-5 bg-[#e8e8e8]'>

            {/* Card to be conterverted into component */}
            
            <div className='w-full rounded-xl shadow-lg bg-white flex overflow-hidden'>
                <div className='w-2/5'>
                    <img className='w-full h-full' src={html} />
                </div>
                <div className='w-3/5 mx-auto flex flex-col justify-between p-3 md:p-5'>
                    <div className='flex flex-col justify-between'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-center text-2xl md:text-4xl lg:text-5xl font-semibold text-[#324498]'>HTML</h1>
                            <span id="rating">⭐ 5.0</span>
                        </div>
                        <p className='text-[10px] md:text-sm md:mt-8 mb-2 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quisquam in laborum dignissimos nesciunt laudantium!</p>
                    </div>
                    
                    <div className='flex items-center md:justify-between text-md md:text-xl'>
                        <div className="flex gap-5">
                            <span className='border-black border-[1px] px-3 py-1 md:px-5 md:py-2 rounded-lg'>Html</span>
                            <span className='border-black border-[1px] px-3 py-1 md:px-5 md:py-2 rounded-lg'>Web</span>
                        </div>
                        <button className='hidden md:block text-white bg-[#324498] rounded-full px-6 py-2'>➡</button>
                    </div>
                    <div className='pt-3 block md:hidden '>
                        <button className='w-fit text-white bg-[#324498] rounded-full px-4 py-1 '>➡</button>
                    </div>
                </div>
            </div>
            
            <div className='w-full rounded-xl shadow-lg bg-white flex overflow-hidden pl-3 pt-3 pb-3 '>
                <div className='w-2/5'>
                    <img className='w-full h-full' src={css} />
                </div>
                <div className='w-3/5 mx-auto flex flex-col justify-between p-3 md:p-5'>
                    <div className='flex flex-col justify-between'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-center text-2xl md:text-4xl lg:text-5xl font-semibold text-[#324498]'>HTML</h1>
                            <span id="rating">⭐ 5.0</span>
                        </div>
                        <p className='text-[10px] md:text-sm md:mt-8 mb-2 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quisquam in laborum dignissimos nesciunt laudantium!</p>
                    </div>
                    
                    <div className='flex items-center md:justify-between text-md md:text-xl'>
                        <div className="flex gap-5">
                            <span className='border-black border-[1px] px-3 py-1 md:px-5 md:py-2 rounded-lg'>Html</span>
                            <span className='border-black border-[1px] px-3 py-1 md:px-5 md:py-2 rounded-lg'>Web</span>
                        </div>
                        <button className='hidden md:block text-white bg-[#324498] rounded-full px-6 py-2'>➡</button>
                    </div>
                    <div className='pt-3 block md:hidden '>
                        <button className='w-fit text-white bg-[#324498] rounded-full px-4 py-1 '>➡</button>
                    </div>
                </div>
            </div>

            <div className='w-full rounded-xl shadow-lg bg-white flex overflow-hidden'>
                <div className='w-2/5'>
                    <img className='w-full h-full rounded-lg.' src={js} />
                </div>
                <div className='w-3/5 mx-auto flex flex-col justify-between p-3 md:p-5'>
                    <div className='flex flex-col justify-between'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-center text-2xl md:text-4xl lg:text-5xl font-semibold text-[#324498]'>HTML</h1>
                            <span id="rating">⭐ 5.0</span>
                        </div>
                        <p className='text-[10px] md:text-sm md:mt-8 mb-2 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quisquam in laborum dignissimos nesciunt laudantium!</p>
                    </div>
                    
                    <div className='flex items-center md:justify-between text-md md:text-xl'>
                        <div className="flex gap-5">
                            <span className='border-black border-[1px] px-3 py-1 md:px-5 md:py-2 rounded-lg'>Html</span>
                            <span className='border-black border-[1px] px-3 py-1 md:px-5 md:py-2 rounded-lg'>Web</span>
                        </div>
                        <button className='hidden md:block text-white bg-[#324498] rounded-full px-6 py-2'>➡</button>
                    </div>
                    <div className='pt-3 block md:hidden '>
                        <button className='w-fit text-white bg-[#324498] rounded-full px-4 py-1 '>➡</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Pathway;

// marine blue - #324498
// sunglow - #FFCB33
// davy grey - #595959
// white - #FCFCFC
// black - #1B1B1C
