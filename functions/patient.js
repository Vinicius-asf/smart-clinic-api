module.exports = app => {
    const createPatient = (patient) => {
        return new Promise((resolve,reject)=>{            
            app.db('patient').insert({...patient},'email')
            .then(insertResult => {
                resolve(insertResult);
            })
            .catch(err =>{
                // console.log(err)
                reject(Error('error in creating patient\n'+err));
                // return err
            })
        })
    }

    const getAllPatients = () => {
        return new Promise((resolve,reject)=>{
            app.db('patient')
            .then(queryResult => {
                console.log('querry:\n'+queryResult);
                resolve(queryResult);
            })
            .catch(err => {reject(Error('error in fetching data\n'+err));});
        })
    }

    const getPatientByEmail = (email) => {
        return new Promise((resolve,reject)=>{
            app.db('patient').where({email}).first()
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {reject(Error('error in fetching data\n'+err));});
        })
    }

    const updatePatientByEmail = (email,newData) => {
        return new Promise((resolve,reject)=>{
            app.db('patient').where({email}).update({...newData,update_at:new Date()})
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {reject(Error('error in updating patient\n'+err));});
        })
    }

    const getAllPatientAppointmentsByEmail = (email) => {
        return new Promise((resolve,reject)=>{
            app.db('appointment').where('patient_email', email)
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {
                reject(Error('error in get all patient appointments\n'+err));
            })
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