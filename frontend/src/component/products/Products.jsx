import React, { useContext } from "react";
import Cards from "../cards/Cards";
import { ProductContext } from "../context";

const Products = () => {
  const { products } = useContext(ProductContext);



  return (
    <div className="w-full mx-auto">
      <h2 className="text-3xl font-semibold font-logo text-center text-gray-800 my-6">
        All PRODUCT
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 mb-20">
        {products.map((product) => (
          <Cards key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
