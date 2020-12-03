import express from "express";
import {
    addInfluence,
    getAllInfluences,
    getInfluenceInfo,
    updateInfluence,
    deleteInfluence
} from "../controllers/index.js";

import checkAuth from "../middlewares/oauth.js";

const InfluenceRouter = express.Router();

InfluenceRouter.post("/", checkAuth, addInfluence);

InfluenceRouter.get("/", checkAuth, getAllInfluences);

InfluenceRouter.route("/influence")
    .get(checkAuth, getInfluenceInfo)
    .put(checkAuth, updateInfluence)
    .delete(checkAuth, deleteInfluence);

export default InfluenceRouter;