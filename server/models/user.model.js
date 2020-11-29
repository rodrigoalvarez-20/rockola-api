import mysql from "mysql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import dbConn from "../config/db.config.js";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const USERS_TABLE = "users";

const User = () => { };

User.register = (newUser, result) => {
    User.findByEmail(newUser.email, (error, usrFind) => {
        if (error) result({ error: error }, null);
        else if (usrFind) result({ error: "El usuario ya ha sido registrado", code: StatusCodes.CONFLICT }, null);
        else {
            bcrypt.hash(newUser.password, 10).then(hashPwd => {
                if (!hashPwd)
                    result({ error: "Ha ucurrido un error al crear el hash" }, null);
                else {
                    const user = {
                        id: 0,
                        name: newUser.name,
                        email: newUser.email,
                        password: hashPwd,
                        type: newUser.type || "user"
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
        console.info(userFind);
        console.info(error);
        if (error) return result({ error: error }, null);
        else if (!Object.keys(userFind).length) return result({ error: "No se ha encontrado ningun usuario con el email", code: StatusCodes.NOT_FOUND }, null);
        bcrypt.compare(user.password, userFind.password).then(correct => {
            if (!correct) return result({ error: "Las contraseñas no coinciden", code: StatusCodes.BAD_REQUEST }, null);
            const token = jwt.sign(
                {
                    id: userFind.id,
                    email: userFind.email,
                    type: userFind.type
                },
                process.env.JWT_KEY
            );
            return result(null, token);
        }).catch(error => result({ error: error.message }));
    });
}

User.findByEmail = (email, result) => {
    dbConn.query(`SELECT * FROM ${USERS_TABLE} WHERE email = ? LIMIT 1`, [email], (err, res) => {
        if (err) return result({ error: err }, null);
        else return result(null, { ...res[0] });
    });

}

export default User;

