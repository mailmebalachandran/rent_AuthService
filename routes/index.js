const express = require('express');
const authController = require('../controller/authController');


const router = express.Router();

router.post('/authenticateUser',authController.authenticateUser);
router.post('/authenticateWithrefreshtoken', authController.authenticateWithRefreshToken);
router.post('/verifyToken', authController.verifyToken);
router.post('/decodeToken', authController.decodeToken);


module.exports = router;