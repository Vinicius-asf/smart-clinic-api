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

    return {
        createHealthProfessional,
        getAllHealthProfessional,
        getHealthProfessionalByCredential
    }
}