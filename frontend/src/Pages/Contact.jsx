// import React from 'react'
// import Title from "../Components/Title";
// import { assets } from '../assets/assets';

// const Contact = () => {
//   return (
    
//       <div>
//       <div className='text-2xl'>
//         <Title text1={'CONTACT'} text2={'US'} />
//       </div>
    
//       <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
//       <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
//       <div className='flex flex-col justify-center items-start gap-6'>
//       <p></p>
//       <p></p>
//       <p></p>
//       <p></p>
//       <p></p>
//       <button></button>
//       </div>
//       </div>
//       </div>
    
//   )
// }

// export default Contact;

import React from 'react';
import Title from "../Components/Title";
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className='border-t pt-16'>

      {/* Title */}
      <div className='text-2xl text-center'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Content */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-8 mb-28 px-4'>

        {/* Image */}
        <img 
          className='w-full md:max-w-[480px] rounded-lg mr-10' 
          src={assets.contact_img} 
          alt="Contact Us" 
        />

        {/* Info */}
        <div className='flex flex-col justify-center items-start gap-4 max-w-md'>

          <p className='text-gray-600'>
            <b> Have questions or need support? We're here to help.</b>
           
          </p>

          <p className='text-gray-700'>
           <span className='font-medium'><b>Address:b</b></span>  
            <br /> PECHS Block 2, Karachi, Pakistan
          </p>

          <p className='text-gray-700'>
            <span className='font-medium'><b>Phone:</b></span>  
            <br /> +92 300 v0v00
          </p>

          <p className='text-gray-700'>
            <span className='font-medium'><b>Email:</b></span>  
            <br /> support@example.com
          </p>

          <p className='text-gray-600 mb-5'>
            <b>Our team is available Monday to Friday, 9am – 6pm.</b>
          </p>

          <button className='bg-black text-white px-6 py-2 mt-2 hover:bg-gray-800 transition-all'>
           Explore jobs
          </button>

        </div>

      </div>
    </div>
  );
};

export default Contact;
