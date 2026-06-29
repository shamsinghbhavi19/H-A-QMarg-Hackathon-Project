import express from "express";
import { getNGOs, getHelplines, getFAQs } from "../controllers/resourceController.js";

const router = express.Router();

router.get("/ngos", getNGOs);
router.get("/helplines", getHelplines);
router.get("/faqs", getFAQs);

export default router;
