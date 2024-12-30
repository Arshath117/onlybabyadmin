import { MongoClient, ObjectId } from "mongodb";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Twilio Auth Token
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number
const twilioClient = twilio(accountSid, authToken);

export const getOrders = async (req, res) => {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const orders = await db.collection("orders").find({}).toArray();
    res.json(orders);
    client.close();
  } catch (error) {
    res.status(500).send("Error fetching orders: " + error.message);
  }
};

export const updateOrderDeliveryStatus = async (req, res) => {
  const { orderId, isDelivered } = req.body; // Get orderId and isDelivered from the request body

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db("store_db"); // Replace with your actual database name
    const ordersCollection = db.collection("orders"); // Replace with your actual collection name

    // Update the isDelivered field in the specific order by matching the orderId inside the orders array
    const result = await ordersCollection.updateOne(
      {
        "orders._id": new ObjectId(orderId), // Match the specific order using orderId (inside the orders array)
      },
      {
        $set: { "orders.$.isDelivered": isDelivered }, // Set the isDelivered field to the passed value
      }
    );

    // Log the result to debug
    console.log(result);

    // Check if the order was found and updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const userOrder = await ordersCollection.findOne(
      { "orders._id": new ObjectId(orderId) }, // Match the specific order by ID
      { projection: { "orders.$": 1 } } // Use $elemMatch to return only the matched order
    );

    if (isDelivered && userOrder?.orders?.length > 0) {
      const matchedOrder = userOrder.orders[0]; // Access the matched order
      const { shippingAddress, orderItems, totalPrice } = matchedOrder;

      // Log the extracted fields
      console.log("Shipping Address:", shippingAddress);
      console.log("Order Items:", orderItems);
      console.log("Total Price:", totalPrice);

      // Construct the phone number in E.164 format
      const recipientPhone = `+91${shippingAddress.phone}`; // Add +91 for Indian numbers

      // // Construct SMS message
      const smsMessage = `
      Hello ${shippingAddress.firstName} ${shippingAddress.lastName},
      Your order has been dispatched! Details:
      Order ID: ${orderId}
      Total Price: ₹${totalPrice}
      Items: ${orderItems.map((item) => item.name).join(", ")}
      You will receive your order within 4 - 5 business days. Thank you for shopping with us!
      `;

      // // Send SMS
      try {
        const smsResponse = await twilioClient.messages.create({
          body: smsMessage,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: recipientPhone, // Use formatted phone number
        });
        console.log("SMS sent successfully:", smsResponse);
      } catch (smsError) {
        console.error("Error sending SMS:", smsError);
      }
    }

    // Send success response
    res
      .status(200)
      .json({ message: "Order delivery status updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
