
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (item) =>
          item.category === category &&
          item.subCategory === subCategory
      );

      setRelated(filteredProducts.slice(0, 4));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ml-36 mt-10 ">
  {related.map((item) => (
    <ProductItem
      key={item._id}
      id={item._id}
      name={item.name}
      price={item.price}
      image={item.image}
    />
  ))}
</div>

    </div>
  );
};

export default RelatedProducts;

