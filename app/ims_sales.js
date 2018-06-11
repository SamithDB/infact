// app/routes.js
	
	var dbconfig = require('../config/database');
	var mysql = require('mysql');
	var connection = mysql.createConnection(dbconfig.connection);
	var cookieParser = require('cookie-parser');
	const fileUpload = require('express-fileupload');
	var math = require('mathjs');
		
	connection.query('USE ' + dbconfig.database);


	module.exports = function(app, passport) {



	// =====================================
	// /View Stock =========================
	// =====================================

	app.get('/viewstock', isLoggedIn, function(req, res) {

					connection.query("SELECT * FROM user WHERE username = ? ",[req.user.username], function(err1, rows) {
                    if (err1)
                        console.log(err1);
                    connection.query("SELECT * FROM stock", function(err2, stock) {
                    if (err2)
                        console.log(err2);

						res.render('viewstock.ejs', {
						user : rows[0],	//  pass to template
						stock : stock
						});

        			});
        			});
			});

	// =====================================
	// Sell Page ===========================
	// =====================================

	app.get('/sellpage', isLoggedIn, function(req, res) {

					connection.query("SELECT * FROM user WHERE username = ? ",[req.user.username], function(err1, rows) {
                    if (err1)
                        console.log(err1);
                    connection.query("SELECT * FROM stock", function(err2, stock) {
                    if (err2)
                        console.log(err2);

						res.render('sell_page.ejs', {
						user : rows[0],	//  pass to template
						stock : stock
						});

        			});
        			});
			});
	
	
}

// route middleware to make sure
function isLoggedIn(req, res, next) {


	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
		return next();
	}

	// if they aren't redirect them to the home page
	res.redirect('/');
}
