import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id.toString(), email: user.email },
    process.env.JWT_SECRET || "secretkeyappearshere",
    { expiresIn: "1h" }
  );
};

export const resolvers = {
  Query: {
    tasks: async () => await Task.find(),
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Non authentifié");
      return await User.findById(user.userId);
    },
  },
  Mutation: {
    addTask: async (_, { title, description }) => {
      const task = new Task({ title, description });
      await task.save();
      return task;
    },
    signup: async (_, { name, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email déjà utilisé");

      const user = new User({ name, email, password });
      await user.save();

      return { userId: user._id, email: user.email, token: generateToken(user) };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) throw new Error("Identifiants incorrects");

      return { userId: user._id, email: user.email, token: generateToken(user) };
    },
  },
};
