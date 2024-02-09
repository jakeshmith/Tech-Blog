const { User } = require('../models');

const userData = [
    {
        username: 'qwertyuiop',
        password: 'qwertyuiop'
    },
    {
        username: 'asdfghjkl',
        passowrd: 'asdfghjkl'
    },
    {
        username: 'zxcvbnm',
        password: 'zxcvbnm'
    }
];

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;