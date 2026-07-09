import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";
import petitionRoutes from "./routes/petition.js";
import resourceRoutes from "./routes/resources.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/petition", petitionRoutes);
app.use("/api/resources", resourceRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "HAQMarg Backend Running Successfully 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});