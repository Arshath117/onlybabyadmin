import React, { useContext, useState } from "react";
import ProductCard from "../cards/ProductCard";
import { ProductContext } from "../context";

const Products = () => {
  const { products } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full mx-auto">
      {/* Search Bar */}
      <div className="flex justify-between items-center px-10 my-6">
        <h2 className="text-3xl font-semibold font-logo text-gray-800">
          All PRODUCTS
        </h2>
        <input
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-rose-300 w-1/3"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 mb-20">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2 sm:col-span-2 lg:col-span-3">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
