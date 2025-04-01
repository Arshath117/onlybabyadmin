import React, { useState } from "react";
import { Loader, X } from "lucide-react";
import { useSpring, animated, config } from "@react-spring/web";
import FormField from "./FormField";
import ImagePreview from "./ImagePreview";
import axios from "axios";
import toast from "react-hot-toast";
import VideoPreview from "./VideoPreview";

const AddProduct = ({ onClose, onProductAdded }) => {
  const ageRanges = [
    { label: "0-1 Years", value: "0-1" },
    { label: "1-3 Years", value: "1-3" },
    { label: "3-6 Years", value: "3-6" },
    { label: "6-11 Years", value: "6-11" },
    { label: "11-19 Years", value: "11-19" },
  ];

  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]); // Stores colors, images & video

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ageGroup: "",
    description: "",
    itemsIncluded: "",
    features: "",
    benefits: "",
    quantity: "",
    discount: ""
  });

  // Animations
  const modalSpring = useSpring(
    { 
    from: { opacity: 0, transform: "scale(0.9)" }, 
    to: { opacity: 1, transform: "scale(1)" }, 
    config: config.gentle 
  });

  const formFieldsSpring = useSpring(
    { 
    from: { opacity: 0, transform: "translateY(20px)" }, 
    to: { opacity: 1, transform: "translateY(0)" }, 
    delay: 200, 
    config: config.gentle });

  const buttonSpring = useSpring(
    {
    from: { opacity: 0, transform: "translateY(20px)" }, 
    to: { opacity: 1, transform: "translateY(0)" }, 
    delay: 600, 
    config: config.gentle });

  const handleColorInput = (e) => {
    const count = parseInt(e.target.value, 10) || 0;

    setColors(
      Array.from({ length: count }, () => ({
        color: "",
        images: [],
        video: null
      }))
    );
  };

  // Updates color name
  const handleColorChange = (index, value) => {
    const updatedColors = [...colors];
    updatedColors[index] = {
      ...updatedColors[index],
      color: value
    };
    setColors(updatedColors);
  };

  const handleMediaChange = (index, files) => {
    if (!files || files.length === 0) return;

    const updatedColors = [...colors];
    const currentImages = updatedColors[index].images || [];
    const currentVideo = updatedColors[index].video;

    const newImages = [...currentImages];
    let newVideo = currentVideo;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") && newImages.length < 5) {
        newImages.push(file);
      } else if (file.type.startsWith("video/") && !newVideo) {
        newVideo = file;
      }
    });

    updatedColors[index] = {
      ...updatedColors[index],
      images: newImages.slice(0, 5),
      video: newVideo,
    };

    setColors(updatedColors);
  };

  const handleRemoveVideo = (index) => {
    const updatedColors = [...colors];
    updatedColors[index] = {
      ...updatedColors[index],
      video: null,
    };
    setColors(updatedColors);
  };

  const uploadToCloudinary = async (file, isVideo = false) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "only_baby");
    data.append("cloud_name", "dhkquaazr");

    const endpoint = `https://api.cloudinary.com/v1_1/dhkquaazr/${isVideo ? "video" : "image"}/upload`;
    const response = await axios.post(endpoint, data);
    return response.data.secure_url;
  };

  // Handles all media uploads
  const handleMediaUpload = async () => {
    const uploadedMedia = await Promise.all(
      colors.map(async (item) => {
        const imageUrls = await Promise.all(
          item.images.map((img) => uploadToCloudinary(img, false))
        );
        const videoUrl = item.video ? await uploadToCloudinary(item.video, true) : null;

        return {
          color: item.color,
          imageUrls,
          videoUrl,
        };
      })
    );
    return uploadedMedia;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedMedia = await handleMediaUpload();
      const productData = {
        ...formData,
        colors: uploadedMedia,
      };

      await axios.post("http://localhost:5002/api/products/add", productData, {
        headers: { "Content-Type": "application/json" },
      });

      onProductAdded();
      toast.success("Product added successfully!");
      onClose();
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Error uploading product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-40">
      <animated.div style={modalSpring} className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Add New Product</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="Product Name" 
              name="name" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              spring={formFieldsSpring} 
            />
            <FormField 
              label="Price" 
              name="price" 
              type="number" 
              value={formData.price} 
              onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
              spring={formFieldsSpring} 
            />
            <FormField 
              label="Age Group" 
              name="ageGroup" 
              type="select" 
              value={formData.ageGroup} 
              onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })} 
              options={ageRanges} 
              spring={formFieldsSpring} 
            />
            <FormField 
              label="Quantity" 
              name="quantity" 
              type="number" 
              value={formData.quantity} 
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} 
              spring={formFieldsSpring} 
            />
            
            <FormField 
              label="Description" 
              name="description" 
              type="textarea"
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              spring={formFieldsSpring} 
              className="md:col-span-2" 
            />
            <FormField 
              label="Items Included" 
              name="itemsIncluded" 
              type="textarea"
              value={formData.itemsIncluded} 
              onChange={(e) => setFormData({ ...formData, itemsIncluded: e.target.value })} 
              spring={formFieldsSpring} 
              className="md:col-span-2"
            />
            <FormField 
              label="Features" 
              name="features" 
              type="textarea"
              value={formData.features} 
              onChange={(e) => setFormData({ ...formData, features: e.target.value })} 
              spring={formFieldsSpring} 
              className="md:col-span-2"
            />
            <FormField 
              label="Benefits" 
              name="benefits" 
              type="textarea"
              value={formData.benefits} 
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} 
              spring={formFieldsSpring} 
              className="md:col-span-2"
            />
            <FormField 
              label="Colors Count" 
              name="count" 
              type="number" 
              onChange={handleColorInput} 
              spring={formFieldsSpring} 
            />

            <FormField 
              label="Discount" 
              name="discount" 
              type="number" 
              value={formData.discount} 
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })} 
              spring={formFieldsSpring} 
            />
          </div>

          

          {colors.map((item, index) => (
            <div key={index} className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Color Variant {index + 1}</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item.color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="border p-2 rounded-md w-24 text-gray-700"
                  placeholder="Enter color"
                />
              </div>

              <label className="block text-sm font-medium text-gray-700 mt-2">Upload Media (Max 5 images + 1 video)</label>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={(e) => handleMediaChange(index, e.target.files)}
                className="mt-2 block w-full text-sm text-gray-500"
              />

              {(item.images.length > 0 || item.video) && (
                <div className="mt-2">
                  {item.images.map((img, imgIndex) => (
                    <ImagePreview key={imgIndex} images={[URL.createObjectURL(img)]} />
                  ))}
                  {item.video && (
                    <VideoPreview
                      videoSrc={URL.createObjectURL(item.video)}
                      onRemove={() => handleRemoveVideo(index)}
                    />
                  )}
                </div>
              )}
            </div>
          ))}

          <animated.div style={buttonSpring} className="flex justify-end space-x-4 mt-6">
            <button onClick={onClose} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className={`px-6 py-2 rounded-lg transition-colors ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"}`}>
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Save Product"}
            </button>
          </animated.div>
        </div>
      </animated.div>
    </div>
  );
};

export default AddProduct;
