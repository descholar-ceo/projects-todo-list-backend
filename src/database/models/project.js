module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING
  }, {
    tableName: 'projects',
    paranoid: true,
    timestamps: true
  });
  Project.associate = function (models) {
    // associations can be defined here
  };
  return Project;
};
