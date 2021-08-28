module.exports = app => {

    const validateUser = async (user, user_data) => {
        try {
            let data_table = {};
            if (user_data.user_type === 'healthcare_professional')
            {
                data_table = await app.db('healthcare_professional').where('email', user).first();
            }
            else if(user_data.user_type === 'clinic')
            {
                data_table = await app.db('administrative').where('username', user).first()
                .join('clinic', 'administrative.clinic_id', '=', 'clinic.clinic_id');
            }
            else if (user_data.user_type === 'patient')
            {
                data_table = await app.db('patient').where('email', user).first();
            }
            
            //validate password
            if (data_table.password !== user_data.password)
            {
                throw Error('Wrong password');
            }
            else
            {
                delete data_table.password;
                return data_table;
            }
        }
       catch(err) {
           throw Error('Unable to authenticate\n'+ err);
       }
    }

    return {
        validateUser
    }
}