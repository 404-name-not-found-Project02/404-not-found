module.exports = function (sequelize, DataTypes) {
  var Appointments = sequelize.define("Appointments", {
    //verify this is the correct one
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      default: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      default: DataTypes.NOW
    },
  }, {
      freezeTableName: true
    }
  );
  Appointments.associate = function (models) {
    // Associating Appointments with Supplies
    // When an Appointment is deleted, also delete any associated Supplies - we may not want to do this
    Appointments.hasMany(models.Supplies, {
      onDelete: "cascade"
    });
  };
  Appointments.associate = function (models) {
    // We're saying that an appointment should belong to a provider
    // An appointment can't be created without a provider due to the foreign key constraint
    Appointments.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Appointments.associate = function (models) {
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