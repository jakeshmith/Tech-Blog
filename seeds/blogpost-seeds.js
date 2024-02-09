const { BlogPost } = require('../models');

const blogData = [
    {
        title: 'I love technology!',
        content: 'Holy cow, do I love technology! All of it!',
        user_id: 1
    },
    {
        title: 'Lowkey this technology garbage.',
        content: 'deffo not an iPhone, I will tell you that much',
        user_id: 4
    },
    {
        title: 'Big blog fan',
        content: 'I am here, not because of tech, but because I simple love blogs!',
        user_id: 2
    },
];

const blogSeed = () => BlogPost.bulkCreate(blogData);

module.exports = blogSeed;