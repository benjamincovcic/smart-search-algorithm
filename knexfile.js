module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'db',
        user: 'postgres',
        password: 'password',
        database: 'smart_search_algorithm_db',
      },
      migrations: {
        directory: './migrations',
      },
    },
  };