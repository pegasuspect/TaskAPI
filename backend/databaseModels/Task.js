const { DataTypes, Sequelize } = require('sequelize');
const { encrypt, decrypt } = require('../lib/encryption');

module.exports = (sequelize) => {
  const model = sequelize.define('Task', {
    // Model attributes
    summary: {
      type: DataTypes.STRING(10000),
      allowNull: false
    },
    datePerformed: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
  }, {
    hooks: {
      beforeCreate: async (task) => {
        task.summary = encrypt(task.summary);
      }
    },
  });

  return model;
}