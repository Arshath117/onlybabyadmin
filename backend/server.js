import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/admin.router.js";
import authRoutes from "./routes/auth.route.js";
import orderRoutes from "./routes/order.route.js";
import cors from "cors";
import path from "path";

dotenv.config();



const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({
    origin:"https://onlybaby-admin.onrender.com",
    credentials:true
}));

app.use("/api/products",productRouter);
app.use("/api/auth/",authRoutes);
app.use("/api/",orderRoutes);

const PORT = process.env.PORT || 5001;


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    });
}

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);
})