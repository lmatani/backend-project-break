const { validationResult } = require('express-validator');
const views = require('../views/productView.js');


module.exports = (req, res, next) => {
	const errors = validationResult(req);
   
    console.log(errors.array());
	if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => ` - ${err.msg}`).join('\n');
		return res.status(422).send(`Ha ocurrido algún error. Valida los datos \n${errorMessages}`);
    }
    next();
}
