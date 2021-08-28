module.exports = app => {
    app.get("/login/:user", (req, res) => {
        // get specific appointment info
        const user = req.params.user;
        app.functions.authentication
        .then(result=>{
            const administrative = result;
            res.status(200).json(administrative);
        })
        .catch(error=>{
            res.status(400).send("Unsuccessful request\n"+error);
        })
    });
}