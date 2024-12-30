import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated, config } from "@react-spring/web";
import axios from "axios";
import { ProductContext } from "../context";
import ImageGallery from "./ImageGallery";
import ProductDetails from "./ProductDetails";
import ActionButtons from "./ActionButtons";
import useProductAnimations from "../hooks/useProductAnimations";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const { fadeIn, imageSpring, buttonSpring } = useProductAnimations();

  useEffect(() => {
    const selectedProduct = products.find((product) => product._id === id);
    setProduct(selectedProduct);
    setEditedProduct(selectedProduct);
  }, [id, products]);

  if (!product) return (
    <animated.div style={fadeIn} className="flex justify-center items-center h-screen">
      <div className="animate-pulse text-2xl text-blue-500">Loading...</div>
    </animated.div>
  );

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
    );
  };

  const handleFieldChange = (field, value) => {
    setEditedProduct({ ...editedProduct, [field]: value });
  };

  const handleSave = async () => {
    try {
      const updatedProduct = {
        ...editedProduct,
        price: editedProduct.price ? Number(editedProduct.price) : undefined,
      };

      const response = await axios.put(
        "https://onlybaby-admin.onrender.com/api/products/update",
        {
          productId: id,
          updatedProduct,
        }
      );

      if (response.status === 200) {
        setProduct(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  return (
    <animated.div style={fadeIn}>
      <ActionButtons
        isEditing={isEditing}
        buttonSpring={buttonSpring}
        onBack={() => navigate(-1)}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <div className="mt-14 lg:mt-20 p-6 max-w-[1200px] mx-auto md:w-full lg:grid lg:grid-cols-2 lg:gap-12">
        <ImageGallery
          imageSpring={imageSpring}
          currentImage={product.image[currentImageIndex]}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />

        <ProductDetails
          fadeIn={fadeIn}
          product={product}
          isEditing={isEditing}
          editedProduct={editedProduct}
          onFieldChange={handleFieldChange}
        />
      </div>
    </animated.div>
  );
};

export default SingleProduct;