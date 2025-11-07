// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true } // mot de passe en clair (pour TP)
}, { timestamps: true });

export default mongoose.model("User", userSchema);
