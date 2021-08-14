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
    // create appointment
    res.status(200).send("Successful request");
});

app.get("/appointment/:id", (req, res) => {
    // get specific appointment info
    res.status(200).send("Successful request");
});

app.patch("/appointment/:id", (req, res) => {
    // update specific appointment
    res.status(200).send("Successful request");
});

app.delete("/appointment/:id", (req, res) => {
    // delete specific appointment
    res.status(200).send("Successful request");
});

app.get("/appointment/:id/exams", (req, res) => {
    // get specific appointment exams
    res.status(200).send("Successful request");
});

app.post("/appointment/:id/exams", (req, res) => {
    // create specific appointment exam
    res.status(200).send("Successful request");
});

app.get("/clinic/", (req, res) => {
    // get all clinics info
    res.status(200).send("Successful request");
});

app.get("/clinic/:id", (req, res) => {
    // get specific clinic info
    res.status(200).send("Successful request");
});

app.get("/clinic/:id/appointment", (req, res) => {
    // get all appointments from specific clinic
    res.status(200).send("Successful request");
});

app.post("/clinic/:id/patient", (req, res) => {
    // ????
    // create patient and relate it to a specific clinic
    res.status(200).send("Successful request");
});

app.get("/clinic/:id/patient", (req, res) => {
    // get all patients related to a specific clinic
    res.status(200).send("Successful request");
});

app.get("/health/:crm", (req, res) => {
    // get health worker by credential (crm)
    res.status(200).send("Successful request");
});

app.get("/health/", (req, res) => {
    // get all health workers
    res.status(200).send("Successful request");
});

app.get("/patient/:email", (req, res) => {
    // get patient with email
    console.log(req.params)
    res.status(200).send("Successful request");
});

app.patch("/patient/:email", (req, res) => {
    // update patient with email
    res.status(200).send("Successful request");
});

app.post("/patient/", (req, res) => {
    // create patient
    // console.log(req.body)
    try {
        const patient = app.functions.patient.createPatient(req.body);
        res.status(200).send(patient);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
    // res.status(200).json("Successful request");
});

app.listen(port, ()=>{
    console.log("Server has started!");
});