import { Router } from "express";
import { createUser } from "../../controllers/v1/user/createUser.js";
import { getUsers } from "../../controllers/v1/user/getUsers.js";
import { getUser } from "../../controllers/v1/user/getUser.js";
import { updateUser } from "../../controllers/v1/user/updateUser.js";
import { deleteUser } from "../../controllers/v1/user/deleteUser.js";

const userRouter = Router();

// Routes
userRouter.post("/create", createUser); // Create user
userRouter.get("/list", getUsers); // Get all users
userRouter.get("/get/:id", getUser); // Get user by ID
userRouter.put("/update/:id", updateUser); // Update user
userRouter.delete("/delete/:id", deleteUser); // Delete user

export default userRouter;
