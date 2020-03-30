var router = require('express').Router();
var homeCtrl = require('../controllers/home.controller')
router
.route('/')
.get(homeCtrl.homeRoot);

router
.route('/home')
.get(homeCtrl.homePage);

module.exports = router;