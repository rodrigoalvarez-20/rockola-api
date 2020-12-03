import express from "express";
import {
    addSong,
    getAllSongs,
    getSongInfo,
    updateSong,
    deleteSong
} from "../controllers/index.js";

import checkAuth from "../middlewares/oauth.js";

const SongRouter = express.Router();

SongRouter.post("/", checkAuth, addSong);

SongRouter.get("/", checkAuth, getAllSongs);

SongRouter.route("/song")
    .get(checkAuth, getSongInfo)
    .put(checkAuth, updateSong)
    .delete(checkAuth, deleteSong);

export default SongRouter;