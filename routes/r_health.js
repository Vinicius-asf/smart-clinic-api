module.exports = app => {

    // GET ROUTES

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

    // POST ROUTES

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
    
    // PATCH ROUTES
    
}