exports.up = function(knex) {
    return knex.schema.createTable('dish_types', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('dish_types');
  };