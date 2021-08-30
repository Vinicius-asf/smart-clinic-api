module.exports = app => {
    const createAppointment = (appointment) => {
        return new Promise((resolve,reject)=>{
            app.db('appointment').insert({...appointment},'appointment_id')
            .then(insertResult => {
                resolve(insertResult);
            })
            .catch(err =>{
                reject(Error('error in creating new appointment\n'+err));
            });
        });
    }
    
    const getAppointmentInformation = async (appointment_id) => {
        try {
            const appointment = await app.db('appointment').where('appointment_id', appointment_id).first();
            const patient = await app.db('patient').where('email',appointment.patient_email).first()
                .select('name', 'birth_date', 'weight', 'height');
            const clinic = await  app.db('clinic').where('clinic_id', appointment.clinic_id).first()
                .select('name', 'address');
            const healthcare_professional = await app.db('healthcare_professional').where('credential', appointment.credential).first()
                .select('name', 'credential');
            const exams = await app.db('exam').where('appointment_id', appointment_id);
            const speciality = await app.db('speciality').where('speciality_id', appointment.speciality_id).first();
                            
            return {...appointment, patient:patient, clinic:clinic, healthcare_professional:healthcare_professional, exams:exams, speciality: speciality};
                            
        }
        catch(err) {
            throw Error('error in get appointment information\n'+err)
        }
    }


    const updateAppointmentById = (appointment_id,newData) => {
        return new Promise((resolve,reject) => {
            app.db('appointment').where({appointment_id}).update({...newData,updated_at: new Date()},'appointment_id')
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