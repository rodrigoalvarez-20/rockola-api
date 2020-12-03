import { Musician } from "../models/index.js";
import HttpException from "../utils/httpException.js";
import { StatusCodes } from "http-status-codes";

const addMusician = (req, res, next) => {
    let newMus = req.body;
    newMus[id] = 0;
    Musician.add(newMus, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al añadir la informacion del musico",
            error.error));
        return res.status(StatusCodes.OK).json({ message: "Se ha añadido correctamente la informacion del musico", ...response });
    });
}

const getAllMusicians = (req, res, next) => {
    Musician.getAll((error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al obtener la lista de musicos",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const getMusicianInfo = (req, res, next) => {
    const { id, name } = req.query;
    Musician.search({ id, name }, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al obtener la informacion del musico",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const updateMusician = (req, res, next) => {
    const updateOps = req.body;
    Musician.update(updateOps, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al actualizar la informacion del musico",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const deleteMusician = (req, res, next) => {
    const { id } = req.query;
    Musician.delete(id, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al eliminar al musico",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

export { addMusician, getAllMusicians, getMusicianInfo, updateMusician, deleteMusician };