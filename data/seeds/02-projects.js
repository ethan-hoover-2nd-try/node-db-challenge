
exports.seed = function(knex) {
  return knex('projects')
    .truncate()
    .then(function () {
      return knex('projects').insert([
        {id: 1, name: 'Deep clean house', description: 'Gotta clean EVERYTHING really good', completed: false},
        {id: 2, name: 'Put together dynamic standing desk', description: 'Need to put together the standing desk', completed: false}
      ]);
    });
};
