module.exports = app => {
    const createPatient = (patient) => {
        app.db('patient').insert({...patient},'email')
        .then(insertResult => {
            return insertResult;
        })
        .catch(err =>{
            // console.log(err)
            throw Error('error in creating patient\n'+err);
            // return err
        })
    }

    const getAllPatients = () => {
        app.db('patients')
        .then(queryResult => {
            return queryResult;
        })
        .catch(err => {throw Error('error in fetching data\n'+err);});
    }

    const getPatientByEmail = (email) => {
        app.db('patients').where({email}).first()
        .then(queryResult => {
            return queryResult;
        })
        .catch(err => {throw Error('error in fetching data\n'+err);});
    }

    const updatePatientByEmail = (email,newData) => {
        app.db('patients').where({email}).update(newData)
        .then(queryResult => {
            return queryResult;
        })
        .catch(err => {throw Error('error in updating patient\n'+err);});
    }

    const getAllPatientAppointmentsByEmail = (email) => {
        app.db('appointment').where('patient_email', email)
        .then(queryResult => {
            return queryResult;
        })
        .catch(err => {
            throw Error('error in get all patient appointments\n'+err)
        })
    }

    return {
        createPatient,
        getAllPatients,
        getPatientByEmail,
        updatePatientByEmail,
        getAllPatientAppointmentsByEmail
    }
}