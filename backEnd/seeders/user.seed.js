module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        'user',
        [
          {
            user_id: '55555',
            username: 'root',
            password: '123456789',
            firstname: 'earn',
            lastname: 'pat',
            birth: '1996',
            email: 'eiei@hotmail.com',
            address: 'world',
            tel: '0987654321',
            role: 'admin',
          }
        ],
        {}
      );
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', [{}]);
    }
  };