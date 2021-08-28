module.exports = app => {
    app.post("/login/:user", (req, res) => {
        // get specific appointment info
        const user = req.params.user;
        const user_data = req.body;
        app.functions.authentication.validateUser(user, user_data)
        .then(result=>{
            const data_table = result;
            res.status(200).json(data_table);
        })
        .catch(error=>{
            res.status(400).send("Unsuccessful request\n"+error);
        })
    });
}