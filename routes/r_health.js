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

    app.post("/health/:crm/area", async (req, res) => {
        const credential = req.params.crm;
        try {            
            // remove previous area from health worker, if any
            const deletedResult = await app.functions.health.removeAreaFromProfessional(credential);
            console.log('deleted area from '+deletedResult);
            // add area to health worker
            req.body.area.forEach(area_id=>{
                const addResult = await app.functions.health.insertAreaToProfessional(area_id,credential);
                console.log(`added area ${area_id} to ${addResult}`);
            })
            res.status(200).json(credential);
        } catch (error) {
            res.status(400).send('error in delete route\n'+error)
        }
    })
    
    
    // PATCH ROUTES
    
}