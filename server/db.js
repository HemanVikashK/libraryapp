const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "vik&rajan1",
  host: "db",
  port: 5432,
  database: "lib",
});

module.exports = pool;
