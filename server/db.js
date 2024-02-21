const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "vik&rajan1",
  host: "localhost",
  port: 5432,
  database: "lib",
});

module.exports = pool;
