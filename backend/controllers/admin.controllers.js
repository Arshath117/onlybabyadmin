import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;



//try
export const addProduct = async (req, res) => {
  console.log("Request data:", req.body);

  const client = new MongoClient(mongoUri);
  try {
    const {
      name,
      price,
      ageGroup,
      color,
      description,
      itemsIncluded,
      features,
      benefits,
      quantity,
      image, // Array of image URLs sent from the frontend
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !price ||
      !ageGroup ||
      !color ||
      !description ||
      !itemsIncluded ||
      !features ||
      !benefits ||
      !quantity ||
      !image ||
      image.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields or images",
      });
    }

    // Connect to MongoDB
    await client.connect();
    const db = client.db(dbName);
    const productsCollection = db.collection(process.env.COLLECTION);

    // Create the product object
    const product = {
      name,
      price,
      ageGroup,
      color,
      description,
      itemsIncluded,
      features,
      benefits,
      quantity,
      image, // Store the array of image URLs directly
    };

    // Insert the product into the database
    const result = await productsCollection.insertOne(product);

    console.log("Product added:", product);

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
  console.log("text from removeProduct controller");
  let client;
  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const productsCollection = db.collection(process.env.COLLECTION);
    const productId = req.query.productId;
    console.log(productId);
    await productsCollection.deleteOne({ _id: new ObjectId(productId) });
    res
      .status(200)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log("Error in removeProduct controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

export const updateProduct = async (req, res) => {
  let client;
  try {
    const { productId, updatedProduct } = req.body; // Destructure the data from the request body

    // Remove the _id field from updatedProduct if it's present (to avoid trying to modify it)
    const { _id, ...updatedProductWithoutId } = updatedProduct;

    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const productsCollection = db.collection(process.env.COLLECTION);

    // Use updateOne to update the product by its _id
    const result = await productsCollection.updateOne(
      { _id: new ObjectId(productId) }, // Ensure productId is an ObjectId
      { $set: updatedProductWithoutId } // Set the updated fields, excluding _id
    );

    if (result.modifiedCount > 0) {
      // Optionally fetch the updated product to return it to the client
      const updatedProductDoc = await productsCollection.findOne({
        _id: new ObjectId(productId),
      });
      res.status(200).json(updatedProductDoc); // Return the updated product
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found or no changes made.",
      });
    }
  } catch (error) {
    console.log("Error in updateProduct controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

