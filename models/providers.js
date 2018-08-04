module.exports = function(sequelize, DataTypes) {
  var Providers = sequelize.define("Providers", {
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    email: DataTypes.STRING,
    brand_name: DataTypes.STRING
  }, {
    freezeTableName: true
  }
);
Providers.associate = function(models) {
  // Associating Providers with Appointments
  // When a Provider is deleted, also delete any associated Appointments - we may not want to do this
  Author.hasMany(models.Post, {
    onDelete: "cascade"
  });
};
  return Providers;
};
