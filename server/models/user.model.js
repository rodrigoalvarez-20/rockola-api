import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import mysql from "mysql";

import dbConn from "../config/dbConfig.config.js";

dotenv.config();

const USERS_TABLE = "usuario";
const COL_NOMBRE = "nombre";
const COL_USUARIO = "usuario";
const COL_EMAIL = "email";
const COL_PASSWORD = "password";
const COL_ROLE = "role";

const User = () => { };

User.register = (newUser, result) => {
    User.findByEmail(newUser.email, (error, usrFind) => {
        console.info(usrFind);
        if (error) result({ error: error }, null);
        else if (usrFind === {}) result({ error: "El usuario ya ha sido registrado", code: StatusCodes.CONFLICT }, null);
        else {
            bcrypt.hash(newUser.password, 10).then(hashPwd => {
                if (!hashPwd)
                    result({ error: "Ha ucurrido un error al crear el hash" }, null);
                else {
                    const user = {
                        id: 0,
                        nombre: newUser.name,
                        usuario: newUser.usuario,
                        email: newUser.email,
                        password: hashPwd,
                        role: newUser.role || "user"
                    }
                    dbConn.query(`INSERT INTO ${USERS_TABLE} SET ?`, [user], (err, res) => {
                        if (err) result({ error: err }, null);
                        else result(null, res);
                    });
                }
            }).catch((error) => {
                result({ error: error.message }, null);
            });
        }
    });
}

User.login = (user, result) => {
    User.findByEmail(user.email, (error, userFind) => {
        if (error) return result({ error: error }, null);
        else if (userFind === {}) return result({ error: "No se ha encontrado ningun usuario con el email", code: StatusCodes.NOT_FOUND }, null);
        bcrypt.compare(user.password, userFind.password).then(correct => {
            if (!correct) return result({ error: "Las contraseñas no coinciden", code: StatusCodes.BAD_REQUEST }, null);
            const token = jwt.sign(
                {
                    id: userFind.id,
                    user: userFind.usuario,
                    email: userFind.email,
                    role: userFind.role
                },
                process.env.JWT_KEY
            );
            return result(null, token);
        }).catch(error => result({ error: error.message }));
    });
}

User.findByEmail = (email, result) => {
    dbConn.query(`SELECT * FROM ${USERS_TABLE} WHERE ${COL_EMAIL} = ?`, email, (err, res) => {
        if (err) return result({ error: err }, null);
        else return result(null, { ...res[0] });
    });

}

export default User;

