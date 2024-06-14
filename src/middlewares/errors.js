const views = require('../views/productView.js');

module.exports = function (err, req, res, next) {
    let isDashboard = false;
    if (req.route !== undefined && req.route.path !== undefined)
        isDashboard = (req.route.path.indexOf("dashboard") !== -1) ? true : false;
    
    return res.status(500).send(views.getWithoutProducts(`Ha ocurrido algún error. Inténtalo más tarde.`, isDashboard));
}


