module.exports = (sequelize, DataTypes) => {
  const proflle_user = sequelize.define(
    "profile_user",
    {
      id_profile: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      num_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      c_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username_profile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );

  proflle_user.associate = (db) => {
    proflle_user.belongsTo(db.users, {
      foreignKey: "username_profile",
      targetKey: "username",
    });
  };

  return proflle_user;
};
