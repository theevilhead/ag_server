var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var plivo = require('plivo');

var plivo_api = plivo.RestAPI({
  authId: 'MAYTK0M2MZNJA1MJQ4Y2',
  authToken: 'OThkMjNiMTUwYzcyM2Y0ZGVkYzJlNWViMWM3NWRh',
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'akshay',
  database : "hack"
})


/* This function sends sms with msg as the content */

function send_sms(to,msg){
	var params = {
	    'src': '1111111111',
	    'dst' : "+91"+to,
	    'text' : msg
	};

	plivo_api.send_message(params, function (status, response) {
	    console.log('Status: ', status);
	    console.log('API Response:\n', response);

	    if(status === 202){
	    	return true;
	    }

	    return false;

	});
}


router.get('/', function(req, res, next) {

	res.render('dashboard');

});

router.get('/sensor_data',function(req,res,next){

	var d = new Date();


	// connection.query('SELECT sdata FROM sensor_data WHERE sdate = ?',[d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear()],
	// 	function(error,results,fields){
	// 		if(error){
	// 			console.log(error)
	// 			res.send("Error");
	// 		}else{
	// 			res_data["data"] = results;
	// 		}
	// 	}
 //    );



	    connection.query('SELECT safe_range FROM user_settings WHERE uid = ?',[56789],function(error,results,fields){
			var res_data = {}; 

	    	if(error){
				console.log(error)
				res.send("Error");
			}else{
				res_data["range"] = results;
			 	dt = req.query["dt"];
			 	var query_date;
			 	if(dt !=  undefined || dt != null){
			 		query_date = dt;
			 	}else{
		 			query_date = d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
			 	}
			 	console.log("query_date",query_date);
				connection.query('SELECT sdata FROM sensor_data WHERE sdate = ?',[query_date],
					
					function(error,results,fields){
						console.log(results.length);
						if(results === "" || results == null || results == undefined || results.length === 0){
							res_data["error"] = "No data for this day";
							res.send(res_data);
						}else{
							if(error){
								console.log(error);
								res.send("Error");
							}else{
								res_data["data"] = results;
								res.send(res_data);
							}
						}
					}
			    );

			}
	    })


})

router.get('/settings', function(req, res, next) {

	res.render('dashboard_settings');

});


router.post('/settings', function(req, res, next) {

	res.send("Succesfully added bro");

});

router.get("/stats",function(req,res){

	res.render("dashboard_stats");

})

module.exports = router;
