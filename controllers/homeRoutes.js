const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
        const bpData = await BlogPost.findAll({
            include: [{ model: User }]
        });

        const bp = bpData.map((post) => post.get({ plain: true }));

        res.render('home', { bp });


    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/post/:id', async (req, res) => {
    try {

        const bpData = await BlogPost.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: Comment }
            ]
        });

        const bp = bpData.get({ plain: true });
        
        console.log(`\n ${bp.id} \n`)

        res.render('post', {bp});

    } catch (err) {
        res.status(500).json(err);
    }

});


router.get('/login', async (req, res) => {
    try {
        res.render('login');


    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/register', async (req, res) => {
    try {
        res.render('register');


    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/newPost', async (req, res) => {
    try {
        res.render('newPost');
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/editPost/:id', async (req, res) => {
    try {

        const bpData = await BlogPost.findByPk(req.params.id, {
            include: [
                { model: User },
            ]
        });

        const bp = bpData.get({ plain: true });
        
        console.log(`\n ${bp.id} \n`)

        res.render('editPost', {bp});

    } catch (err) {
        res.status(500).json(err);
    }

});


router.get('/user', async (req, res) => {
    try {
        console.log(`\n Getting all user data \n`);

        const userData = await User.findAll();
        res.status(200).json(userData);        
        
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/user/all/:id', async (req, res) => {
    try {
        console.log(`\n Getting data for user with id: ${req.params.id} \n`)

        const userData = await User.findByPk(req.params.id, {
            include: [ 
                { model: BlogPost },
                { model: Comment } 
            ]     
        });

        if(!userData) {
            res.status(404).json({ message: 'No users found with this id'} );
        } else {
            res.status(200).json(userData);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/blogpost', async (req, res) => {
    try {
        console.log(`\n Getting all blog post data \n`);

        const bpData = await BlogPost.findAll();
        res.status(200).json(bpData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogpost/all/:id', async (req, res) => {
    try {
        console.log(`\n Getting data for blog post with id: ${req.params.id} \n`);

        const bpData = await BlogPost.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: Comment }
            ]
        });

        if(!bpData) {
            res.status(404).json({ message: 'No blog posts found with this id'} );
        } else {
            res.status(200).json(bpData);
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
})


router.get('/comment', async (req, res) => {
    try {
        console.log(`\n Getting all comment data \n`);

        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/comment/all/:id', async (req, res) => {
    try {
        console.log(`\n Getting data for comment with id: ${req.params.id} \n`)

        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: BlogPost }
            ]
        });

        if(!commentData) {
            res.status(404).json({ message: 'No comments found with this id'} );
        } else {
            res.status(200).json(commentData);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;