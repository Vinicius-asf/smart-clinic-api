
exports.seed = function(knex) {
  return knex('clinic').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('clinic').insert([
        {name: 'Clinica ABD', addres: '911 Spring Avenue', postal_code: '10101-010', city: ' Philadelphia', state: 'Pennsylvania', country: 'US'},
        {name: 'Clinica Boa Consulta', addres: '010 Franklee Lane', postal_code: '10101-012', city: ' Philadelphia', state: 'Pennsylvania', country: 'US'},
        {name: 'Clinica Philadelphia', addres: '011 Hiddenview Drive', postal_code: '10101-013', city: ' Philadelphia', state: 'Pennsylvania', country: 'US'}
      ]);
    });
};
