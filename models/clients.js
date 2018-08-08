module.exports = function(sequelize, DataTypes) {
    var Clients = sequelize.define("Clients", {
      last_name: {
        type: DataTypes.STRING,
        is: /^[a-z]+$/i
      },
      first_name: {
        type: DataTypes.STRING,
        is: /^[a-z]+$/i
      },
    }, {
      freezeTableName: true
    }
  );
  Clients.associate = function(models) {
    // Associating Clients with Appointments
    // When a Client is deleted, also delete any associated Appointments - we may not want to do this
    Clients.hasMany(models.Appointments, {
      onDelete: "cascade"
    });
  };
    return Clients;
  };