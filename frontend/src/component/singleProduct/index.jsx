import React, { useContext, useEffect, useState, useRef } from "react"; // Import useRef
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { ProductContext } from "../context";
import ImageGallery from "./ImageGallery";
import ProductDetails from "./ProductDetails"; // Ensure ProductDetails is compatible with forwardRef
import ActionButtons from "./ActionButtons";
import useProductAnimations from "../hooks/useProductAnimations";
import { toast } from 'react-toastify'; // Ensure toast is imported for this component as well

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

  // Create a ref to access methods in ProductDetails
  const productDetailsRef = useRef(null);

  // Define the maximum number of images allowed per color (consistent with ProductDetails)
  const MAX_IMAGES_PER_COLOR = 7;

  useEffect(() => {
    const selectedProduct = products.find((product) => product._id === id);
    if (selectedProduct) {
      setProduct(selectedProduct);
      // Deep copy the product for editing to avoid direct state mutation
      setEditedProduct(JSON.parse(JSON.stringify(selectedProduct)));
      setSelectedColor(selectedProduct.colors[0]?.color);
    }
  }, [id, products]);

  // Handle cases where product data might not be available yet
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
    setEditedProduct(prev => {
      const updatedColors = prev.colors.filter(c => c.color !== color);
      return { ...prev, colors: updatedColors };
    });
    // Mark all media of the removed color for deletion
    setDeletedMedia(prev => ({
      ...prev,
      [color]: { images: product.colors.find(c => c.color === color)?.images.map((_, i) => i) || [], video: !!product.colors.find(c => c.color === color)?.video }
    }));
    // Also remove from newMedia if it was added
    setNewMedia(prev => {
      const newPrev = { ...prev };
      delete newPrev[color];
      return newPrev;
    });
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

    // Track for deletion on backend
    setDeletedMedia(prev => ({
      ...prev,
      [color]: {
        images: typeof indexOrType === 'number' ? [...(prev[color]?.images || []), indexOrType] : prev[color]?.images || [],
        video: indexOrType === 'video' ? true : prev[color]?.video || false
      }
    }));

    // Remove from newMedia if it was a newly added file
    if (typeof indexOrType === 'number') {
      setNewMedia(prev => ({
        ...prev,
        [color]: { ...prev[color], images: (prev[color]?.images || []).filter((_, i) => i !== indexOrType) }
      }));
    } else if (indexOrType === 'video') {
      setNewMedia(prev => ({
        ...prev,
        [color]: { ...prev[color], video: null }
      }));
    }
  };

  const handleAddImage = (color, files) => {
    console.log(`SingleProduct: handleAddImage called for ${color} with files:`, files); // Debug log
    const currentColorObject = editedProduct.colors.find(c => c.color === color);
    const currentImagesCount = currentColorObject?.images.length || 0;
    const totalNewImages = files.length;
    const combinedTotalImages = currentImagesCount + totalNewImages;

    // Check against the MAX_IMAGES_PER_COLOR constant
    if (combinedTotalImages <= MAX_IMAGES_PER_COLOR) {
      setEditedProduct(prev => ({
        ...prev,
        colors: prev.colors.map(c =>
          c.color === color ? { ...c, images: [...c.images, ...files.map(f => URL.createObjectURL(f))] } : c
        )
      }));
      setNewMedia(prev => {
        const existingImages = prev[color]?.images || [];
        // Filter out duplicates based on file object identity (or name/size)
        const newFiles = files.filter(file =>
          !existingImages.some(existing => existing === file || (existing.name === file.name && existing.size === file.size))
        );
        return {
          ...prev,
          [color]: { ...prev[color], images: [...existingImages, ...newFiles] }
        };
      });
    } else {
      // Corrected alert message to use MAX_IMAGES_PER_COLOR
      toast.warning(`Maximum ${MAX_IMAGES_PER_COLOR} images allowed for ${color}. You tried to add too many.`);
    }
  };

  const handleAddVideo = (color, file) => {
    console.log(`SingleProduct: handleAddVideo called for ${color} with file:`, file);
    setEditedProduct(prev => ({
      ...prev,
      colors: prev.colors.map(c =>
        c.color === color ? { ...c, video: URL.createObjectURL(file) } : c
      )
    }));
    setNewMedia(prev => ({
      ...prev,
      [color]: { ...prev[color], video: file }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log("Save button clicked");

    // --- NEW: Call validation from ProductDetails component ---
    if (productDetailsRef.current) {
      const isValid = productDetailsRef.current.validateColorImages();
      if (!isValid) {
        setIsSaving(false); // Stop saving if validation fails
        return; // The toast message is already shown by validateColorImages
      }
    }
    // --- END NEW VALIDATION ---

    try {
      const updatedColors = await Promise.all(editedProduct.colors.map(async (colorObj) => {
        const newImages = newMedia[colorObj.color]?.images || [];
        // Upload new images to Cloudinary (or your preferred storage)
        const uploadedImageUrls = await Promise.all(
          newImages.map(file => uploadFileToCloudinary(file, false))
        );

        const newVideoFile = newMedia[colorObj.color]?.video;
        let uploadedVideoUrl = colorObj.video; // Keep existing video URL by default
        if (newVideoFile) {
          // Upload new video if present
          uploadedVideoUrl = await uploadFileToCloudinary(newVideoFile, true);
        } else if (deletedMedia[colorObj.color]?.video) {
          // If video was marked for deletion and no new video is uploaded
          uploadedVideoUrl = null;
        }

        // Filter out blob URLs (previews) and combine with existing and newly uploaded URLs
        const finalImages = colorObj.images.filter(img => !img.startsWith('blob:')).concat(uploadedImageUrls);

        return {
          ...colorObj,
          images: finalImages,
          video: uploadedVideoUrl
        };
      }));

      const finalProduct = { ...editedProduct, colors: updatedColors };
      const { _id, ...productData } = finalProduct; // Destructure _id if your backend expects it separately

      console.log("Sending PUT request with:", { productId: id, updatedProduct: productData, deletedMedia });

      const response = await fetch(`${import.meta.env.VITE_API}/api/products/updateProduct`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          updatedProduct: productData,
          deletedMedia // Send deleted media info to backend for cleanup
        })
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Update successful:", data);
        setProduct(data.product); // Update the main product state with fresh data from backend
        setEditedProduct(JSON.parse(JSON.stringify(data.product))); // Reset edited product
        setDeletedMedia({}); // Clear deleted media tracking
        setNewMedia({}); // Clear new media tracking
        setIsEditing(false); // Exit editing mode
        toast.success("Product updated successfully!");
      } else {
        console.error("Update failed:", data.error);
        toast.error(`Update failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
      toast.error("An error occurred while saving the product.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper function to upload files to Cloudinary (assuming this logic is elsewhere or needs to be added)
  const uploadFileToCloudinary = async (file, isVideo = false) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "only_baby"); // Replace with your actual upload preset
    data.append("cloud_name", "dhkquaazr"); // Replace with your actual Cloudinary cloud name

    const resourceType = isVideo ? "video" : "image";
    const endpoint = `https://api.cloudinary.com/v1_1/dhkquaazr/${resourceType}/upload`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        return result.secure_url;
      } else {
        console.error("Cloudinary upload failed:", result);
        throw new Error(`Cloudinary upload failed: ${result.error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };


  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      // Simulate a delay for a better UX, if desired
      await new Promise(resolve => setTimeout(resolve, 300));
      // Revert editedProduct to the original product state
      setEditedProduct(JSON.parse(JSON.stringify(product)));
      setDeletedMedia({}); // Clear any pending deletions
      setNewMedia({}); // Clear any newly added media
      setIsEditing(false); // Exit editing mode
      toast.info("Changes cancelled.");
    } catch (error) {
      console.error("Error in handleCancel:", error);
      toast.error("An error occurred while cancelling changes.");
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
          ref={productDetailsRef} // Attach the ref here
          fadeIn={fadeIn}
          product={product} // Original product for display when not editing
          isEditing={isEditing}
          editedProduct={editedProduct}
          onFieldChange={(field, value) => setEditedProduct(prev => ({ ...prev, [field]: value }))}
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