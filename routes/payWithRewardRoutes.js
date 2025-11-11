import express from "express";
import {  savePaymentDetail,getPaymentDetail } from "../controllers/payWithRewardController.js";

const router = express.Router();

router.post("/", savePaymentDetail);
router.get("/", getPaymentDetail);
// ✅ GET: Fetch all locations
// router.get("/", getLocations);

export default router;