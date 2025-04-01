import express from "express";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });

import { addProduct, getProducts, removeProduct, updateProduct } from "../controllers/admin.controllers.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/get", getProducts);
router.delete("/remove", removeProduct);
router.put('/updateProduct', updateProduct); 

export default router;