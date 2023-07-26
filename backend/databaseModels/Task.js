const { DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) =>{
  const model = sequelize.define('Task', {
    // Model attributes
    summary: {
      type: DataTypes.STRING,
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
        const salt = await bcrypt.genSalt();
        task.password = await bcrypt.hash(task.password, salt);
      }
    },
  });

  return model;
}