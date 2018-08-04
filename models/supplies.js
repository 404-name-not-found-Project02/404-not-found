module.exports = function(sequelize, DataTypes) {
    var Supplies = sequelize.define("Supplies", {
    //verify this is the correct one
      appointment_date: DataTypes.DATE
    }, {
      freezeTableName: true
    }
  );
  Supplies.associate = function(models) {
    // We're saying that an appointment should belong to a provider
    // An appointment can't be created without a provider due to the foreign key constraint
    Supplies.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Supplies.associate = function(models) {
    // We're saying that an appointment should belong to a provider
    // An appointment can't be created without a provider due to the foreign key constraint
    Supplies.belongsTo(models.Clients, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Supplies.associate = function(models) {
    // We're saying that an appointment should belong to a provider
    // An appointment can't be created without a provider due to the foreign key constraint
    Supplies.belongsTo(models.Appointments, {
      foreignKey: {
        allowNull: false
      }
    });
  };
    return Supplies;
  };