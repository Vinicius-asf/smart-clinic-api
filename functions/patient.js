module.exports = app => {
    const createPatient = (body) => {
        return new Promise((resolve,reject)=>{
            const body_clinic_id = body.clinic_id;
            delete body.clinic_id;

            app.db('patient').insert({...body},'email')
            .then(newPatient => {
                const dummyAppointment = {patient_email: body.email,
                    clinic_id: body_clinic_id,
                    credential: '12345678',
                    real_appointment: false,
                    appointment_time: '00:00',
                    appointment_date:'1900-01-01'};
                app.db('appointment').insert(dummyAppointment, 'appointment_id').then(appointment => {
                    resolve({newPatient, appointment});
                })
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
        console.log(email)
        return new Promise((resolve, reject)=> {
            app.db('patient').where({email})
            .select('email', 'name')
            .then(queryResult => {
                console.log('query:\n'+queryResult)
                resolve(queryResult);
            })
            .catch(err => {
                reject(Error('error in fetching data\n'+err));
            });
        });
    }

    const updatePatientByEmail = (email,newData) => {
        return new Promise((resolve,reject)=>{
            app.db('patient').where({email}).update({...newData, updated_at: new Date()})
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {reject(Error('error in updating patient\n'+err));});
        })
    }

    const getAllPatientAppointmentsByEmail = (email) => {
        return new Promise((resolve,reject)=>{
            app.db('appointment').where('patient_email', email).andWhere('real_appointment', true)
            .join('healthcare_professional', 'appointment.credential', '=', 'healthcare_professional.credential')
            .join('clinic', 'clinic_id', '=', 'appointment.clinic_id')
            .select('appointment.*', 'healthcare_professional.name', 'healthcare_professional.credential', 'clinic.name')
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