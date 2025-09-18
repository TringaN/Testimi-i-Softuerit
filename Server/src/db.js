// server/src/db.js
import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB || "librarydb";

  try {
    await mongoose.connect(uri, { dbName });
    console.log(`✅ MongoDB connected to database: ${dbName}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
