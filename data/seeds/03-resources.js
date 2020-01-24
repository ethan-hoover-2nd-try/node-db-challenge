exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, name: 'computer', description: 'usefull for looking up how-tos if you get lost'},
        {id: 2, name: 'wrench', description: 'its a wrench'},
        {id: 3, name: 'big room', description: 'gotta fit as much stuff and people as possible'},
        {id: 4, name: 'software', description: 'its software'},
        {id: 5, name: 'vehicle of the car variety', description: 'its a car...'}
      ]);
    });
};
