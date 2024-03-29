const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne ({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect password, please try again' });
            return;
          }
          res.render('home');
    } catch(err) {
        res.status(400).json(err);
    }
});

router.post('/registerUser', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
      
            res.status(200).json(userData);
          });

        res.render('home');
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    console.log(`\n Logged in: ${req.session.logged_in}  \n`);
    
    if (req.session.logged_in) {
        res.render('login');
    }
    
});

router.post('/newPost/makePost', async (req, res) => {
          
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please enter valid username' });
      return;
    }

    const newPost = await User.create(req.body);

    res.render('home');
});

router.get('/:username', async (req, res) => {
    try {
        console.log(`\n Getting data for user with username: ${req.params.username} \n`)
  
        const userData = await User.findOne({ where: { username: req.params.username } });
  
        if(!userData) {
            res.status(404).json({ message: 'No users found with this username'} );
        } else {
            res.status(200).json(userData);
        }
  
    } catch (err) {
        res.status(500).json(err);
    }
  });

module.exports = router;