const views = require('../views/productView.js');

const showAccessLogin = async (req, res) => {  
	res.status(200).send(views.getUserAccess('/singup'));
} 

const getSingInUser = async (req, res) => {  
    res.redirect(200, '/dashboard');
} 

const getSingUpUser = async (req, res) => {  
    res.redirect(200, '/dashboard');
} 

const getLogoutUser = async (req, res) => {  
    res.status(200).send(views.getUserAccess('/singup'));
} 



module.exports = {
	showAccessLogin,
    getSingInUser,
    getSingUpUser,
    getLogoutUser
}
