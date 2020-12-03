import { Tablature } from "../models/index.js";
import HttpException from "../utils/httpException.js";
import { StatusCodes } from "http-status-codes";

const addTablature = (req, res, next) => {
    const newTB = req.body;
    Tablature.add(newTB, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al añadir la tablatura",
            error.error));
        return res.status(StatusCodes.OK).json({ message: "Se ha añadido correctamente la tablatura", ...response });
    });
}

const getAllTablatures = (req, res, next) => {
    Tablature.getAll((error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al obtener la lista de tablaturas",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const getTablatureInfo = (req, res, next) => {
    const { id, idCanc } = req.query;
    Tablature.search({ id, idCanc }, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al obtener la informacion de la tablatura",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const updateTablature = (req, res, next) => {
    const updateOps = req.body;
    Tablature.update(updateOps, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al actualizar la informacion de la tablatura",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

const deleteTablature = (req, res, next) => {
    const { id } = req.query;
    Tablature.delete(id, (error, response) => {
        if (error) return next(new HttpException(
            error.code || StatusCodes.INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al eliminar la tablatura",
            error.error));
        return res.status(StatusCodes.OK).json(response);
    });
}

export { addTablature, getAllTablatures, getTablatureInfo, updateTablature, deleteTablature };