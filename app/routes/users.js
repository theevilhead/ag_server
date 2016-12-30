/* 
	This file handles the signup,login and auth stuff of users
*/

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'akshay',
  database : "hack"
})
	connection.connect()

router.get('/s', function(req, res, next) {
	res.send("asd");
});

router.post('/s',function(req,res,next){

	var un = req.body.un;
	var phone = req.body.pn;
	var password = req.body.ps;
	var loc = req.body.loc;

	var db_data = { uname : un,
					upass : password , 
					uphone : phone , 
					ulocation : loc,
					auth_id : un,
				};
	console.log(db_data)
	var query = connection.query("INSERT INTO users_list SET ?", db_data,function(err,results){
		if(err){
			res.send("error");
		}else{
			// res.send("Yo");
			res.send({ redirect: '/dashboard' })
		}
		console.log(res);
	})


})


router.post("/l",function(req,res,next){

	var phone = req,body,pn
	var password = req.body.ps;

	var db_data = {
		uphone : phone,
		upass : password
	}


	connection.query('SELECT * FROM users_list WHERE uphone = ? AND upass = ?',db_data,function(err,results){
		if(res){
			req.session.logged_in = true;
			res.send({ redirect: '/dashboard' })
		}else{
			console.log("Error");
			res.send("ERROR");
		}
	})


})




module.exports = router;
