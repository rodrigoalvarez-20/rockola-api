import express from "express";
import {
    addArtist,
    getAllArtists,
    getArtistInfo,
    updateArtist,
    deleteArtist
} from "../controllers/index.js";

import checkAuth from "../middlewares/oauth.js";

const ArtistRouter = express.Router();

ArtistRouter.post("/", checkAuth, addArtist);

ArtistRouter.get("/", checkAuth, getAllArtists);

ArtistRouter.route("/artist")
    .get(checkAuth, getArtistInfo)
    .put(checkAuth, updateArtist)
    .delete(checkAuth, deleteArtist);

export default ArtistRouter;