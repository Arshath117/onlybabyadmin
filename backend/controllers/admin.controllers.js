import { MongoClient, ObjectId } from "mongodb";
import cloudinary from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const addProduct = async (req, res) => {
  const client = new MongoClient(mongoUri);
  try {
    const {
      name,
      price,
      ageGroup,
      colors,
      description,
      itemsIncluded,
      features,
      benefits,
      quantity,
      discount,
    } = req.body;

    console.log(req.body);


    if (
      !name ||
      price == null ||
      !ageGroup ||
      !colors || !Array.isArray(colors) || colors.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, price, ageGroup, and at least one color.",
      });
    }

    for (const colorVariant of colors) {
      if (!colorVariant.color) {
        return res.status(400).json({
          success: false,
          message: "Each color variant must have a name.",
        });
      }
    }


    const numericPrice = Number(price);
    const numericQuantity = Number(quantity);

    if (isNaN(numericPrice)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid number",
      });
    }

    if (quantity !== undefined && quantity !== null && isNaN(numericQuantity)) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a valid number",
      });
    }


    await client.connect();
    const db = client.db(dbName);
    const productsCollection = db.collection(process.env.COLLECTION);


    const product = {
      name,
      price: numericPrice,
      ageGroup,
      colors: colors.map(colorVariant => ({
        color: colorVariant.color,
        images: colorVariant.imageUrls || [],
        video: colorVariant.videoUrl || null
      })),
      description: description || null,
      itemsIncluded: itemsIncluded || null,
      features: features || null,
      benefits: benefits || null,
      quantity: numericQuantity !== undefined && numericQuantity !== null ? numericQuantity : null,
      discount: discount || null,
      createdAt: new Date(),
    };

    const result = await productsCollection.insertOne(product);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      productId: result.insertedId,
    });
  } catch (error) {
    console.error("Error in addProduct controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};


export const getProducts = async (req, res) => {
  let client;
  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const productsCollection = db.collection(process.env.COLLECTION);
    const products = await productsCollection.find().toArray();
    
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getProducts controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    if (client) {
      await client.close();
    }
  }
};


export const removeProduct = async (req, res) => {
  let client;
  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const productsCollection = db.collection(process.env.COLLECTION);
    const productId = req.query.productId;

    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const deletePromises = [];

    // Delete images and videos from product colors
    product.colors.forEach(colorVariant => {
      colorVariant.images.forEach(imageUrl => {
        const publicId = imageUrl.split('/').pop().split('.')[0];
        deletePromises.push(
          cloudinary.uploader.destroy(publicId, { resource_type: 'image' })
            .catch(err => console.error(`Failed to delete image ${publicId}:`, err))
        );
      });

      if (colorVariant.video) {
        const videoPublicId = colorVariant.video.split('/').pop().split('.')[0];
        deletePromises.push(
          cloudinary.uploader.destroy(videoPublicId, { resource_type: 'video' })
            .catch(err => console.error(`Failed to delete video ${videoPublicId}:`, err))
        );
      }
    });

    // Delete review images (since reviews are embedded in product)
    if (Array.isArray(product.reviews)) {
      product.reviews.forEach(review => {
        if (Array.isArray(review.images)) {
          review.images.forEach(imageUrl => {
            const publicId = imageUrl.split('/').pop().split('.')[0];
            deletePromises.push(
              cloudinary.uploader.destroy(publicId, { resource_type: 'image' })
                .catch(err => console.error(`Failed to delete review image ${publicId}:`, err))
            );
          });
        }
      });
    }

    await Promise.all(deletePromises);

    const deleteResult = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found during deletion",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product, reviews, and all associated media removed successfully",
    });
  } catch (error) {
    console.error("Error in removeProduct controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export const updateProduct = async (req, res) => {
  let client;
  try {
    const { productId, updatedProduct, deletedMedia } = req.body;

    if (!productId || !updatedProduct) {
      return res.status(400).json({ error: "Product ID and updated product data are required." });
    }

    const { name, price, ageGroup, colors } = updatedProduct;

    // Validate required fields if they are present in the update
    if (name === "") {
      return res.status(400).json({ error: "Product Name is required." });
    }
    if (price === null || price === undefined || isNaN(Number(price))) {
      return res.status(400).json({ error: "Price must be a valid number." });
    }
    if (!ageGroup) {
      return res.status(400).json({ error: "Age Group is required." });
    }
    if (colors && (!Array.isArray(colors) || colors.length === 0)) {
      return res.status(400).json({ error: "At least one color is required." });
    }
    if (colors && Array.isArray(colors)) {
      for (const colorVariant of colors) {
        if (!colorVariant.color) {
          return res.status(400).json({ error: "Each color variant must have a name." });
        }
        // New requirement: At least one image per color
        if (!colorVariant.images || !Array.isArray(colorVariant.images) || colorVariant.images.length === 0) {
          return res.status(400).json({ error: `Each color variant (${colorVariant.color}) must have at least one image.` });
        }
      }
    }

    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const productsCollection = db.collection(process.env.COLLECTION);

    const existingProduct = await productsCollection.findOne({ _id: new ObjectId(productId) });
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Identify and delete media for removed color variants
    const existingColorsMap = new Map(existingProduct.colors.map(c => [c.color, c]));
    const updatedColorsSet = new Set(updatedProduct.colors ? updatedProduct.colors.map(c => c.color) : []);

    for (const [colorName, existingColor] of existingColorsMap) {
      if (!updatedColorsSet.has(colorName)) {
        // Color variant has been removed
        if (existingColor.images && existingColor.images.length > 0) {
          for (const imageUrl of existingColor.images) {
            if (imageUrl) {
              const publicId = imageUrl.split("/").pop().split(".")[0];
              try {
                await cloudinary.uploader.destroy(publicId);
                console.log(`Deleted image from Cloudinary: ${publicId}`);
              } catch (cloudinaryError) {
                console.error(`Failed to delete image ${publicId} from Cloudinary:`, cloudinaryError);
              }
            }
          }
        }
        if (existingColor.video) {
          const publicId = existingColor.video.split("/").pop().split(".")[0];
          try {
            await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
            console.log(`Deleted video from Cloudinary: ${publicId}`);
          } catch (cloudinaryError) {
            console.error(`Failed to delete video ${publicId} from Cloudinary:`, cloudinaryError);
          }
        }
      }
    }

    // Handle media deletion for specific images/videos within a color variant
    if (deletedMedia) {
      for (const [color, media] of Object.entries(deletedMedia)) {
        const existingColorInDb = await productsCollection.findOne(
          { _id: new ObjectId(productId), "colors.color": color },
          { projection: { "colors.$": 1 } }
        );
        const existingColorData = existingColorInDb?.colors?.[0];

        if (existingColorData) {
          if (media.images && media.images.length > 0) {
            const updatedImages = existingColorData.images.filter((_, index) => !media.images.includes(index));
            const imagesToDelete = existingColorData.images.filter((_, index) => media.images.includes(index));
            for (const imageUrl of imagesToDelete) {
              if (imageUrl) {
                const publicId = imageUrl.split("/").pop().split(".")[0];
                try {
                  await cloudinary.uploader.destroy(publicId);
                  console.log(`Deleted image from Cloudinary (deletedMedia): ${publicId}`);
                } catch (cloudinaryError) {
                  console.error(`Failed to delete image ${publicId} from Cloudinary (deletedMedia):`, cloudinaryError);
                }
              }
            }
            updatedProduct.colors = updatedProduct.colors.map(c =>
              c.color === color ? { ...c, images: updatedImages } : c
            );
          }
          if (media.video && existingColorData.video) {
            const videoUrlToDelete = existingColorData.video;
            const publicId = videoUrlToDelete.split("/").pop().split(".")[0];
            try {
              await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
              console.log(`Deleted video from Cloudinary (deletedMedia): ${publicId}`);
              updatedProduct.colors = updatedProduct.colors.map(c =>
                c.color === color ? { ...c, video: null } : c
              );
            } catch (cloudinaryError) {
              console.error(`Failed to delete video ${publicId} from Cloudinary (deletedMedia):`, cloudinaryError);
            }
          }
        }
      }
    }

    // Validate image and video limits for updated product
    if (updatedProduct.colors) {
      for (const colorObj of updatedProduct.colors) {
        if (colorObj.images && colorObj.images.length > 5) {
          return res.status(400).json({ error: `Maximum 5 images allowed for ${colorObj.color}` });
        }
        if (colorObj.video && typeof colorObj.video === 'string' && colorObj.video !== existingProduct.colors.find(c => c.color === colorObj.color)?.video) {
          if (existingProduct.colors.find(c => c.color === colorObj.color)?.video) {
            return res.status(400).json({ error: `Only one video allowed for ${colorObj.color}` });
          }
        }
      }
    }

    // Remove the _id field from updatedProduct to prevent updating it
    const { _id, ...updateData } = updatedProduct;

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updateData }
    );

    if (result.modifiedCount > 0) {
      const updatedProductDoc = await productsCollection.findOne({ _id: new ObjectId(productId) });
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProductDoc,
      });
    } else {
      res.status(404).json({ error: "Product not found or no changes made" });
    }
  } catch (error) {
    console.error("Error in updateProduct controller:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  } finally {
    if (client) await client.close();
  }
};
