import express from "express";
import { getOrders, updateOrderDeliveryStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/orders",getOrders);
router.put("/orders/update",updateOrderDeliveryStatus)


export default router;