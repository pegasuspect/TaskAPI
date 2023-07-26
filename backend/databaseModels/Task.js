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
      type: Sequelize.DATE(3),
      allowNull: false
    },
    // createdAt: {
    //   type: Sequelize.DATE(3),
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    // },
    // updatedAt: {
    //   type: Sequelize.DATE(3),
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    // },
  }, {
    hooks: {
      beforeCreate: async (task) => {
        const salt = await bcrypt.genSalt();
        task.password = await bcrypt.hash(task.password, salt);
      }
    },
  });

  model.associate = (db) => {
    db.User.hasMany(db.Task, { foreignKey: 'userId' });
  };

  return model;
}