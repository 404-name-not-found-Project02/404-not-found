module.exports = function (sequelize, DataTypes) {
  var Appointments = sequelize.define("Appointments", {
    //verify this is the correct one
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    title: DataTypes.STRING,
    note: {
      type: DataTypes.STRING,
      is: /^[a-z]+$/i,
      validate: {
        len: [1]
      },
      allowNull: true,
    },
  },
    {
      freezeTableName: true
    }
  );
  Appointments.associate = function (models) {
    // We're saying that an appointment should belong to a provider
    // An appointment can't be created without a provider due to the foreign key constraint
    Appointments.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Appointments;
};