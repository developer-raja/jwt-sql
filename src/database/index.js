const { Sequelize } = require('sequelize');
// require('dotenv').config();

const sequelize = new Sequelize('User', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
