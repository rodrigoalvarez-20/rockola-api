import app from "./server/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${PORT}`)
});