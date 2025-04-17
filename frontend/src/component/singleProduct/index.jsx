import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
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
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [deletedMedia, setDeletedMedia] = useState({});
  const [newMedia, setNewMedia] = useState({});
  const { fadeIn, imageSpring, buttonSpring } = useProductAnimations();
  const [isSaving, setIsSaving] = useState(false); // Track saving state
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const selectedProduct = products.find((product) => product._id === id);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setEditedProduct(selectedProduct);
      setSelectedColor(selectedProduct.colors[0]?.color);
    }
  }, [id, products]);

  if (!product) return (
    <animated.div style={fadeIn} className="flex justify-center items-center h-screen">
      <div className="animate-pulse text-2xl text-blue-500">Loading...</div>
    </animated.div>
  );

  const selectedColorData = product.colors.find((c) => c.color === selectedColor);
  const mediaItems = [
    ...(selectedColorData?.images || []),
    ...(selectedColorData?.video && selectedColorData.video !== null ? [selectedColorData.video] : [])
  ];
  console.log("Selected color:", selectedColor);
  console.log("Media items:", mediaItems);

  const handleNextMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1));
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setCurrentMediaIndex(0);
  };

  const handleRemoveColor = (color) => {
    setEditedProduct({
      ...editedProduct,
      colors: editedProduct.colors.filter(c => c.color !== color)
    });
    setDeletedMedia(prev => ({ ...prev, [color]: { images: [], video: true } }));
  };

  const handleRemoveImage = (color, indexOrType) => {
    setEditedProduct(prev => ({
      ...prev,
      colors: prev.colors.map(c =>
        c.color === color
          ? {
              ...c,
              images: typeof indexOrType === 'number' ? c.images.filter((_, i) => i !== indexOrType) : c.images,
              video: indexOrType === 'video' ? null : c.video
            }
          : c
      )
    }));
    setDeletedMedia(prev => ({
      ...prev,
      [color]: {
        images: typeof indexOrType === 'number' ? [...(prev[color]?.images || []), indexOrType] : prev[color]?.images || [],
        video: indexOrType === 'video' ? true : prev[color]?.video || false
      }
    }));
    if (indexOrType !== 'video') {
      setNewMedia(prev => ({
        ...prev,
        [color]: { ...prev[color], images: (prev[color]?.images || []).filter((_, i) => i !== indexOrType) }
      }));
    }
  };

  const handleAddImage = (color, files) => {
    console.log(`handleAddImage called for ${color} with files:`, files); // Debug log
    const currentImages = editedProduct.colors.find(c => c.color === color)?.images.length || 0;
    const totalImages = currentImages + files.length;
    if (totalImages <= 5) {
      setEditedProduct(prev => ({
        ...prev,
        colors: prev.colors.map(c =>
          c.color === color ? { ...c, images: [...c.images, ...files.map(f => URL.createObjectURL(f))] } : c
        )
      }));
      setNewMedia(prev => {
        const existingImages = prev[color]?.images || [];
        // Avoid duplicates by checking if the file is already in the list (based on name and size)
        const newFiles = files.filter(file => 
          !existingImages.some(existing => existing.name === file.name && existing.size === file.size)
        );
        return {
          ...prev,
          [color]: { ...prev[color], images: [...existingImages, ...newFiles] }
        };
      });
    } else {
      alert(`Maximum 5 images allowed for ${color}`);
    }
  };

  const handleAddVideo = (color, file) => {
    console.log(`handleAddVideo called for ${color} with file:`, file);
    setEditedProduct({
      ...editedProduct,
      colors: editedProduct.colors.map(c =>
        c.color === color ? { ...c, video: URL.createObjectURL(file) } : c
      )
    });
    setNewMedia(prev => ({
      ...prev,
      [color]: { ...prev[color], video: file }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log("Save button clicked");

    

    try {
      const updatedColors = await Promise.all(editedProduct.colors.map(async (colorObj) => {
        const newImages = newMedia[colorObj.color]?.images || [];
        const newImagesBase64 = newImages.length ? await Promise.all(
          newImages.map(file => new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result);
          }))
        ) : [];

        const newVideo = newMedia[colorObj.color]?.video;
        const newVideoBase64 = newVideo ? await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(newVideo);
          reader.onloadend = () => resolve(reader.result);
        }) : colorObj.video;

        return {
          ...colorObj,
          images: [...colorObj.images.filter(img => !img.startsWith('blob:')), ...newImagesBase64],
          video: newVideoBase64
        };
      }));

      const finalProduct = { ...editedProduct, colors: updatedColors };
      const { _id, ...productData } = finalProduct;
      console.log("Sending PUT request with:", { productId: id, updatedProduct: productData, deletedMedia });

      const response = await fetch(`${import.meta.env.VITE_API}/api/products/updateProduct`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          updatedProduct: productData,
          deletedMedia
        })
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Update successful:", data);
        setProduct(data.product);
        setDeletedMedia({});
        setNewMedia({});
        setIsEditing(false);
      } else {
        console.error("Update failed:", data.error);
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
    }finally{
      setIsSaving(false);
    }
  };

  const handleCancel = async () => {
    setIsCancelling(true); 
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      setEditedProduct(product);
      setDeletedMedia({});
      setNewMedia({});
      setIsEditing(false);
    } catch (error) {
      console.error("Error in handleCancel:", error);
    } finally {
      setIsCancelling(false); 
    }
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
        isSaving={isSaving}
        isCancelling={isCancelling}
      />

      <div className="mt-14 lg:mt-20 p-6 max-w-[1200px] mx-auto md:w-full lg:grid lg:grid-cols-2 lg:gap-12">
        <div>
          <ImageGallery
            imageSpring={imageSpring}
            mediaItems={mediaItems}
            currentIndex={currentMediaIndex}
            onNext={handleNextMedia}
            onPrev={handlePrevMedia}
          />
        </div>

        <ProductDetails
          fadeIn={fadeIn}
          product={product}
          isEditing={isEditing}
          editedProduct={editedProduct}
          onFieldChange={(field, value) => setEditedProduct({ ...editedProduct, [field]: value })}
          onColorSelect={handleColorChange}
          onRemoveColor={handleRemoveColor}
          onRemoveImage={handleRemoveImage}
          onAddImage={handleAddImage}
          onAddVideo={handleAddVideo}
        />
      </div>
    </animated.div>
  );
};

export default SingleProduct;