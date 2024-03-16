'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    name: DataTypes.STRING,
    start_datel: DataTypes.DATE,
    end_date: DataTypes.DATE,
    image: DataTypes.STRING,
    desc: DataTypes.STRING,
    node: DataTypes.STRING,
    react: DataTypes.STRING,
    golang: DataTypes.STRING,
    next: DataTypes.STRING,
    author_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};