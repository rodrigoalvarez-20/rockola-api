import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";

import errorHandler from "./middlewares/errorHandler.js";
import {
  UserRouter,
  StudioRouter,
  AlbumRouter,
  ArtistRouter,
  GroupRouter,
  InfluenceRouter,
  MusicianRouter,
  SongRouter,
  TablatureRouter,
} from "./routes/index.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.options("*", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    //return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Pagina principal de la api" });
});

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/studios", StudioRouter);
app.use("/api/v1/albums", AlbumRouter);
app.use("/api/v1/artists", ArtistRouter);
app.use("/api/v1/groups", GroupRouter);
app.use("/api/v1/influences", InfluenceRouter);
app.use("/api/v1/musicians", MusicianRouter);
app.use("/api/v1/songs", SongRouter);
app.use("/api/v1/tablatures", TablatureRouter);

app.use(errorHandler);

app.use("*", (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ error: "No se ha encontrado el recurso solicitado" });
});

export default app;
