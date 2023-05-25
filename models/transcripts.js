module.exports = (sequelize, DataTypes) => {
  const transcripts = sequelize.define(
    "transcripts",
    {
      id_transcript: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      transcript_username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_module: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name_module: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      institute: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      college: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      training_credits: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      practice_score: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      attendance_score: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      middle_exam_score: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      weight_practice: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValues: 0.5,
      },
      process_score: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      final_exam_score: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      weight_process: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      module_score: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      module_score_word: {
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

  transcripts.associate = (db) => {
    transcripts.belongsTo(db.users, {
      foreignKey: "transcript_username",
    });
  };

  return transcripts;
};
