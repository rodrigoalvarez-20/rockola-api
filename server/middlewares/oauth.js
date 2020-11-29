import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import HttpException from "../utils/httpException";

dotenv.config();

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        res.locals.payload = decoded;
        next();
    } catch (error) {
        next(new HttpException(StatusCodes.UNAUTHORIZED, "La token es invalida", error.message));
    }
}

export default checkAuth;