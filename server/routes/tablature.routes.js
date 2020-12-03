import express from "express";
import {
    addTablature,
    getAllTablatures,
    getTablatureInfo,
    updateTablature,
    deleteTablature
} from "../controllers/index.js";

import checkAuth from "../middlewares/oauth.js";

const TablatureRouter = express.Router();

TablatureRouter.post("/", checkAuth, addTablature);

TablatureRouter.get("/", checkAuth, getAllTablatures);

TablatureRouter.route("/tablature")
    .get(checkAuth, getTablatureInfo)
    .put(checkAuth, updateTablature)
    .delete(checkAuth, deleteTablature);

export default TablatureRouter;