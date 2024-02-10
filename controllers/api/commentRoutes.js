const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);

        res.status(200).json(commentData);


    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(
            {
                content: req.body.content,
                user_id: req.body.user_id,
                blogpost_id: req.body.blogpost_id
            },
            {
                where:
                {
                    id: req.params.id
                }
            }
        )
        if (!commentData) {
            res.status(404).json({ message: "No comment found." });
        } else {
            res.status(400).json(err)
        }
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;