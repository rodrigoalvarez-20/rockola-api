import { Studio } from "../models/index.js";
import HttpException from "../utils/httpException.js";
import { StatusCodes } from "http-status-codes";

const addStudio = (req, res, next) => {
    const newStudio = req.body;
    Studio.addStudioInfo(newStudio, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al añadir el estudio de grabacion",
            error.error));
        return res.status(StatusCodes.OK).json({ message: "Se ha añadido correctamente el estudio de grabacion", ...response });
    });
}

const getAllStudios = (req, res, next) => {
    Studio.getAllStudios((error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al obtener la lista de estudios de grabacion",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const getStudioInfo = (req, res, next) => {
    const { id, name } = req.query;
    Studio.searchStudios({ id, name }, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al obtener la informacion del estudio de grabacion",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const updateStudio = (req, res, next) => {
    const updateOps = req.body;
    Studio.updateStudio(updateOps, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al actualizar la informacion del estudio de grabacion",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const deleteStudio = (req, res, next) => {
    const { id } = req.query;
    Studio.deleteStudio(id, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al eliminar el estudio de grabacion",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

export { addStudio, getAllStudios, getStudioInfo, updateStudio, deleteStudio };