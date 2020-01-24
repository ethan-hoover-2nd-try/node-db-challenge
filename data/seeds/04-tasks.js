
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: 'Buy disinfecting spray', notes: 'get the good stuff', completed: false, project_id: 1},
        {id: 2, description: 'Buy some trash bags', notes: 'preferably the nice orange scented ones with strings', completed: false, project_id: 1},
        {id: 3, description: 'Start vacumming and dusting off stuff', notes: 'get all that dust', completed: false, project_id: 1},
        {id: 4, description: 'Throw all trash away', notes: 'use the nice trash bags', completed: false, project_id: 1},
        {id: 5, description: 'Recieve the desk parts', notes: 'wait an eternity for them to be delivered', completed: false, project_id: 2},
        {id: 6, description: 'Get out the wrench and go down to it', notes: 'wrenchify that stuff', completed: false, project_id: 2},
        {id: 7, description: 'Test the desk', notes: 'make sure it doesnt fall apart', completed: false, project_id: 2}
      ]);
    });
};
