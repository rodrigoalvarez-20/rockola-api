import express from "express";
import {
    addMusician,
    getAllMusicians,
    getMusicianInfo,
    updateMusician,
    deleteMusician
} from "../controllers/index.js";

import checkAuth from "../middlewares/oauth.js";

const MusicianRouter = express.Router();

MusicianRouter.post("/", checkAuth, addMusician);

MusicianRouter.get("/", checkAuth, getAllMusicians);

MusicianRouter.route("/musician")
    .get(checkAuth, getMusicianInfo)
    .put(checkAuth, updateMusician)
    .delete(checkAuth, deleteMusician);

export default MusicianRouter;