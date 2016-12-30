var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'akshay',
  database : "hack"
})

router.get('/', function(req, res, next) {

	res.render("dashboard_settings");

});

router.post('/post', function(req, res, next) {

	console.log(req.body);

	var db_data = JSON.stringify(req.body);

	if(req.body){
		connection.query('UPDATE user_settings SET safe_range = ? WHERE uid = ?',[db_data,'56789'] , function(err,result){
			console.log(err)
			if(err){
				res.send("Error in updateing settings");
			}else{
				res.send("Saved");
			}
		})
	}else{
		req.send("Error while querying")
	}

});

module.exports = router;
