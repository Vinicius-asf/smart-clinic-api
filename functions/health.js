module.exports = app => {
    const createHealthProfessional = (professional) => {
        return new Promise((resolve, reject) => {
            app.db('healthcare_professional').insert({...professional},'credential')
            .then(insertResult => {
                resolve(insertResult);
            })
            .catch(err => {
                reject(Error('error in creating healthcare professional\n'+err));
            });
        });
    }

    const getAllHealthProfessional = async () => {
        try
        {
            const all_health_professional = app.db('healthcare_professional').select('name', 'credential', 'profession', 'email');
            return all_health_professional;
        }
        catch(err) {
            throw Error('error in fetching data\n'+err);
        }
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
                reject(Error('error in fetching data\n'+err));
            });
        });
    }

    // get health worker appointment by credential (crm)
    const getHealthProfessionalAppointments = async (credential) => {
        try {
            const appointments = await app.db('appointment').where({credential}).andWhere('real_appointment', true);

            const clinic_list = [];
            const patient_list = [];

            appointments.forEach((appointment, index) => {
                patient_list.push(getPatientFromAppointment(appointment.patient_email));
                clinic_list.push(getClinicFromAppointment(appointment.clinic_id));
            });

            const clinics = await Promise.all(clinic_list);
            const patients = await Promise.all(patient_list);
            return appointments.map((appointment, index) => {
                return {...appointment,patient:patients[index],clinic:clinics[index]}
            });
        }
        catch(err) {
            throw Error('error in fetching data\n'+err);
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
                reject(Error('error in fetching data \n'+err));
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
                reject(Error('error in fetching data \n'+err));
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
                reject(Error('error in inserting data\n'+err));
            });
        });
    }

    const removeAreaFromProfessional = (credential) => {
        return new Promise((resolve, reject) => {
            app.db('professional_area').where({credential}).delete('credential')
            .then(insertResult => {
                resolve(insertResult);
            })
            .catch(err => {
                reject(Error('error in removing data\n'+err));
            });
        });
    }

    const insertSpecialtyToProfessional = (speciality_id,credential) => {
        return new Promise((resolve, reject) => {
            app.db('professional_speciality').insert({credential,speciality_id},'credential')
            .then(insertResult => {
                resolve(insertResult);
            })
            .catch(err => {
                reject(Error('error in inserting data\n'+err));
            });
        });
    }

    const removeSpecialtyFromProfessional = (credential) => {
        return new Promise((resolve, reject) => {
            app.db('professional_speciality').where({credential}).delete('credential')
            .then(insertResult => {
                resolve(insertResult);
            })
            .catch(err => {
                reject(Error('error in removing data\n'+err));
            });
        });
    }

    const getSpecialities = () => {
        return new Promise((resolve, reject) => {
            app.db('speciality')
            .then(queryResult => resolve(queryResult))
            .catch(err => reject(Error('error in fetching data\n'+err)));
        })
    }

    const getAreas = () => {
        return new Promise((resolve, reject) => {
            app.db('area')
            .then(queryResult => resolve(queryResult))
            .catch(err => reject(Error('error in fetching data\n'+err)));
        })
    }

    const updateHealthProfessional = (credential, professional) => {
        return new Promise((resolve, reject) => {
            app.db('healthcare_professional').where({credential})
            .update({...professional, updated_at: new Date()})
            .then(updateResult => {
                resolve(updateResult);
            })
            .catch(err => {
                reject(Error('error in update professional data\n'+err));
            });
        })
    }

    return {
        createHealthProfessional,
        getAllHealthProfessional,
        updateHealthProfessional,
        getHealthProfessionalByCredential,
        getHealthProfessionalAppointments,
        insertAreaToProfessional,
        removeAreaFromProfessional,
        insertSpecialtyToProfessional,
        removeSpecialtyFromProfessional,
        getSpecialities,
        getAreas,
    }
}