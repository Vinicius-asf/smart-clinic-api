module.exports = app => {

    // GET ROUTES

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

    // POST ROUTES

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

    app.post("/appointment/:id/exam", app.upload.single('selectedFile') , async (req, res) => {
        // upload exam file to firebase
        console.log(req.body.type);
        console.log(`${req.file.destination}${req.file.filename}`);
        const uploadResponse = await app.bucket.upload(`${req.file.destination}${req.file.filename}`,{
            destination: req.file.filename,
        },)
        console.log(uploadResponse[0].metadata);
        const downloadUrl = await app.bucket.file(req.file.filename).getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        });
        console.log(downloadUrl)
        // create specific appointment exam
        app.functions.p_appointment.createAppointmentExam({...req.body,file_name:req.file.filename,url:downloadUrl[0]})
        .then(result =>{
            const exam = result;
            res.status(200).json(exam);
        })
        .catch(error=>{
            res.status(400).send("Unsuccessful request\n"+error);
        })
    });

    // PATCH ROUTES

    app.patch("/appointment/:id", (req, res) => {
        // update specific appointment
        const appointment_id = req.params.id;
        console.log(req.body);
        app.functions.p_appointment.updateAppointmentById(appointment_id,req.body)
        .then(result=>{
            const appointment = result;
            res.status(200).json(appointment);
        })
        .catch(error=>{
            res.status(400).send("Unsuccessful request\n"+error);
        })
    });

    // DELETE ROUTES
    
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
    
    // app.get("/appointment/:id/exam", (req, res) => {
    //     // get specific appointment exams
    //         const appointment_id = req.params.id;
    //         app.functions.p_appointment.getAppointmentExams(appointment_id)
    //         .then(result => {
    //             const exams = result;
    //             res.status(200).json(exams);
    //         })
    //         .catch(error => {
    //             res.status(400).send("Unsuccessful request\n"+error);
    //         })
    // });
}