module.exports = app => {
    const createAppointment = (appointment) => {
        return new Promise((resolve,reject)=>{
            app.db('appointment').insert({...appointment},'appointment_id')
            .then(insertResult => {
                resolve(appointment_id);
            })
            .catch(err =>{
                reject(Error('error in creating new appointment\n'+err));
            });
        });
    }

    const getAppointmentInformation = (appointment_id) => {
        return new Promise((resolve,reject) => {
            app.db('appointment').where('appointment_id', appointment_id).first()
            .join('patient', 'appointment.patient_email', '=', 'patient.email')
            .join('clinic', 'appointment.clinic_id', '=', 'clinic.clinic_id')
            .join('healthcare_professional', 'appointment.credential', '=', 'healthcare_professional.credential')
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err =>{
                reject(Error('error in get appointment information\n'+err));
            })
        });
    }

    const updateAppointmentById = (appointment_id,newData) => {
        return new Promise((resolve,reject) => {
            app.db('appointment').where({appointment_id}).update(newData,'appointment_id')
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {reject(Error('error in updating appointment\n'+err));});
        })
    }

    const deleteAppointment = (appointment_id) => {
        return new Promise((resolve,reject)=>{
            app.db('appointment').where({appointment_id})
            .then(queryResult => {
                app.db('appointment').where({appointment_id}).update({...queryResult,deleted_at:new Date()})
                .then(updateResult => {
                    resolve(updateResult);
                })
                .catch(err => {
                    reject(Error('error in deleting appointment\n'+err));
                })
            })
            .catch(err => {reject(Error('error in fetching appointment\n'+err));});
        })
    }

    const getAppointmentExams = (appointment_id) => {
        return new Promise((resolve,reject)=>{
            app.db('exam').where({appointment_id})
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {reject(Error('error in fetching exams\n'+err));});
        })
    }

    const createAppointmentExam = (exam) => {
        return new Promise((resolve,reject)=>{
            app.db('exam').insert(exam,['exam_id','patient_email'])
            .then(insertResult => {
                resolve(insertResult);
            })
            .catch(err => {reject(Error('error in creating exam\n'+err));});
        })
    }

    return {
        createAppointment,
        getAppointmentInformation,
        updateAppointmentById,
        deleteAppointment,
        getAppointmentExams,
        createAppointmentExam
    }
}