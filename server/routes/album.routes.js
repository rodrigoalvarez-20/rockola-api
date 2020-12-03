import express from "express";
import {
    addAlbum,
    getAllAlbums,
    getAlbumInfo,
    updateAlbum,
    deleteAlbum
} from "../controllers/index.js";

import checkAuth from "../middlewares/oauth.js";

const AlbumRouter = express.Router();

AlbumRouter.post("/", checkAuth, addAlbum);

AlbumRouter.get("/", checkAuth, getAllAlbums);

AlbumRouter.route("/album")
    .get(checkAuth, getAlbumInfo)
    .put(checkAuth, updateAlbum)
    .delete(checkAuth, deleteAlbum);

export default AlbumRouter;