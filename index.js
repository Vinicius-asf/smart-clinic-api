const mod_express = require("express");
const app = mod_express();

// "/" => Hi there

let port = process.env.PORT ? process.env.PORT : 3001
console.log(port)

app.post("/appointment", (req, res) => {
    res.status(200).send("Successful request");
});

app.get("/appointment/:id", (req, res) => {
    res.status(200).send("Successful request");
});

app.patch("/appointment/:id", (req, res) => {
    res.status(200).send("Successful request");
});

app.delete("/appointment/:id", (req, res) => {
    res.status(200).send("Successful request");
});

app.get("/appointment/:id/exams", (req, res) => {
    res.status(200).send("Successful request");
});

app.post("/appointment/:id/exams", (req, res) => {
    res.status(200).send("Successful request");
});

app.get("/clinic/", (req, res) => {
    res.status(200).send("Successful request");
});

app.get("/clinic/:id", (req, res) => {
    res.status(200).send("Successful request");
});

app.get("/clinic/:id/appointment", (req, res) => {
    res.status(200).send("Successful request");
});

app.post("/clinic/:id/patient", (req, res) => {
    res.status(200).send("Successful request");
});

app.get("/clinic/:id/patient", (req, res) => {
    res.status(200).send("Successful request");
});

app.get("/health/:crm", (req, res) => {
    res.status(200).send("Successful request");
});

app.get("/health/", (req, res) => {
    res.status(200).send("Successful request");
});

app.get("/patient/:email", (req, res) => {
    res.status(200).send("Successful request");
});

app.patch("/patient/:email", (req, res) => {
    res.status(200).send("Successful request");
});

app.post("/patient/", (req, res) => {
    res.status(200).send("Successful request");
});

app.listen(port, ()=>{
    console.log("Server has started!");
});