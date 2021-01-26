import dbConn from "../config/dbConfig.config.js";
import mysql from "mysql";

const SONG_TABLE = "cancion";
const COL_ID = "id";
const COL_NOMBRE = "nombre";
const COL_DURACION = "duracion";
const COL_IDALBUM = "id_album";

const Song = () => {};

Song.add = (newSong, result) => {
  dbConn.query(`INSERT INTO ${SONG_TABLE} SET ?`, [newSong], (err, res) => {
    if (err) return result({ error: err }, null);
    return result(null, res);
  });
};

Song.getAll = (decade, order = "asc", result) => {
  const query = `select ${SONG_TABLE}.*, album.img_portada from ${SONG_TABLE} INNER JOIN album ON ${SONG_TABLE}.id_album = album.id WHERE album.fecha > ${Number(
    decade
  )} AND album.fecha <= ${Number(decade) + 10} ORDER BY nombre ${order}`;
  dbConn.query(query, (error, res) => {
    if (error) return result({ error: error }, null);
    return result(null, {
      songs: res,
      total: res.length,
    });
  });
};

Song.search = ({ id = "", name = "", idAlb = "", idMusc = "" }, result) => {
  const queryStr = `SELECT ${SONG_TABLE}.*, album.img_portada FROM ${SONG_TABLE} INNER JOIN album ON ${SONG_TABLE}.id_album = album.id WHERE ${SONG_TABLE}.id = ${id};`;
  dbConn.query(queryStr, (error, res) => {
    if (error) return result({ error: error }, null);
    return result(null, {
      songs: res,
      total: res.length,
    });
  });
};

Song.update = ({ id, name, duracion, idAlb }, result) => {
  dbConn.query(
    `UPDATE ${ALBUM_TABLE} SET ${COL_NOMBRE} = ?, ${COL_DURACION} = ?, ${COL_IDALBUM} = ? WHERE ${COL_ID} = ?`,
    [
      mysql.escape(name),
      mysql.escape(duracion),
      mysql.escape(idAlb),
      mysql.escape(id),
    ],
    (error, res) => {
      if (error) return result({ error: error }, null);
      return result(null, {
        message: "Se ha actualizado correctamente la cancion",
      });
    }
  );
};

Song.delete = (id, result) => {
  dbConn.query(
    `DELETE FROM ${SONG_TABLE} WHERE ${COL_ID} = ?`,
    [mysql.escape(id)],
    (error, response) => {
      if (error) return result({ error: error }, null);
      return result(null, {
        message: "Se ha eliminado correctamente la cancion",
      });
    }
  );
};

export default Song;
