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
      !colors || !Array.isArray(colors) || colors.length === 0 ||
      !description ||
      !itemsIncluded ||
      !features ||
      !benefits ||
      quantity == null
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

 
    for (const colorVariant of colors) {
      if (!colorVariant.color || !colorVariant.imageUrls || !Array.isArray(colorVariant.imageUrls) || colorVariant.imageUrls.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Each color variant must have a name and at least one image URL",
        });
      }
    }

  
    const numericPrice = Number(price);
    const numericQuantity = Number(quantity);

    if (isNaN(numericPrice) || isNaN(numericQuantity)) {
      return res.status(400).json({
        success: false,
        message: "Price and quantity must be valid numbers",
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
        images: colorVariant.imageUrls,
        video: colorVariant.videoUrl || null
      })),
      description,
      itemsIncluded,
      features,
      benefits,
      quantity: numericQuantity,
      discount: discount,
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

    product.colors.forEach(colorVariant => {
      // Delete images
      colorVariant.images.forEach(imageUrl => {
        const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract public ID from URL
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
      message: "Product and associated media removed successfully",
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

    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const productsCollection = db.collection(process.env.COLLECTION);

    const existingProduct = await productsCollection.findOne({ _id: new ObjectId(productId) });
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Handle media deletion
    if (deletedMedia) {
      for (const [color, media] of Object.entries(deletedMedia)) {
        const existingColor = existingProduct.colors.find(c => c.color === color);
        if (existingColor) {
          if (media.images && media.images.length > 0) {
            for (const index of media.images) {
              if (existingColor.images[index]) {
                const imageUrl = existingColor.images[index];
                const publicId = imageUrl.split("/").pop().split(".")[0];
                try {
                  await cloudinary.uploader.destroy(publicId);
                } catch (cloudinaryError) {
                  console.error(`Failed to delete image ${publicId} from Cloudinary:`, cloudinaryError);
                }
              }
            }
          }
          if (media.video && existingColor.video) {
            const publicId = existingColor.video.split("/").pop().split(".")[0];
            try {
              await cloudinary.uploader.destroy(publicId);
            } catch (cloudinaryError) {
              console.error(`Failed to delete video ${publicId} from Cloudinary:`, cloudinaryError);
            }
          }
        }
      }
    }

    // Validate image and video limits
    for (const colorObj of updatedProduct.colors) {
      if (colorObj.images.length > 5) {
        return res.status(400).json({ error: `Maximum 5 images allowed for ${colorObj.color}` });
      }
      if (colorObj.video && typeof colorObj.video === 'string' && colorObj.video !== existingProduct.colors.find(c => c.color === colorObj.color)?.video) {
        if (existingProduct.colors.find(c => c.color === colorObj.color)?.video) {
          return res.status(400).json({ error: `Only one video allowed for ${colorObj.color}` });
        }
      }
    }

    // Remove the _id field from updatedProduct to prevent updating it
    const { _id, ...updateData } = updatedProduct;

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updateData } // Use updateData instead of updatedProduct
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
