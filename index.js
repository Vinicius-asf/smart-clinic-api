const mod_express = require("express");
const app = mod_express();

// "/" => Hi there

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

app.listen(3000, ()=>{
    console.log("Server has started!");
});