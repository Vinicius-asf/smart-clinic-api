const mod_express = require("express");
const app = mod_express();

const db = require('./db');
app.db = db;

// "/" => Hi there

let port = process.env.PORT ? process.env.PORT : 3001
console.log(port)

app.get("/", (req, res) => {
    res.send("Hi there!");
});

app.get("/goodbye", (req, res) => {
    res.send("Goodbye!");
});

app.get("/dog", (req, res) => {
    res.send("Woof!");
});

app.get("*", (req, res) => {
    res.send("YOU ARE A STAR!");
});

app.listen(port, ()=>{
    console.log("Server has started!");
});