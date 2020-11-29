import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { StatusCodes } from "http-status-codes"

import errorHandler from "./middlewares/errorHandler.js";
import UserRouter from "./routes/user.routes.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Pagina principal de la api" });
});

app.use("/api/v1/users", UserRouter);

app.use(errorHandler);

app.use("*", (req, res) => {
    return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No se ha encontrado el recurso solicitado" });
})

export default app;

