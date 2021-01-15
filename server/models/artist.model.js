import dbConn from "../config/dbConfig.config.js";
import mysql from "mysql";

const ARTIST_TABLE = "artista";
const COL_ID = "id";
const COL_NOMBRE = "nombre";
const COL_GENERO = "genero";
const COL_CDNAC = "cd_nacimiento";
const COL_BIO = "biografia"; // ---> Biografia;
const COL_SITIOWEB = "sitio_web";

const Artist = () => {};

Artist.add = (newArtist, result) => {
  dbConn.query(`INSERT INTO ${ARTIST_TABLE} SET ?`, [newArtist], (err, res) => {
    if (err) return result({ error: err }, null);
    return result(null, res);
  });
};

Artist.getAll = (result) => {
  dbConn.query(`SELECT * FROM ${ARTIST_TABLE}`, (error, res) => {
    if (error) return result({ error: error }, null);
    return result(null, {
      artists: res,
      total: res.length,
    });
  });
};

Artist.search = ({ id = "", name = "" }, result) => {
  const queryStr = `SELECT * FROM ${ARTIST_TABLE} WHERE ${COL_ID} = ${mysql.escape(
    id
  )} OR ${COL_NOMBRE} = ${mysql.escape(name)}`;
  dbConn.query(queryStr, (error, res) => {
    if (error) return result({ error: error }, null);
    return result(null, {
      artists: res,
      total: res.length,
    });
  });
};

Artist.update = ({ id, name, gender, cdNac, bio, web }, result) => {
  dbConn.query(
    `UPDATE ${ARTIST_TABLE} SET ${COL_NOMBRE} = ?, ${COL_GENERO} = ?, ${COL_CDNAC} = ?, ${COL_BIO} = ?, ${COL_SITIOWEB} = ? WHERE ${COL_ID} = ?`,
    [
      mysql.escape(name),
      mysql.escape(gender),
      mysql.escape(cdNac),
      mysql.escape(bio),
      mysql.escape(web),
      mysql.escape(id),
    ],
    (error, res) => {
      if (error) return result({ error: error }, null);
      return result(null, {
        message: "Se ha actualizado correctamente el artista",
      });
    }
  );
};

Artist.delete = (id, result) => {
  dbConn.query(
    `DELETE FROM ${ARTIST_TABLE} WHERE ${COL_ID} = ?`,
    [mysql.escape(id)],
    (error, response) => {
      if (error) return result({ error: error }, null);
      return result(null, {
        message: "Se ha eliminado correctamente al artista",
      });
    }
  );
};

export default Artist;
