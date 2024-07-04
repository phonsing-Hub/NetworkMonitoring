const db = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  },
});

const status = () => {
    db.raw("SELECT 1")
  .then(() => {
    console.log("database connection success: ", process.env.DB_PORT);
  })
  .catch((err) => {
    console.error("Connection failed:", err);
  });

}
module.exports = {db, status};
