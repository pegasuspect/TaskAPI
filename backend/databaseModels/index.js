const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(
  process.env.MYSQL_DB, 
  process.env.MYSQL_USERNAME, 
  process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');

  fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(file => {
    const fullPath = path.join(__dirname, file);
    const model = require(fullPath)(sequelize, Sequelize.DataTypes);
    
    console.log("Initialized model at path: ", fullPath);
    model.sync({ force: true });

    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

module.exports = db;