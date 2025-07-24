const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const sqlite = require('sqlite3').verbose();
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
     } catch(error){
            return res.json({
                status: 400,
                success: false,
            });
        }
});