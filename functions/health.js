module.exports = app => {
    const createHealthProfessional = (professional) => {
        return new Promise((resolve, reject) => {
            app.db('healthcare_professional').insert({...professional},'credential')
            .then(insertResult => {
                resolve(insertResult);
            })
            .catch(err => {
                reject(Error('error in creating healthcare professional\n'+err))
            });
        });
    }

    const getAllHealthProfessional = () => {
        return new Promise((resolve, reject) => {
            app.db('healthcare_professional')
            .select('name', 'credential', 'professional', 'email')
            .then(querryResult => {
                resolve(querryResult);
            })
            .catch(err => {
                reject(Error('error in fetching data\n'+err))
            });
        });
    }

    const getHealthProfessionalByCredential = (credential) => {
        // TO-DO: include the professional availability
        return new Promise((resolve, reject) => {
            app.db('healthcare_professional').where({credential}).first()
            .select('name', 'credential')
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {
                reject(Error('error in fetching data\n'+err))
            });
        });
    }

    // get health worker appointment by credential (crm)
    const getHealthProfessionalAppointments = async (credential) => {
        try {
            const appointments = await app.db('appointment').where({credential});
            appointments.forEach((appointment, index) => {
                appointments[index].patient = await getPatientFromAppointment(appointment.patient_email);
                appointments[index].clinc = await getClinicFromAppointment(appointment.clinic_id);
            });

            return appointments;
        }
        catch(err) {
            throw Error('error in fetching data\n'+err)
        }
    }

    const getPatientFromAppointment = (appointment_patient_email) => {
        return new Promise((resolve, reject) => {
            app.db('patient').where('email', appointment_patient_email).first()
            .select('name')
            .then(queryResult => {
                resolve(queryResult)
            })
            .catch(err => {
                reject(Error('error in fetching data \n'+err))
            });
        });
    }

    const getClinicFromAppointment = (appointment_clinic_id) => {
        return new Promise((resolve, reject) => {
            app.db('clinic').where('clinic_id', appointment_clinic_id).first()
            .then(queryResult => {
                resolve(queryResult)
            })
            .catch(err => {
                reject(Error('error in fetching data \n'+err))
            });
        });
    }

    const insertAreaToProfessional = (area_id,credential) => {
        return new Promise((resolve, reject) => {
            app.db('professional_area').insert({credential,area_id},'credential')
            .then(insertResult => {
                resolve(insertResult);
            })
            .catch(err => {
                reject(Error('error in inserting data\n'+err))
            });
        });
    }

    return {
        createHealthProfessional,
        getAllHealthProfessional,
        getHealthProfessionalByCredential,
        getHealthProfessionalAppointments,
        insertAreaToProfessional,
    }
}