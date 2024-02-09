const { Comment } = require('../models');

const commentData = [
    {
        content:'here is some content!',
        user_id: 2,
        blogpost_id: 4 
    },
    {
        content:'here is some more content!',
        user_id: 1,
        blogpost_id: 3 
    },
    {
        content:'here is even more content!',
        user_id: 3,
        blogpost_id: 2 
    },
];

const commentSeed = () => Comment.bulkCreate(commentData);

module.exports = commentSeed;