module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    // Model attributes
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: ['Technician', 'Manager', 'Guest'],
      allowNull: false,
      defaultValue: "Guest"
    }
  });