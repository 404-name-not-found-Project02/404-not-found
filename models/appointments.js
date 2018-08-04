module.exports = function(sequelize, DataTypes) {
    var Appointments = sequelize.define("Appointments", {
      last_name: DataTypes.STRING,
      first_name: DataTypes.STRING,
      email: DataTypes.STRING,
      brand_name: DataTypes.STRING
    }, {
      freezeTableName: true
    }
  );
  Appointments.associate = function(models) {
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