
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('testing2')
    .truncate()
    .then(function() {
      return knex('testing2').insert([
        { name: 'sam' },
        { name: 'frodo' },
        { name: 'pippin' },
        { name: 'merry' },
      ]);
    });
};
