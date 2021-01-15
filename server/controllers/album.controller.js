import { Album } from "../models/index.js";
import HttpException from "../utils/httpException.js";
import { StatusCodes } from "http-status-codes";

const addAlbum = (req, res, next) => {
  let newAlbum = req.body;
  newAlbum["id"] = 0;
  Album.add(newAlbum, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al añadir el album",
          error.error
        )
      );
    return res
      .status(StatusCodes.OK)
      .json({ message: "Se ha añadido correctamente el album", ...response });
  });
};

const getAllAlbums = (req, res, next) => {
  Album.getAll((error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al obtener la lista de albumes",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const getAlbumInfo = (req, res, next) => {
  const { id, name } = req.query;
  Album.search({ id, name }, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al obtener la informacion del album",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const updateAlbum = (req, res, next) => {
  const updateOps = req.body;
  Album.update(updateOps, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al actualizar la informacion del album",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const deleteAlbum = (req, res, next) => {
  const { id } = req.query;
  Album.delete(Number(id), (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al eliminar el album",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

export { addAlbum, getAllAlbums, getAlbumInfo, updateAlbum, deleteAlbum };
