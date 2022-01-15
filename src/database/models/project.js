module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING
  }, {
    tableName: 'projects',
    paranoid: true,
    timestamps: true
  });
  Project.associate = (models) => {
    Project.hasMany(models.Todo, {
      foreignKey: 'projectId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Project;
};
