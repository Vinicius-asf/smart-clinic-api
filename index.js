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
    // get all clinics name and id
    try {
        const clinics = app.functions.clinic.getAllClinics();
        res.status(200).send(clinics);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
    res.status(200).send("Successful request");
});

app.get("/clinic/:id", (req, res) => {
    // get specific clinic info
    try {
        const clinic_id = req.params.id;
        const clinic = app.functions.clinic.getClinicInformation(clinic_id);
        res.status(200).send(clinic);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
});

app.get("/clinic/:id/appointment", (req, res) => {
    // get all appointments from specific clinic
    try {
        const clinic_id = req.params.id;
        const clinic_appointments = app.functions.clinic.getClinicAppointments(clinic_id);
        res.status(200).send(clinic_appointments);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
});

app.post("/clinic/:id/patient", (req, res) => {
    // ????
    // create patient and relate it to a specific clinic
    res.status(200).send("Successful request");
});

app.get("/clinic/:id/patient", (req, res) => {
    // get all patients related to a specific clinic
    try {
        const clinic_id = req.params.id;
        const clinic_patients = app.functions.clinic.getAllClinicPatients(clinic_id);
        res.status(200).send(clinic_patients);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
});

app.get("/health/:crm", (req, res) => {
    // get health worker by credential (crm)
    try {
        const professional = app.functions.health.getHealthProfessionalByCredential(req.params.crm);
        res.status(200).send(professional);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
    // res.status(200).send("Successful request");
});

app.get("/health/", (req, res) => {
    // get all health workers
    try {
        const professionals = app.functions.health.getAllHealthProfessional();
        res.status(200).send(professionals);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
    // res.status(200).send("Successful request");
});

app.post("/health/", (req, res) => {
    // create health worker
    try {
        const professional = app.functions.health.createHealthProfessional(req.body);
        res.status(200).send(professional);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
});

app.get("/patient/:email", (req, res) => {
    // get patient with email
    try {
        const patient = app.functions.patient.getPatientByEmail(req.params.email);
        res.status(200).send(patient);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
});

app.patch("/patient/:email", (req, res) => {
    // update patient with email
    try {
        const patient = app.functions.patient.updatePatientByEmail(req.params.email,req.body);
        res.status(200).send(patient);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
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
});

app.listen(port, ()=>{
    console.log("Server has started!");
});