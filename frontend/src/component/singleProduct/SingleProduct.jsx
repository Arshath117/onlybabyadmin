// import React, { useContext, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight, Save, Edit, X } from "lucide-react";
// import { ProductContext } from "../context";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const SingleProduct = () => {
//   const { id } = useParams();
//   const { products } = useContext(ProductContext);
//   const [product, setProduct] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedProduct, setEditedProduct] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const selectedProduct = products.find((product) => product._id === id);
//     setProduct(selectedProduct);
//     setEditedProduct(selectedProduct); // Initialize editable fields
//   }, [id, products]);

//   if (!product) return <p>Loading...</p>;

//   const handleNextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
//     );
//   };

//   const handleFieldChange = (field, value) => {
//     setEditedProduct({ ...editedProduct, [field]: value });
//   };

//   const handleSave = async () => {
//     // Simulate backend call to save the edited product
//     try {
//       const updatedProduct = {
//         ...editedProduct,
//         price: editedProduct.price ? Number(editedProduct.price) : undefined,
//       };


//       const response = await axios.put(
//         "https://onlybaby-admin.onrender.com/api/products/update",
//         {
//           productId: id, // Send the product ID
//           updatedProduct, // Send the updated product data
//         }
//       );

//       if (response.status === 200) {
//         const updatedProduct = response.data; // Assuming the backend returns the updated product
//         setProduct(updatedProduct); // Update the product with new data
//         setIsEditing(false); // Exit edit mode
//       } else {
//         console.error("Failed to save changes.");
//       }
//     } catch (error) {
//       console.error("Error saving changes:", error);
//     }
//   };

//   const handleCancel = () => {
//     setEditedProduct(product); // Reset edited fields to original product
//     setIsEditing(false); // Exit edit mode
//   };

//   return (
//     <>
//       {/* Sticky Navigation */}
//       <div className="sticky top-[80px] md:top-[89px] z-10 bg-white shadow-md px-4 py-3 flex justify-between items-center">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-1 text-xl text-blue-500 hover:underline"
//         >
//           Back
//         </button>
//         {isEditing ? (
//           <>
//             <button
//               onClick={handleSave}
//               className="flex items-center text-xl gap-1 text-green-500 hover:underline"
//             >
//               <Save className="w-5 h-5" />
//               Save
//             </button>
//             <button
//               onClick={handleCancel}
//               className="flex items-center text-xl gap-1 text-red-500 hover:underline"
//             >
//               <X className="w-5 h-5" />
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="flex items-center text-xl gap-1 text-blue-500 hover:underline"
//           >
//             <Edit className="w-5 h-5" />
//             Edit
//           </button>
//         )}
//       </div>

//       {/* Product Content */}
//       <div className="mt-14 lg:mt-20 p-4 max-w-[1100px] mx-auto md:w-full lg:grid lg:grid-cols-2 lg:gap-8">
//         {/* Image Section */}
//         <div className="relative w-full h-auto">
//           <img
//             src={product.image[currentImageIndex]}
//             alt={`Product Image ${currentImageIndex + 1}`}
//             className="w-full h-auto rounded-md"
//           />
//           <button
//             onClick={handlePrevImage}
//             className="absolute left-2 top-1/2 transform -translate-y-1/2 px-3 py-3 bg-black opacity-70 rounded-full text-white"
//           >
//             <ChevronLeft />
//           </button>
//           <button
//             onClick={handleNextImage}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-3 bg-black opacity-70 rounded-full text-white"
//           >
//             <ChevronRight />
//           </button>
//         </div>

//         {/* Product Details */}
//         <div className="mt-4 md:mt-10">
//           <h2 className="text-xl md:text-4xl lg:text-5xl font-bold">
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={editedProduct.name}
//                 onChange={(e) => handleFieldChange("name", e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               product.name
//             )}
//           </h2>
//           <h2 className="text-lg md:text-4xl font-bold text-green-500">
//             {isEditing ? (
//               <input
//                 type="number"
//                 value={editedProduct.price}
//                 onChange={(e) => handleFieldChange("price", e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               `Price: ₹${product.price}`
//             )}
//           </h2>

//           <div className="mt-4">
//             <h3 className="font-bold">Age Group:</h3>
//             {isEditing ? (
//               <textarea
//                 value={editedProduct.ageGroup}
//                 onChange={(e) => handleFieldChange("ageGroup", e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               <p>{product.ageGroup}</p>
//             )}
//           </div>

//           <p className="mt-2 text-lg">
//             {isEditing ? (
//               <textarea
//                 value={editedProduct.description}
//                 onChange={(e) =>
//                   handleFieldChange("description", e.target.value)
//                 }
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               product.description
//             )}
//           </p>

//           {/* Additional Details */}
//           <div className="mt-4">
//             <h3 className="font-bold">Features:</h3>
//             {isEditing ? (
//               <textarea
//                 value={editedProduct.features}
//                 onChange={(e) => handleFieldChange("features", e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               <p>{product.features}</p>
//             )}
//           </div>

//           <div className="mt-4">
//             <h3 className="font-bold">Benefits:</h3>
//             {isEditing ? (
//               <textarea
//                 value={editedProduct.benefits}
//                 onChange={(e) => handleFieldChange("benefits", e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               <p>{product.benefits}</p>
//             )}
//           </div>

//           <div className="mt-4">
//             <h3 className="font-bold">Color:</h3>
//             {isEditing ? (
//               <textarea
//                 value={editedProduct.color}
//                 onChange={(e) => handleFieldChange("color", e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               <p>{product.color}</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleProduct;
