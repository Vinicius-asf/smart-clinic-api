module.exports = app => {
    const getClinicInformation = (clinic_id) => {
        app.db('clinic').where('clinic_id', clinic_id).first()
        .then(queryResult => {
            return queryResult;
        })
        .catch(err =>{
            throw Error('error in get clinic information\n'+err)
        })
    }

    const getAllClinics = () => {
        return new Promise((resolve,reject) => {
            app.db('clinic').select('clinic_id', 'name').from('clinic')
            .then(queryResult => {
                console.log('qr\n'+queryResult);
                resolve(queryResult);
            })
            .catch(err => {
                reject(Error('error in get all clinics\n'+err))
                // throw 
            });
        });
    }
    
    const getClinicAppointments = (clinic_id) => {
        app.db('appointment').where('clinic_id', clinic_id)
        .then(queryResult => {
            return queryResult;
        })
        .catch(err => {
            throw Error('error in get all appointments from a clinic\n'+err)
        })
    }

    const getAllClinicPatients = (clinic_id) => {
        app.db('patient')
        .join('appointment', 'patient.email', '=', 'appointment.patient_email')
        .select('email', 'name')
        .where('appointment.clinic_id', clinic_id)
        .distinct()
        .then(queryResult => {
            return queryResult
        }).catch(err => {
            throw Error('error get all patients from a clinic\n'+err)
        })
    }

    return {
        getClinicInformation,
        getAllClinics,
        getClinicAppointments,
        getAllClinicPatients
    }
}