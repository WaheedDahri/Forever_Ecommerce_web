// import React, { useContext } from 'react';
// import Title from "../Components/Title";
// import { ShopContext } from '../Context/ShopContext';

// const CartTotal = () => {
//     const {currency, delivery_fee, getCartAmount} = useContext(ShopContext)
//   return (
//     <div className='w-full'>
//       <div className='text-2xl'>
//        <Title text1={'CART'} text2={'TOTALS'} />
//       </div>
//       <div className='flex flex-col gap-2 mt-2 text-sm'>
//         <div className='flex justify-between'>
//           <p>Subtotal</p>
//           <p>{currency} {getCartAmount()}.00</p>
//         </div>
//         <hr />
//         <div className='flex justify-between'>
//               <p>shipping fee</p>
//            <p>{currency} {delivery_fee}</p>
//         </div>
//         <div>
//             <b>Total</b>
//             <p>{currency} {getCartAmount() === 0}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartTotal;

import React, { useContext } from 'react';
import Title from "../Components/Title";
import { ShopContext } from '../Context/ShopContext';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl mb-3">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-3 mt-2 text-sm">
        
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {subtotal}.00</p>
        </div>

        <hr />

        {/* Shipping */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {subtotal === 0 ? 0 : delivery_fee}.00</p>
        </div>

        <hr />

        {/* Total */}
        <div className="flex justify-between text-base font-semibold">
          <p>Total</p>
          <p>{currency}  {total}.00</p>
        </div>
     
      </div>
    </div>
  );
};

export default CartTotal;
