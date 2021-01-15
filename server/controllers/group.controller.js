import { Group } from "../models/index.js";
import HttpException from "../utils/httpException.js";
import { StatusCodes } from "http-status-codes";

const addGroup = (req, res, next) => {
  let newGroup = req.body;
  newGroup["id"] = 0;
  Group.add(newGroup, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al añadir el grupo",
          error.error
        )
      );
    return res
      .status(StatusCodes.OK)
      .json({ message: "Se ha añadido correctamente el grupo" });
  });
};

const getAllGroups = (req, res, next) => {
  Group.getAll((error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al obtener la lista de grupos",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const getGroupInfo = (req, res, next) => {
  const { id, name } = req.query;
  Group.search({ id, name }, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al obtener la informacion del grupo",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const updateGroup = (req, res, next) => {
  const updateOps = req.body;
  Group.update(updateOps, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al actualizar la informacion del grupo",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

const deleteGroup = (req, res, next) => {
  const { id } = req.query;
  Group.delete(id, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al eliminar el grupo",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json(response);
  });
};

export { addGroup, getAllGroups, getGroupInfo, updateGroup, deleteGroup };
