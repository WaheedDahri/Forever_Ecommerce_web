// import React from 'react';
// import { NavLink } from 'react-router-dom'
// import { assets } from '../assets/assets';

// const Sidebar = () => {
//   return (
//     <div className='w-[18%] min-h-screen border-r-2'>
//       <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

//     <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1">
//         <img className='w-5 h-5' src={assets.add_icon}  alt="" />
//         <p className='hidden md:block'>Add items</p>
//     </NavLink>
//      <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1">
//         <img className='w-5 h-5' src={assets.order_icon}  alt="" />
//         <p className='hidden md:block'>list items</p>
//     </NavLink>
//      <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1">
//         <img className='w-5 h-5' src={assets.order_icon}  alt="" />
//         <p className='hidden md:block'>order items</p>
//     </NavLink>
//     </div>

//     </div>
//   );
// }

// export default Sidebar;


import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1 ${
      isActive ? 'bg-pink-200 text-gray' : ''
    }`;

  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        
        <NavLink to="/add" className={linkClass}>
          <img className='w-5 h-5' src={assets.add_icon} alt="Add" />
          <p className='hidden md:block '>Add items</p>
        </NavLink>

        <NavLink to="/list" className={linkClass}>
          <img className='w-5 h-5' src={assets.order_icon} alt="List" />
          <p className='hidden md:block'>List items</p>
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          <img className='w-5 h-5' src={assets.order_icon} alt="Orders" />
          <p className='hidden md:block'>Order items</p>
        </NavLink>

      </div>
    </div>
  );
}

export default Sidebar;
