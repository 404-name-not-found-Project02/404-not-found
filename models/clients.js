module.exports = function(sequelize, DataTypes) {
    var Clients = sequelize.define("Clients", {
      last_name: DataTypes.STRING,
      first_name: DataTypes.STRING,
    }, {
      freezeTableName: true
    }
  );
    return Clients;
  };