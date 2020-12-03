import { Influence } from "../models/index.js";
import HttpException from "../utils/httpException.js";
import { StatusCodes } from "http-status-codes";

const addInfluence = (req, res, next) => {
    let newInf = req.body;
    newInf[id] = 0;
    Influence.add(newInf, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al añadir la influencia musical",
            error.error));
        return res.status(StatusCodes.OK).json({ message: "Se ha añadido correctamente la influencia musical", ...response });
    });
}

const getAllInfluences = (req, res, next) => {
    Influence.getAll((error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al obtener la lista de albumes",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const getInfluenceInfo = (req, res, next) => {
    const { id, idArt, idMusc } = req.query;
    Influence.search({ id, idArt, idMusc }, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al obtener la informacion de la influencia musical",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const updateInfluence = (req, res, next) => {
    const updateOps = req.body;
    Influence.update(updateOps, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al actualizar la informacion de la influencia musical",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const deleteInfluence = (req, res, next) => {
    const { id } = req.query;
    Influence.delete(id, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al eliminar la influencia musical",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

export { addInfluence, getAllInfluences, getInfluenceInfo, updateInfluence, deleteInfluence };