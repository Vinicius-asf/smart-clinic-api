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
        app.db('appointment').where('appointment_id', appointment_id).first()
        .then(queryResult => {
            return queryResult;
        })
        .catch(err =>{
            throw Error('error in get appointment information\n'+err)
        })
    }

    const updateAppointmentById = (appointment_id,newData) => {
        app.db('appointment').where({appointment_id}).update(newData)
        .then(queryResult => {
            return queryResult;
        })
        .catch(err => {throw Error('error in updating appointment\n'+err);});
    }

    const deleteAppointment = (appointment_id) => {
        // app.db('appointment').where({appointment_id}).del(['appointment_id', 'patient_email'])
        app.db('appointment').where({appointment_id})
        .then(queryResult => {
            app.db('appointment').where({appointment_id}).update({...queryResult,deleted_at:new Date()})
            .then(updateResult => {
                return updateResult;
            })
            .catch(err => {
                throw Error('error in deleting appointment\n'+err);
            })
        })
        .catch(err => {throw Error('error in fetching appointment\n'+err);});
    }

    const getAppointmentExams = (appointment_id) => {
        app.db('exam').where({appointment_id})
        .then(queryResult => {
            return queryResult;
        })
        .catch(err => {throw Error('error in fetching exams\n'+err);});
    }

    const createAppointmentExam = (exam) => {
        app.db('exam').insert(exam,['exam_id','patient_email'])
        .then(insertResult => {
            return insertResult;
        })
        .catch(err => {throw Error('error in creating exam\n'+err);});
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