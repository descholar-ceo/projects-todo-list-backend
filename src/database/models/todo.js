module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    projectId: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
    description: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    title: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    paranoid: true,
    tableName: 'todos',
    timestamps: true,
  });
  Todo.associate = function (models) {
    Todo.belongsTo(models.Project, {
      foreignKey: 'projectId'
    });
  };
  return Todo;
};
