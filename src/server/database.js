const Uuid = require('uuid');

const Users = [
    {
        userId: Uuid.v4(),
        emailId: 'sam123@gmail.com',
        password: '123',
        tasks: [
            {
                createdAt: `${Date.now()}`,
                todoId: Uuid.v4(),
                todo: 'Buy eggs',
            },
            {
                createdAt: `${Date.now()}`,
                todoId: Uuid.v4(),
                todo: 'Buy milk',
            },
        ],
    },
    {
        userId: Uuid.v4(),
        emailId: 'ram123@gmail.com',
        password: '456',
        tasks: [
            {
                createdAt: `${Date.now()}`,
                todoId: Uuid.v4(),
                todo: 'Buy fruits',
            },
            {
                createdAt: `${Date.now()}`,
                todoId: Uuid.v4(),
                todo: 'Buy vegetables',
            },
        ],
    },
];

// console.log(Users);

// for (let i = 0; i < Users.length; i++) {
//     Users[i].tasks.forEach(element => {
//         // console.log(element);
//     });
// }

// module.exports = Users;
