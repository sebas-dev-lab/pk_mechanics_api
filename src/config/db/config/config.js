require("dotenv").config();

/**
 * @typedef Object
 * @description  Return object with variables from enviroment. Its depends from api type mode (development, test or production).
 */
module.exports = {
  development: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    use_env_variable: "",
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    use_env_variable: "",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    use_env_variable: "",
  },
};
