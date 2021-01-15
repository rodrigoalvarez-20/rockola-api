import { Song } from "../models/index.js";
import HttpException from "../utils/httpException.js";
import { StatusCodes } from "http-status-codes";

const addSong = (req, res, next) => {
  let newSong = req.body;
  newSong["id"] = 0;
  Song.add(newSong, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al añadir la cancion",
          error.error
        )
      );
    return res
      .status(StatusCodes.OK)
      .json({ message: "Se ha añadido correctamente la cancion", response });
  });
};

const getAllSongs = (req, res, next) => {
  Song.getAll((error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al obtener la lista de canciones",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const getSongInfo = (req, res, next) => {
  const { id, name, idAlb, idMusc } = req.query;
  Song.search({ id, name, idAlb, idMusc }, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al obtener la informacion de la cancion",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const updateSong = (req, res, next) => {
  const updateOps = req.body;
  Song.update(updateOps, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al actualizar la informacion de la cancion",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const deleteSong = (req, res, next) => {
  const { id } = req.query;
  Song.delete(id, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al eliminar la cancion",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

export { addSong, getAllSongs, getSongInfo, updateSong, deleteSong };
