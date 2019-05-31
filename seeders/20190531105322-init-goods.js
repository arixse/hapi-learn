'use strict';
const timestamps = {
  create_at:new Date(),
  update_at:new Date()
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert("goods",
    [
      { id: 1,shop_id:1,name: '商品1', thumb_url: '1.png', ...timestamps },
      { id: 2,shop_id:2,name: '商品2', thumb_url: '2.png', ...timestamps },
      { id: 3,shop_id:3,name: '商品3', thumb_url: '3.png', ...timestamps },
      { id: 4,shop_id:4,name: '商品4', thumb_url: '4.png', ...timestamps },
    ],
    {}
   )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   const {Op} = Sequelize;
   return queryInterface.bulkDelete("shops",{
     id:{
      [Op.in]: [1, 2, 3, 4]
     }
   })
  }
};
