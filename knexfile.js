//Prod

module.exports = {
  client: 'pg',
  development:{
    seeds:{
      directory: './seeds'
    }
  },
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

//Dev Local

// module.exports = {
//     client: 'pg',
//     development:{
//       seeds:{
//         directory: './seeds'
//       }
//     },
//     connection: {
//       database: 'smart_clinic_db',
//       user: 'postgres',
//       password: '5sWISuDZ2o4LNMSbGtxP'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   };