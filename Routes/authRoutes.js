const express = require('express');
const { validateSigninRequest } = require('../validators/authValidators');
const { validateSignupRequest } = require('../validators/authValidators');
const { isRequestValidated } = require('../validators/authValidators');
const router = express.Router();

const { signup, signin } = require('../controller/auth');
const { requireSignin } = require('../middleware/authMiddleware');
router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);

module.exports = router;