// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Cards = ({ product }) => {
//   return (
//     <div className="flex flex-col justify-between max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-2 sm:px-5 md:px-2 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
//       <Link to={`/products/${product._id}`} >
//         <img
//           src={product.image[0]}
//           alt={product.name}
//           className="object-cover object-center w-full rounded-md h-48 sm:h-60 md:h-72 lg:h-80 dark:bg-gray-500"
//         />
//       </Link>

//       <div className="mt-4 mb-2">
//         <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">
//           {product.name}
//         </span>
//       </div>

//       <div className="flex items-center justify-between font-bold text-sm sm:text-base dark:text-gray-800">
//         <div className="text-gray-700">₹ {product.price}</div>
//         <div className="text-gray-700">₹ {product.ageGroup}</div>
//       </div>
//     </div>
//   );
// };

// export default Cards;
