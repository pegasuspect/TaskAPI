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

const modelNames = []
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(file => {
    const fullPath = path.join(__dirname, file);
    const model = require(fullPath)(sequelize, Sequelize.DataTypes);

    console.log("Initialized model at path: ", fullPath);

    modelNames.push(model.name);
    db[model.name] = model;
  });

for (let i = 0; i < modelNames.length; i++) {
  const modelName = modelNames[i];
  (async () => {
    try {
      console.log(`${modelName} ${db[modelName].associate}`);
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
  
      await db[modelName].sync({ force: true });
    } catch (error) {
      console.error(error);
    }
  })();
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;