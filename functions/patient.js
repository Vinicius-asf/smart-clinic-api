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

    const getPatientByEmail = async (email) => {
        try
        {
            const patient = await app.db('patient').where('email', email).first();
            delete patient.password;
            return patient;
        }
        catch(err) {
            throw Error('error in fetching data\n'+err);
        }
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
            app.db('appointment').where('patient_email', email)
            .andWhere('real_appointment', true)
            .join('healthcare_professional', 'appointment.credential', '=', 'healthcare_professional.credential')
            .join('clinic', 'appointment.clinic_id', '=', 'clinic.clinic_id')
            .select('appointment.appointment_id', 'appointment.patient_email','appointment.clinic_id', 'appointment.notes', 'appointment.appointment_notes', 'appointment.deleted_at',
            'appointment.appointment_date', 'appointment.appointment_time',
            'healthcare_professional.name as professional_name', 'healthcare_professional.credential', 'clinic.name as clinic_name')
            .then(queryResult => {
                // need fix the problem with name columns
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