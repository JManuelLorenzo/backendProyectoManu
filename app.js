/* eslint-disable no-undef */

import express from "express"
import bodyParser from "body-parser";
import { swaggerUi, swaggerSpec } from './swagger.js'; 
const app = express();
import sqlite from 'sqlite3'
const db = new sqlite.Database("./quote.db", sqlite.OPEN_READWRITE, (err) =>{
    if(err) return console.error(err);
});
app.use(bodyParser.json());

app.post('/quote',(req,res) =>{
    try{
        console.log(req.body.movie)
       return res.json({
            status: 200,
            success: true,
        });
     } catch{ // Catch general, no es lo estandar pero funciona.
            return res.json({
                status: 400,
                success: false,
            });
        }
});

const port = 3000;

// Serve Swagger API Docs at '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example API endpoint (you can have more routes here)
app.get('/', (req, res) => {
    res.send('Hello, API!');
});

// Listen on the specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});