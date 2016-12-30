var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'girish',
  database : "agritech"
})

router.get('/', function(req, res, next) {


	// connection.connect()
	// var user = {uname:'girish',upass:'girish',uphone:'8971651434',ulocation:'hubli'};
	// var query = connection.query('INSERT INTO users_list SET ? ', user , function (err, result) {
	// 	console.log(err);
	// })
	// connection.end()

	res.render('index', { title: 'Agritech' });

});

module.exports = router;
