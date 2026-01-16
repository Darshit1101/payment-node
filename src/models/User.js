import mongoose from "mongoose";
import { appDb } from "../configs/dbConnection.config.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = appDb.model("User", userSchema);
export default User;
