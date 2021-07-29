const Sequelize = require('sequelize');
const config = require('./env').dbConfig;
const MainDb = new Sequelize(config.connectionString, {
    dialect: config.dialect,
    operatorsAliases: false,
    multipleStatements: config.multipleStatements,
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 3000
    },
    logging: config.logging // disable sql logging for production
});

export default MainDb;