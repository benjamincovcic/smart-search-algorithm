exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('diets').del()
    .then(function () {
      // Inserts seed entries
      return knex('diets').insert([
        { name: 'Vegan' },
        { name: 'Vegetarian' },
        { name: 'Pescatarian' },
        { name: 'Paleo' },
        { name: 'Fruitarian' },
        { name: 'Ketogenic' },
        { name: 'Gluten-Free' },
        { name: 'Dairy-Free' },
        { name: 'Egg-Free' },
        { name: 'Soy-Free' },
        { name: 'Grain-Free' },
        { name: 'Sugar-Free' },
        { name: 'Wheat-Free' },
        { name: 'Nut-Free' },
        { name: 'Carnivore' },
        { name: 'Alkaline' },
        { name: 'Pollotarian' },
        { name: 'Shellfish-Free' }
      ]);
    });
};
