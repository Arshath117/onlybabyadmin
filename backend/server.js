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

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true }));


app.use(cors({
    origin: "*",
    // origin: ["http://localhost:5173", "http://localhost:5002"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
}));


app.use("/api/products",productRouter);
app.use("/api/auth/",authRoutes);
app.use("/api/",orderRoutes);

const PORT = process.env.PORT || 5002;
 
app.get("/",(req, res)=> {
    res.send("server running")
})


// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname,"/frontend/dist")));
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
//     });
// }

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);
})