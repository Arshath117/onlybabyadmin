// // AddProduct.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AddProduct = ({ onClose, onProductAdded }) => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [productName, setProductName] = useState("");
//   const [price, setPrice] = useState("");
//   const [ageGroup, setAgeGroup] = useState("");
//   const [color, setColor] = useState("");
//   const [description, setDescription] = useState("");
//   const [itemsIncluded, setItemsIncluded] = useState("");
//   const [features, setFeatures] = useState("");
//   const [benefits, setBenefits] = useState("");
//   const [quantity, setQuantity] = useState("");

//   const handleSubmit = async (e) => {
//     // console.log(
//     //   selectedImages,
//     //   productName,
//     //   price,
//     //   ageGroup,
//     //   color,
//     //   description,
//     //   itemsIncluded,
//     //   features,
//     //   benefits,
//     //   quantity
//     // );
//     // e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", productName);
//     formData.append("price", price);
//     formData.append("age_group", ageGroup);
//     formData.append("color", color);
//     formData.append("description", description);
//     formData.append("items_included", itemsIncluded);
//     formData.append("features", features);
//     formData.append("benefits", benefits);
//     formData.append("quantity", quantity);

//     selectedImages.forEach((image) => {
//       formData.append("images", image);
//     });

//     // Logging FormData content manually by iterating through it
//     for (let [key, value] of formData.entries()) {
//       console.log(key, value); // This will show all form fields, including images
//     }

//     console.log(formData);

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/api/products/add",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       onProductAdded(); // Call the parent callback to update the product list
//       onClose(); // Close the modal
//       alert("Product added successfully!");
//     } catch (error) {
//       console.error("Error uploading product:", error);
//       alert("Error uploading product.");
//     }
//   };

// //   useEffect(() => {
// //     handleSubmit();
// //   },[])

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-auto">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-6/12">
//         <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
//         <form>
//           {/* Form Container - Responsive Columns */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {/* Product Name */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Product Name
//               </label>
//               <input
//                 type="text"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Price */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Price</label>
//               <input
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Age Group */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Age Group
//               </label>
//               <input
//                 type="text"
//                 value={ageGroup}
//                 onChange={(e) => setAgeGroup(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Color */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Color</label>
//               <input
//                 type="text"
//                 value={color}
//                 onChange={(e) => setColor(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Description */}
//             <div className="mb-4 sm:col-span-2">
//               <label className="block text-sm font-medium mb-2">
//                 Description
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               ></textarea>
//             </div>

//             {/* Items Included */}
//             <div className="mb-4 sm:col-span-2">
//               <label className="block text-sm font-medium mb-2">
//                 Items Included
//               </label>
//               <textarea
//                 value={itemsIncluded}
//                 onChange={(e) => setItemsIncluded(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               ></textarea>
//             </div>

//             {/* Features */}
//             <div className="mb-4 sm:col-span-2">
//               <label className="block text-sm font-medium mb-2">Features</label>
//               <textarea
//                 value={features}
//                 onChange={(e) => setFeatures(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               ></textarea>
//             </div>

//             {/* Benefits */}
//             <div className="mb-4 sm:col-span-2">
//               <label className="block text-sm font-medium mb-2">Benefits</label>
//               <textarea
//                 value={benefits}
//                 onChange={(e) => setBenefits(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               ></textarea>
//             </div>

//             {/* Quantity */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Quantity</label>
//               <input
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Select Images */}
//             <div className="mb-4 sm:col-span-2">
//               <label className="block text-sm font-medium mb-2">
//                 Select Images
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) => setSelectedImages(Array.from(e.target.files))}
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end space-x-4 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ onClose, onProductAdded }) => {
  const [formDataState, setFormDataState] = useState({
    productName: "",
    price: "",
    ageGroup: "",
    color: "",
    description: "",
    itemsIncluded: "",
    features: "",
    benefits: "",
    quantity: "",
    // selectedImages: [], // Array for selected images
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormDataState((prevState) => ({
      ...prevState,
      selectedImages: Array.from(e.target.files),
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(formDataState)) {
      if (key !== "selectedImages") {
        formData.append(key, value);
      } 
    //   else {
    //     value.forEach((image) => formData.append("images", image));
    //   }
    }

    console.log("FormData:", formDataState);

    let object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    let json = JSON.stringify(object);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/products/add",
        json,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onProductAdded(); // Call the parent callback to update the product list
      onClose(); // Close the modal
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Error uploading product.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formDataState.productName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formDataState.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Age Group */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Age Group
              </label>
              <input
                type="text"
                name="ageGroup"
                value={formDataState.ageGroup}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Color */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Color</label>
              <input
                type="text"
                name="color"
                value={formDataState.color}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formDataState.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              ></textarea>
            </div>

            {/* Items Included */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Items Included
              </label>
              <input
                type="text"
                name="itemsIncluded"
                value={formDataState.itemsIncluded}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Features */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Features</label>
              <input
                type="text"
                name="features"
                value={formDataState.features}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Benefits</label>
              <input
                type="text"
                name="benefits"
                value={formDataState.benefits}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formDataState.quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Select Images */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Images
              </label>
              <input
                type="file"
                name="selectedImages"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
