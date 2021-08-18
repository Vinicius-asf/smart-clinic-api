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
            .then(appointment => {
                app.db('patient').where('email',appointment.patient_email).first()
                .select('name', 'birth_date', 'weight', 'height')
                .then(patient => {
                    app.db('clinic').where('clinic_id', appointment.clinic_id).first()
                    .select('name', 'address')
                    .then(clinic => {
                        app.db('healthcare_professional').where('credential', appointment.credential).first()
                        .select('name', 'credential')
                        .then(healthcare_professional => {
                            app.db('exam').where('appointment_id', appointment_id)
                            .then(exams => {
                                resolve({...appointment, patient:patient, clinic:clinic, healthcare_professional:healthcare_professional, exams:exams});
                            })
                        })
                    })
                })
            })
            .catch(err =>{
                reject(Error('error in get appointment information\n'+err));
            })
        });
    }

    const updateAppointmentById = (appointment_id,newData) => {
        return new Promise((resolve,reject) => {
            app.db('appointment').where({appointment_id}).update({...newData,update_at: new Date()},'appointment_id')
            .then(queryResult => {
                resolve(queryResult);
            })
            .catch(err => {reject(Error('error in updating appointment\n'+err));});
        })
    }

    const deleteAppointment = (appointment_id) => {
        return new Promise((resolve,reject)=>{
            app.db('appointment').where({appointment_id}).update({deleted_at: new Date()},'appointment_id')
            .then(updateResult => {
                resolve(updateResult);
            })
            .catch(err => {
                reject(Error('error in deleting appointment\n'+err));
            })
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