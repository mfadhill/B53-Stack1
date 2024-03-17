'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      image: {
        type: Sequelize.STRING
      },
      distance_date: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      node: {
        type: Sequelize.BOOLEAN
      },
      react: {
        type: Sequelize.BOOLEAN
      },
      golang: {
        type: Sequelize.BOOLEAN
      },
      nextjs: {
        type: Sequelize.BOOLEAN
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};