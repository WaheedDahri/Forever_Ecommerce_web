import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";

const Product = () => {
  const { productid } = useParams();
  const { products, currency, addToCartBackend } = useContext(ShopContext);
  const [size, setSize] = useState('')
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");



  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === productid);

      if (product && product.image?.length > 0) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }, [productid, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Left Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="Product"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="Selected Product" />
          </div>
        </div>
        {/*-----product info------ */}
        <div className="flex-1">
         <h1 className="font-medium text-2xl ">{productData.name}</h1>
         <div className="flex items-center gap-1 mt-2">
          <img src={assets.star_icon} alt="" className="w-2 5" />
          <img src={assets.star_icon}  alt="" className="w-2 5" />
          <img src={assets.star_icon}  alt="" className="w-2 5" />
          <img src={assets.star_icon}  alt="" className="w-2 5" />
          <img src={assets.star_dull_icon} alt="" className="w-2 5" />
          <p className="pl-2">(122)</p>
         </div>
         <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
         <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
         <div className="flex flex-col gap-4 my-8 mt-3">
          <p>Select Size</p>
          <div className="flex gap-2">
            {productData.sizes.map((item,index)=>(
          <button onClick={() => setSize(item)}  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : '' }`}key={index}>{item}</button>
           ))}

          </div>
         </div>
         {/* <button onClick={()=> addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button> */}
         <button
  onClick={() => addToCartBackend(productData._id, size)}
  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
>
  ADD TO CART
</button>
         <hr className="mt-4 sm:w-4/5" /> 
         <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
          <p>100% original product</p>
          <p>cash on delivery available on this product.</p>
          <p>easy return and exchange policy within 7 days.</p>

         </div>
        </div>
      </div>
      {/*------description and review section------*/}
      <div className="mt-20 mb-20">
        <div className="flex">
        <b className="border px-5 py-3 text-sm">Description</b>
        <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>
         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque debitis modi nesciunt ratione labore, vitae animi, rerum officia facere distinctio dolores, alias iste fuga provident fugiat ipsum! Placeat, ut quisquam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat iusto ea illo sit veritatis possimus dolorem perspiciatis, perferendis voluptatibus rem ratione beatae. Facilis cum, enim minima nisi iste exercitationem at.</p>
       <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, delectus dicta! Nostrum exercitationem odio excepturi, sit cupiditate recusandae eveniet, veniam harum vel nobis aut! Sequi fugit vitae dolorum voluptatibus totam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati officiis voluptatibus blanditiis fuga voluptates dolores esse, corrupti eaque delectus facilis eligendi hic voluptas unde accusantium necessitatibus at tenetur iure cupiditate.</p>
         </div>
      </div>
      {/*display related products*/}
      <div className=" flex items-center mr-2 ">
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/></div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
XMLDocument