module.exports = function(sequelize, DataTypes) {
    var Notes = sequelize.define("Notes", {
     note: DataTypes.STRING
    }, {
      freezeTableName: true
    }
  );
  Notes.associate = function(models) {
    // We're saying that a note should belong to a provider
    // A note can't be created without a provider due to the foreign key constraint
    Notes.belongsTo(models.Providers, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Notes.associate = function(models) {
    // We're saying that a note should belong to a client
    // A note can't be created without a client due to the foreign key constraint
    Notes.belongsTo(models.Clients, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Notes.associate = function(models) {
    // We're saying that a note should belong to an appointment
    // A note can't be created without a appointment due to the foreign key constraint
    Notes.belongsTo(models.Appointments, {
      foreignKey: {
        allowNull: false
      }
    });
  };
    return Notes;
  };

//We can change the allowNull for notes if we don't want them required
//We'll need to add the include statement in our routes