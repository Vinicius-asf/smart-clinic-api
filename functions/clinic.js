module.exports = app => {

    const getClinicInformation = (clinic_id) => {
        return new Promise((resolve, reject) => {
            app.db('clinic').where('clinic_id', clinic_id).first()
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {
                reject(Error('error in get clinic information\n'+err))
            });
        });
    }

    const getAllClinics = () => {
        return new Promise((resolve,reject) => {
            app.db('clinic').select('clinic_id', 'name').from('clinic')
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {
                reject(Error('error in get all clinics\n'+err))
                // throw 
            });
        });
    }
    
    const getClinicAppointments = (clinic_id) => {
        return new Promise((resolve, reject) => {
            app.db('appointment').where('clinic_id', clinic_id)
            .join('patient', 'appointment.patient_email', '=', 'patient.email')
            .join('healthcare_professional', 'appointment.credential', '=', 'healthcare_professional.credential')
            .select('appointment.*', 'patient.name', 'healthcare_professional.name', 'healthcare_professional.credential')
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {
                reject(Error('error in get all appointments from a clinic\n'+err))
            });
        });
    }

    const getAllClinicPatients = (clinic_id) => {
        return new Promise ((resolve, reject) => {
            app.db('patient')
            .join('appointment', 'patient.email', '=', 'appointment.patient_email')
            .select('email', 'name')
            .where('appointment.clinic_id', clinic_id)
            .distinct()
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err=> {
                reject(Error('error get all patients from a clinic\n'+err))
            });
        });
    }

    const addProfessionalToClinic = (credential,clinic_id) =>{
        return new Promise ((resolve,reject) => {
            app.db('clinics_healthcare_professional').insert({clinic_id,credential},['credential','clinic_id'])
            .then(insertResult => {
                resolve(insertResult);
            })
            .catch(err => {
                reject(Error('error in connecting clinic and professional\n'+err));
            })
        })
    }

    const removeProfessionalfromClinic = (credential,clinic_id) =>{
        return new Promise ((resolve,reject) => {
            app.db('clinics_healthcare_professional').where({credential,clinic_id})
            .update({credential,clinic_id,deleted_at: new Date()},['credential','clinic_id'])
            .then(updateResult => {
                resolve(updateResult);
            })
            .catch(err => {
                reject(Error('error in removing professional from clinic\n'+err));
            })
        })
    }

    return {
        getClinicInformation,
        getAllClinics,
        getClinicAppointments,
        getAllClinicPatients,
        addProfessionalToClinic,
        removeProfessionalfromClinic,
    }
}