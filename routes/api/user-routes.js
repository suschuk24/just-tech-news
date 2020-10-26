const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // access out user model and run .findAll() method
    User.findAll()
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: res.params.id
        }
    })
      .then(dbUserData => {
          if(!dbUserData) {
              res.status(404).json({ message: 'No user found with this ID'});
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      })
});

// POST /api/users
router.post('/',(req, res) => {
    User.create({
        username: req.body.email,
        email: req.body.email,
        password: req.body.password
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err).json(err)
      })
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
      .then(dbUserData => {
          if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID'});
            return;
          }
          res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// DELEETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;