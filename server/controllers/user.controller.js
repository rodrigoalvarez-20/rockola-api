import { User } from "../models/index.js";
import HttpException from "../utils/httpException.js";
import { StatusCodes } from "http-status-codes";

const registerUser = (req, res, next) => {
  const newUser = req.body;
  User.register(newUser, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al crear el usuario",
          error.error
        )
      );
    return res
      .status(StatusCodes.OK)
      .json({ message: "Se ha añadido correctamente", ...response });
  });
};

const loginUser = (req, res, next) => {
  const user = req.body;
  User.login(user, (error, response) => {
    if (error)
      return next(
        new HttpException(
          error.code || StatusCodes.INTERNAL_SERVER_ERROR,
          "Ha ocurrido un error al iniciar sesion",
          error.error
        )
      );
    return res.status(StatusCodes.OK).json({ token: response });
  });
};

export { registerUser, loginUser };
