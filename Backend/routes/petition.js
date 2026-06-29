import express from "express";
import { handleGeneratePetition, handleDownloadPetition } from "../controllers/petitionController.js";

const router = express.Router();

router.post("/", handleGeneratePetition);
router.get("/download", handleDownloadPetition);

export default router;
