/* eslint-disable no-undef */
import express from "express"
import bodyParser from "body-parser";
import { swaggerUi, swaggerSpec } from './swagger.js'; 
import sqlite from 'sqlite3'
import userRoutes from './routes/users.js'

const app = express();

// Inicializar base de datos (crear tabla si no existe)
const db = new sqlite.Database("./quote.db", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
    if(err) return console.error(err);
    console.log('Conectado a quote.db');
});

// Crear tabla si no existe
const createTableSQL = `
    CREATE TABLE IF NOT EXISTS quote (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        movie TEXT NOT NULL,
        quote TEXT NOT NULL,
        character TEXT NOT NULL,
        eliminado TEXT NOT NULL
    )
`;

db.run(createTableSQL, (err) => {
    if (err) {
        console.error("Error al crear la tabla:", err);
    } else {
        console.log("Tabla 'quote' lista");
    }
});

app.use(bodyParser.json());

app.use('/users', userRoutes);

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta principal
app.get('/', (req, res) => {
    res.send('Hello, API!');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs: http://localhost:${port}/api-docs`);
});