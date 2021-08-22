const mod_express = require("express");
const db = require('./db');
const consign = require('consign')
// const body_parser = require('body-parser')
const cors = require('cors')
 
const app = mod_express();

app.db = db;

app.use(cors())
app.use(mod_express.urlencoded({
    extended: false
}));
app.use(mod_express.json());

consign()
    .then('./functions')
    .then('./routes')
    .into(app)

let port = process.env.PORT ? process.env.PORT : 3001
console.log(port)

app.listen(port, ()=>{
    console.log("Server has started!");
});