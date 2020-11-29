import { StatusCodes } from "http-status-codes";

function errorHandler(error, request, response, next) {
    const status = error.status || StatusCodes.BAD_REQUEST;
    const message = error.message || "Ha ocurrido un error en la request";
    const error_msg = error.error_full ? error.error_full : error.message;
    return response.status(status).json({
        status,
        message,
        error: error_msg,
    });
}

export default errorHandler;