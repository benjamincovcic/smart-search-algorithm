exports.up = function(knex) {
    return knex.schema.createTable('cities', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('cities');
  };