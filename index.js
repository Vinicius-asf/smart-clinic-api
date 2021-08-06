const mod_express = require("express");
const db = require('./db');
const consign = require('consign')
const body_parser = require('body-parser')
const app = mod_express();

app.db = db;

app.use(body_parser.urlencoded({
    extended: false
}));
app.use(body_parser.json());

consign()
    .then('./functions')
    .into(app)

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
    console.log(req.params)
    res.status(200).send("Successful request");
});

app.patch("/patient/:email", (req, res) => {
    res.status(200).send("Successful request");
});

app.post("/patient/", (req, res) => {
    console.log(req.body)
    // app.functions.patient.createPatient(req.body);
    res.status(200).json("Successful request");
});

app.listen(port, ()=>{
    console.log("Server has started!");
});