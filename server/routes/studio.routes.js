import express from "express";
import {
    addStudio,
    deleteStudio,
    getAllStudios,
    getStudioInfo,
    updateStudio
} from "../controllers/index.js";
import checkAuth from "../middlewares/oauth.js";

const StudioRouter = express.Router();

StudioRouter.post("/", checkAuth, addStudio);

StudioRouter.get("/", checkAuth, getAllStudios);

StudioRouter.route("/studio")
    .get(checkAuth, getStudioInfo)
    .put(checkAuth, updateStudio)
    .delete(checkAuth, deleteStudio);

export default StudioRouter;