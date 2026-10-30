'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.createTable('todos',
      { 
        id:{
          type:Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey:true,
        },
        title:{
          type:Sequelize.STRING,
          allowNull:false
        },
        completed:{
          type:Sequelize.BOOLEAN,
          allowNull:false,
          defaultValue:false,
        },
        userId:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        createdAt:{
          type: Sequelize.DATE, 
          allowNull: false
        },
        updatedAt:{
          type: Sequelize.DATE, 
          allowNull: false 
        },
      });
     
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('todos');
    
  }
};
