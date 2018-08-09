module.exports = function (sequelize, DataTypes) {
  var Providers = sequelize.define("Providers", {
    last_name: {
      type: DataTypes.STRING,
      is: /^[a-z]+$/i
    },
    first_name: {
      type: DataTypes.STRING,
      is: /^[a-z]+$/i
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    brand_name: {
      type: DataTypes.STRING,
      isAlphanumeric: true
    },
    firebase_id: {
      type: DataTypes.STRING
    },
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
  Providers.associate = function (models) {
    // Associating Providers with Appointments
    // When a Provider is deleted, also delete any associated Appointments - we may not want to do this
    Providers.hasMany(models.Appointments, {
      onDelete: "cascade"
    });
  };
  return Providers;
};
