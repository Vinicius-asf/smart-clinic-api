module.exports = app => {
    app.get("/administrative/:id", (req, res) => {
        // get specific appointment info
        const adm_id = req.params.id;
        app.functions.administrative.getClinicAdministrative(adm_id)
        .then(result=>{
            const administrative = result;
            res.status(200).json(administrative);
        })
        .catch(error=>{
            res.status(400).send("Unsuccessful request\n"+error);
        })
    });
}