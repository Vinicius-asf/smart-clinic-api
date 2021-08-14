module.exports = app => {
    const createPatient = (patient) => {
        app.db('patient').insert({...patient},'email')
        .then(insertResult => {
            return insertResult;
        })
        .catch(err =>{
            // console.log(err)
            throw Error('error in creating patient\n'+err)
            // return err
        })
    }

    return {createPatient}
}