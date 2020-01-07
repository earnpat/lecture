module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        'user',
        [
          {
            user_id: '55555',
            username: 'earnpat',
            password: '$2a$10$Fv5HUGsvBgdbZFfjoq8ifOwTgF6DTscSes76kPCpFVAWT0vXbDeOe',
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