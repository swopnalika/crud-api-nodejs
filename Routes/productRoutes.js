const express = require('express');
const router = express.Router();
const { isRequestValidated } = require('../validators/authValidators');
const products = require('../controller/product');
const createProducts = require('../controller/product');
const deleteProducts = require('../controller/product');
const updateProducts = require('../controller/product');
router.get('', products);
router.post('', isRequestValidated, createProducts);
router.post('', isRequestValidated, deleteProducts);
router.patch('', isRequestValidated, updateProducts);

module.exports = router;