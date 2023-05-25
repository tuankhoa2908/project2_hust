module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id_user: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
  // Associate between tables
  users.associate = (db) => {
    users.hasMany(db.profile_user, {
      foreignKey: "username_profile",
    });
    users.hasOne(db.transcripts);
  };

  return users;
};
