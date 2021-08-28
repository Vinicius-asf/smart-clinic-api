module.exports = app => {

    const getClinicAdministrative = (adm_id) => {
        // TO-DO: include the professional availability
        return new Promise((resolve, reject) => {
            app.db('administrative').where({adm_id}).first()
            .select('adm_id', 'clinic_id', 'username', 'function')
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {
                reject(Error('error in fetching data\n'+err));
            });
        });
    }

    return {
        getClinicAdministrative
    }
}