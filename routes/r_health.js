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
    
    app.get("/health/:crm/appointment", async (req, res) => {
        // get health worker appointment by credential (crm)
        const crm = req.params.crm;
        try {
            const result = await app.functions.health.getHealthProfessionalAppointments(crm)
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).send(error);
        }
        // app.functions.health.getHealthProfessionalAppointments(crm)
        // .then(result => {
            // console.log(result);
        //     res.status(200).json(result);
        // })
        // .catch(error => {
        //     res.status(400).send(error);
        // })
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

    app.get("/speciality", async (req, res) => {
        // get all specilaties from the db
        try {
            const specialities = await app.functions.health.getSpecialities();
            res.status(200).json(specialities);
        } catch (error) {
            res.status(400).send('error in get route\n'+error);
        }
    })

    app.get("/area", async (req, res) => {
        // get all specilaties from the db
        try {
            const areas = await app.functions.health.getAreas();
            res.status(200).json(areas);
        } catch (error) {
            res.status(400).send('error in get route\n'+error);
        }
    })

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
            req.body.area_id.forEach(async area=>{
                const addResult = await app.functions.health.insertAreaToProfessional(area,credential);
                console.log(`added area ${area} to ${addResult}`);
            })
            res.status(200).json(credential);
        } catch (error) {
            res.status(400).send('error in delete route\n'+error)
        }
    })

    app.post("/health/:crm/speciality", async (req, res) => {
        const credential = req.params.crm;
        try {
            // remove previous specialty from health worker, if any
            const deletedResult = await app.functions.health.removeSpecialtyFromProfessional(credential);
            console.log('deleted specialty from '+deletedResult);
            // add specialty to health worker
            req.body.speciality_id.forEach( async speciality_id=>{
                const addResult = await app.functions.health.insertSpecialtyToProfessional(speciality_id,credential);
                console.log(`added speciality ${speciality_id} to ${addResult}`);
            })
            res.status(200).json(credential);
        } catch (error) {
            res.status(400).send('error in delete route\n'+error)
        }
    });
    
    // PATCH ROUTES

    app.patch("/health/:crm", async (req, res) => {
        const credential = req.params.crm;
        try {
            const updateResult = await app.functions.health.updateHealthProfessional(credential, req.body);
            res.status(200).json(updateResult);
        } catch (error) {
            res.status(400).send('error in update route\n'+error)
        }
    })
    
}