import { Artist } from "../models/index.js";
import HttpException from "../utils/httpException.js";
import { StatusCodes } from "http-status-codes";

const addArtist = (req, res, next) => {
  let newArtist = req.body;
  newArtist["id"] = 0;
  Artist.add(newArtist, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al añadir el artista",
          error.error
        )
      );
    return res
      .status(StatusCodes.OK)
      .json({ message: "Se ha añadido correctamente el artista" });
  });
};

const getAllArtists = (req, res, next) => {
  Artist.getAll((error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al obtener la lista de artistas",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const getArtistInfo = (req, res, next) => {
  const { id, name } = req.query;
  Artist.search({ id, name }, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al obtener la informacion del artista",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const updateArtist = (req, res, next) => {
  const updateOps = req.body;
  Artist.update(updateOps, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al actualizar la informacion del artista",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const deleteArtist = (req, res, next) => {
  const { id } = req.query;
  Artist.delete(id, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al eliminar el artista",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

export { addArtist, getAllArtists, getArtistInfo, updateArtist, deleteArtist };
