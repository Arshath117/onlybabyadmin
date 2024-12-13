import express from "express";

import { addProduct, getProducts, removeProduct, updateProduct } from "../controllers/admin.controllers.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/get", getProducts);
router.delete("/remove", removeProduct);
router.patch("/update", updateProduct);   

export default router;