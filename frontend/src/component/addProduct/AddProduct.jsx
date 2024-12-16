// import React, { useState } from "react";
// import axios from "axios";
// import { Image } from "cloudinary-react"; // Import Image from cloudinary-react

// import { Cloudinary } from "@cloudinary/url-gen";
// import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

// const AddProduct = ({ onClose, onProductAdded }) => {
//   const [formDataState, setFormDataState] = useState({
//     name: "",
//     price: null,
//     ageGroup: "",
//     color: "",
//     description: "",
//     itemsIncluded: "",
//     features: "",
//     benefits: "",
//     quantity: null,
//     image: [
//       "https://th.bing.com/th/id/OIP.IcZ8nRGB7G5mFavfwzWcsQAAAA?rs=1&pid=ImgDetMain",
//       "https://th.bing.com/th/id/OIP.NA6IJp_iNpwUov3gt_YOKQAAAA?rs=1&pid=ImgDetMain",
//       "https://rukminim1.flixcart.com/image/832/832/xif0q/vehicle-pull-along/g/b/n/bump-and-go-musical-engine-toy-train-with-lights-and-music-cute-original-imaggrgzwqstzapb.jpeg?q=70",
//     ], // Array for selected images
//     // uploadedImageUrls: [], // Array for uploaded image URLs
//   });

//   // Cloudinary configuration
//   const cld = new Cloudinary({
//     cloud: {
//       cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME,
//     },
//   });

//   // Handle form field changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormDataState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setFormDataState((prevState) => ({
//       ...prevState,
//       selectedImages: Array.from(e.target.files),
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     const folderName = "/image/upload/";
    
//     // const uploadedImageUrls = [];
//     // for (let i = 0; i < formDataState.image.length; i++) {
//     //   const image = formDataState.image[i];

//     //   const publicId = `${folderName}/${formDataState.name.replace(/\s+/g, "-").toLowerCase()}_${i + 1}_700x840`;

//     //   const uploadResult = await cloudinary.uploader.upload(image, {
//     //     folder: folderName,
//     //     public_id: publicId,
//     //   });
//     //   uploadedImageUrls.push(uploadResult.secure_url);
//     // }

//     // Update the uploaded image URLs state
//     // setFormDataState((prevState) => ({
//     //   ...prevState,
//     //   uploadedImageUrls, // Store the uploaded image URLs
//     // }));

//     // const formData = new FormData();
//     // for (const [key, value] of Object.entries(formDataState)) {
//       // if (key !== "selectedImages") {
//       //   formData.append(key, value);
//       // }
//     // }
//     // formData.append(key, value);

//     // console.log("FormData:", formDataState);

//     // let object = {};
//     // formData.forEach(function (value, key) {
//     //   object[key] = value;
//     // });
//     // let json = JSON.stringify(object);

//     // formData.append("images", formDataState.selectedImages);

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/api/products/add",
//         formDataState, // Use FormData instead of JSON
//         {
//           headers: {
//             "Accept": "application/json",
//             'Content-Type': 'application/json',
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

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
//         <form>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Product Name */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Product Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formDataState.name}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Price */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formDataState.price}
//                 onChange={handleInputChange}
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
//                 name="ageGroup"
//                 value={formDataState.ageGroup}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Color */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Color</label>
//               <input
//                 type="text"
//                 name="color"
//                 value={formDataState.color}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Description */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formDataState.description}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               ></textarea>
//             </div>

//             {/* Items Included */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Items Included
//               </label>
//               <input
//                 type="text"
//                 name="itemsIncluded"
//                 value={formDataState.itemsIncluded}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Features */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Features</label>
//               <input
//                 type="text"
//                 name="features"
//                 value={formDataState.features}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Benefits */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Benefits</label>
//               <input
//                 type="text"
//                 name="benefits"
//                 value={formDataState.benefits}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Quantity */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Quantity</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={formDataState.quantity}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Select Images */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Select Images
//               </label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 multiple
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>

//           {/* Display uploaded images using Image component */}
//           <div className="mt-4">
//             <h4 className="text-sm font-medium mb-2">Uploaded Images</h4>
//             {/* <div className="grid grid-cols-3 gap-4">
//               {formDataState.uploadedImageUrls.map((url, index) => (
//                 <Image
//                   key={index}
//                   cloudName="your-cloud-name" // Replace with your Cloudinary cloud name
//                   publicId={url} // The public ID or secure URL
//                   width="200"
//                   height="200"
//                   crop="scale"
//                 />
//               ))}
//             </div> */}
//           </div>

//           <div className="flex justify-end space-x-4">
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
