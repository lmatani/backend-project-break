const { param } = require('express-validator');

module.exports = function checkObjectIdParam(field) {
	return param('productId').isMongoId().withMessage('Invalid format Id.')
}
