module.exports = app => {
    const createHealthProfessional = (professional) => {
        app.db('healthcare_professional').insert({...professional},'credential')
        .then(insertResult => {
            return insertResult;
        })
        .catch(err =>{
            // console.log(err)
            throw Error('error in creating healthcare professional\n'+err)
            // return err
        })
    }

    const getAllHealthProfessional = () => {
        app.db('healthcare_professional')
        .then(querryResult => {
            return querryResult;
        })
        .catch(err =>{
            // console.log(err)
            throw Error('error in fetching data\n'+err)
            // return err
        })
    }

    const getHealthProfessionalByCredential = (credential) => {
        app.db('healthcare_professional').where({credential}).first()
        .then(querryResult => {
            return querryResult;
        })
        .catch(err =>{
            // console.log(err)
            throw Error('error in fetching data\n'+err)
            // return err
        })
    }

    // get health worker appointment by credential (crm)
    const getHealthProfessionalAppointments = (credential) => {
        app.db('appointment').where({credential})
        .then( querryResult => {
            return querryResult;
        })
        .catch(err=>{
            throw Error('error in fetching data\n'+err);
        });
    }

    const insertAreaToProfessional = (area_id,credential) => {
        app.db('professional_area').insert({credential,area_id},'credential')
        .then(insertResult => {
            return insertResult;
        })
        .catch(err => {
            throw Error('error in inserting data\n'+err);
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