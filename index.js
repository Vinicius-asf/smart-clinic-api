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

let port = process.env.PORT ? process.env.PORT : 3001
console.log(port)

app.post("/appointment", (req, res) => {
    // create appointment
    app.functions.p_appointment.createAppointment(req.body)
    .then(result=>{
        const appointment = result;
        console.log(appointment)
        res.status(200).json(appointment);
    })
    .catch(error=>{
        res.status(400).send("Unsuccessful request\n"+error);
    });
});

app.get("/appointment/:id", (req, res) => {
    // get specific appointment info
    const appointment_id = req.params.id;
    app.functions.p_appointment.getAppointmentInformation(appointment_id)
    .then(result=>{
        const appointment = result;
        res.status(200).json(appointment);
    })
    .catch(error=>{
        res.status(400).send("Unsuccessful request\n"+error);
    })
});

app.patch("/appointment/:id", (req, res) => {
    // update specific appointment
    const appointment_id = req.params.id;
    app.functions.p_appointment.updateAppointmentById(appointment_id,req.body)
    .then(result=>{
        const appointment = result;
        res.status(200).json(appointment);
    })
    .catch(error=>{
        res.status(400).send("Unsuccessful request\n"+error);
    })
});

app.delete("/appointment/:id", (req, res) => {
    // delete specific appointment
    const appointment_id = req.params.id;
    app.functions.p_appointment.deleteAppointment(appointment_id)
    .then(result=>{
        const appointment = result;
        res.status(200).json(appointment);
    })
    .catch(error=>{
        res.status(400).send("Unsuccessful request\n"+error)
    });
});

app.get("/appointment/:id/exam", (req, res) => {
    // get specific appointment exams
        const appointment_id = req.params.id;
        app.functions.p_appointment.getAppointmentExams(appointment_id)
        .then(result => {
            const exams = result;
            res.status(200).json(exams);
        })
        .catch(error => {
            res.status(400).send("Unsuccessful request\n"+error);
        })
});

app.post("/appointment/:id/exam", (req, res) => {
    // create specific appointment exam
        // const appointment_id = req.params.id;
        app.functions.p_appointment.createAppointmentExam(req.body)
        .then(result =>{
            const exam = result;
            res.status(200).json(exam);
        })
        .catch(error=>{
            res.status(400).send("Unsuccessful request\n"+error);
        })
});

app.get("/clinic/", (req, res) => {
    // get all clinics name and id
    app.functions.clinic.getAllClinics()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(400).send(error);
    })
});

app.get("/clinic/:id", (req, res) => {
    // get specific clinic info
    const clinic_id = req.params.id;
    app.functions.clinic.getClinicInformation(clinic_id)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(400).send(error);
    })
});

app.get("/clinic/:id/appointment", (req, res) => {
    // get all appointments from specific clinic
    const clinic_id = req.params.id;
    app.functions.clinic.getClinicAppointments(clinic_id)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(400).send(error);
    })
});

app.post("/clinic/:id/patient", (req, res) => {
    // ????
    // create patient and relate it to a specific clinic
    res.status(200).json("Successful request");
});

app.get("/clinic/:id/patient", (req, res) => {
    // get all patients related to a specific clinic
    const clinic_id = req.params.id;
    app.functions.clinic.getAllClinicPatients(clinic_id)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(400).send(error);
    })
});

app.get("/health/:crm", (req, res) => {
    // get health worker by credential (crm)
    const crm = req.params.crm;
    app.functions.health.getHealthProfessionalByCredential(crm)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(400).send(error);
    })
});

app.get("/health/:crm/appointment", (req, res) => {
    // get health worker appointment by credential (crm)
    const crm = req.params.crm;
    app.functions.health.getHealthProfessionalAppointments(crm)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(400).send(error);
    })
});

app.get("/health/", (req, res) => {
    // get all health workers
    app.functions.health.getAllHealthProfessional()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(400).send(error);
    })
});

app.post("/health/", (req, res) => {
    // create health worker
    app.functions.health.createHealthProfessional(req.body)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(400).send(error);
    })
});

app.get("/patient/:email", (req, res) => {
    // get patient with email
    try {
        const patient = app.functions.patient.getPatientByEmail(req.params.email);
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).send("Unsuccessful request\n"+error);
    }
});

app.patch("/patient/:email", (req, res) => {
    // update patient with email
        app.functions.patient.updatePatientByEmail(req.params.email,req.body)
        .then(result => {
            const patient = result;
            res.status(200).json(patient);
        })
        .catch(error=>{
            res.status(400).send("Unsuccessful request\n"+error);
        })
});

app.post("/patient/", (req, res) => {
    // create patient
    // console.log(req.body)
        app.functions.patient.createPatient(req.body)
        .then(result => {
            const patient = result
            res.status(200).json(patient);
        })
        .catch(error => {
            res.status(400).send("Unsuccessful request\n"+error);
        })
});

app.get("/patient/:email/appointment", (req, res) => {
    // get all appointments from patient
        const email = req.body.email;
        app.functions.patient.getAllPatientAppointmentsByEmail(email)
        .then(result => {
            const appointments = result;
            res.status(200).json(appointments);
        })
        .catch(error=>{
            res.status(400).send("Unsuccessful request\n"+error);
        })
});

app.listen(port, ()=>{
    console.log("Server has started!");
});