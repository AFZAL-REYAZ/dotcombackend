import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import locationRoutes from "./routes/locationRoutes.js";
import payWithRewardRoutes from "./routes/payWithRewardRoutes.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
const app = express();

// ✅ FULL CORS CONFIG
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://dotcomfrontend.onrender.com",
    "http://dotcomgadgets.in",      // Added HTTP
    "https://dotcomgadgets.in",     // HTTPS
    "http://www.dotcomgadgets.in",  // Added HTTP www
    "https://www.dotcomgadgets.in"  // HTTPS www
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Handle preflight requests
  // app.use(cors());


// ✅ Middleware
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Dotcom backend is live 🚀");
});

app.use("/api/location", locationRoutes);
app.use("/api/paywithreward", payWithRewardRoutes);
app.use("/api/useroutes",userRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("====================================");
  console.log(`✅ App running on port ${PORT}`);
  console.log("====================================");
});
