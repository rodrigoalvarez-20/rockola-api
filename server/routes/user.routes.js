import express from "express";
import { registerUser, loginUser } from "../controllers/index.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);

UserRouter.post("/login", loginUser);

export default UserRouter;