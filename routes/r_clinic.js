module.exports = app => {

    // GET ROUTES

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

    // POST ROUTES
    
    app.post("/clinic/:id/patient", (req, res) => {
        // ????
        // create patient and relate it to a specific clinic
        res.status(200).json("Successful request");
    });
}
