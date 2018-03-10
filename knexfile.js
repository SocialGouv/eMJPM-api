module.exports = {
  test: {
    //debug: true,
    client: "pg",
    connection: {
      host: "localhost",
      user: "emjpm",
      password: "passdev",
      port: "5434",
      database: "test"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/test"
    }
  },
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "emjpm",
      password: "passdev",
      port: "5434",
      database: "dev"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/development"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "emjpm",
      password: "passdev",
      port: "5434",
      database: "emjpm"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/production"
    }
  }
};
