module.exports = function(sequelize, DataTypes) {
    var Appointments = sequelize.define("Appointments", {
      last_name: DataTypes.STRING,
      first_name: DataTypes.STRING,
      email: DataTypes.STRING,
      brand_name: DataTypes.STRING,
    //verify this is the correct one
      appointment_date: DataTypes.DATE
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
  Appointments.associate = function(models) {
    // We're saying that an appointment should belong to a provider
    // An appointment can't be created without a provider due to the foreign key constraint
    Appointments.belongsTo(models.Clients, {
      foreignKey: {
        allowNull: false
      }
    });
  };
    return Appointments;
  };