import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id.toString(), email: user.email },
    process.env.JWT_SECRET || "secretkeyappearshere",
    { expiresIn: "1h" }
  );
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email et mot de passe requis" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ success: false, message: "Email déjà utilisé" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ success: true, data: { userId: newUser._id, email: newUser.email, token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password)
      return res.status(401).json({ success: false, message: "Identifiants incorrects" });

    const token = generateToken(user);
    res.status(200).json({ success: true, data: { userId: user._id, email: user.email, token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
