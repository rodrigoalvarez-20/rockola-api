import express from "express";
import {
    addGroup,
    getAllGroups,
    getGroupInfo,
    updateGroup,
    deleteGroup
} from "../controllers/index.js";

import checkAuth from "../middlewares/oauth.js";

const GroupRouter = express.Router();

GroupRouter.post("/", checkAuth, addGroup);

GroupRouter.get("/", checkAuth, getAllGroups);

GroupRouter.route("/group")
    .get(checkAuth, getGroupInfo)
    .put(checkAuth, updateGroup)
    .delete(checkAuth, deleteGroup);

export default GroupRouter;