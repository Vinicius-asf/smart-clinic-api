exports.seed = function(knex) {
  return knex('administrative').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('administrative').insert([
        {clinic_id: 1, username: 'secretaria-abd', password: 'senha1234', function: 'Secretaria'},
        {clinic_id: 2, username: 'secretaria-bc', password: 'senha1234', function: 'Secretaria'},
        {clinic_id: 2, username: 'secretaria-p', password: 'senha1234', function: 'Secretaria'}
      ]);
    });
};
