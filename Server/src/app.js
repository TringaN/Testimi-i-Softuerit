import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./db.js";
import usersRouter from "./routes/users.js";
import booksRouter from "./routes/books.js";
import authRouter from "./routes/auth.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { adminMiddleware } from "./middleware/adminMiddleware.js";


const app = express();

// ✅ Vendos CORS me konfigurim specifik
app.use(cors({
  origin: "http://localhost:3000",   // lejo React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

// ✅ Auth routes (pa middleware, të hapura)
app.use("/api/auth", authRouter);

// ✅ Routes të mbrojtura (me JWT middleware)
app.use("/api/books", authMiddleware, booksRouter); // të gjithë user-at
app.use("/api/users", authMiddleware, adminMiddleware, usersRouter); // vetëm admin

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
