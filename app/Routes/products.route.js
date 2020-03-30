var router = require('express').Router();
var productCtrl = require('../controllers/product.controller');
var authCtrl = require('../controllers/auth.controller');

router
.route('/products')
.post(authCtrl.tokenValidator,productCtrl.addManyProducts)
.get(authCtrl.tokenValidator,productCtrl.getManyProducts);

router
.route('/products/new')
.post(productCtrl.addOneProduct);

router
.route('/products/:productId')
.get(productCtrl.getOneProduct)
.put(productCtrl.updateOneProduct)
.delete(productCtrl.deleteOneProduct);

module.exports = router;