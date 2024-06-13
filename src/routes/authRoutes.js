const express = require("express");
const router = express.Router();
const { signUpUser, signInUser, logoutUser }  = require('../middlewares/authMiddleware.js');

const {
    showAccessLogin,
    getSingInUser,
    getSingUpUser,
    getLogoutUser,
} = require('../controllers/authController');


router.get('/access', showAccessLogin);
router.post('/singin', signInUser, getSingInUser);
router.post('/singup', signUpUser, getSingUpUser);
router.get('/logout', logoutUser, getLogoutUser);

module.exports = router;