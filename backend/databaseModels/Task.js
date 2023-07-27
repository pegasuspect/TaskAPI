const { DataTypes, Sequelize } = require('sequelize');
const { encrypt } = require('../lib/encryption');

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
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeUpdate: (task) => {
        task.summary = encrypt(task.summary);
      },
      beforeCreate: (task) => {
        task.summary = encrypt(task.summary);
      },
    },
    sequelize
  });

  return model;
}