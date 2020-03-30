var router = require('express').Router();
var usersCtrl = require('../controllers/users.controller');
var authCtrl = require('../controllers/auth.controller')

router
.route('/user')
.get(usersCtrl.getOneUser);
//.delete(usersCtrl.deleteUser);

router
.route('/register')
.post(authCtrl.registration);

router
.route('/login')
.post(authCtrl.loginUser);

router
.route('/auth')
.get(authCtrl.tokenValidator);

router
.route('/users')
.get(usersCtrl.getAllUsers);

router
.route('/user/new')
.post(usersCtrl.addUser);

router
.route('/user/:userId')
.get(usersCtrl.getUserById)
.put(usersCtrl.updateUser)
.delete(usersCtrl.deleteOneUser);

// router
// .route('/data')
// .get(usersCtrl.userData);

module.exports = router;