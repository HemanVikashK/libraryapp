const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://postgres:-a43eBdCB5fBEEbEe2CCfaaggcCEd3aC@roundhouse.proxy.rlwy.net:34145/railway",
});

module.exports = pool;
