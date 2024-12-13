import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/admin.router.js";
import cors from "cors";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products",productRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);
})