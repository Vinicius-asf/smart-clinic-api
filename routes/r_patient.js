module.exports = app => {

    // GET ROUTES

    /*app.get("/patient/:email", (req, res) => {
        // get patient with email
        try {
            const email = req.params.email;
            console.log(email);
            const patient = app.functions.patient.getPatientByEmail(email);
            res.status(200).json(patient);
        } catch (error) {
            res.status(400).send("Unsuccessful request\n"+error);
        }
    });*/
    app.get("patient/:email", (req,res) => {
        const email = req.params.email;
        app.functions.patient.getPatientByEmail(email)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .cath(error => {
            res.status(400).send(error);
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

    // POST ROUTES

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

    // PATCH ROUTES
    
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
}
