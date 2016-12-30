/*
	This file totally handle the incoming data from the sensor and stores the data into DB
*/

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $ = require('jquery');
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

function get_daily_status(){

	connection.query('SELECT daily_status FROM sensor_data WHERE uid = ?', [56789],function(errors,results,fields){
		return results;
	})

}

router.get('/', function(req, res, next) {

	/*
		
		Example url must be

		GET localhost:3000/sensor?auth_id=juwlos2njkkskd9sjwkd8sjwj&auth_tk=kljads892173&s1=23.2&s2=234.2&s3=234.4

	*/
	
	// api data
	var auth_id = req.query["auth_id"]; // has the query parameters
	
	// sensors data
	var sensor_1 = (req.query["s1"] == undefined) ? "" : req.query["s1"]; 
	var sensor_2 = (req.query["s2"] == undefined) ? "" : req.query["s2"]; 
	var sensor_3 = (req.query["s3"] == undefined) ? "" : req.query["s3"]; 
	
	if(typeof auth_id == "string" && auth_id != null ){

		var sdo = {};
			sdo["sensor_1"] = sensor_1;
			sdo["sensor_2"] = sensor_2;
			sdo["sensor_3"] = sensor_3;

		var sd = JSON.stringify(sdo); 


		d = new Date();

		var sensor_data =  { 
							 uid : 56789,
							 auth_id : auth_id,
							 sdata : sd ,
							 sdate : d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear(),
							 stime : d.getTime()
							};

		connection.query('SELECT uid FROM users_list WHERE auth_id = ?',[auth_id],function(error,results,fields){
			if(error || results === "" || typeof results === undefined || results.length === 0){
				res.send("Error in auth id");
			}else{
				connection.query('INSERT INTO sensor_data SET ?',sensor_data,function(err,result){
					if(err){
						console.log(err);
						res.send("DB error");
					}else{
						console.log(result);
						d = new Date();
						if(d.getHours() === 10){
							send_sms("7406097947","Hello there!!, Its safe");
							// res.send("7406097947"+"Good evening, The status is "+get_daily_status());
						}

						res.send("Success")
					}
				})
			}

		})


	}else{
		res.send("Error");
	}


});


router.get('/getdata',function(req,res){
 
	var j = {asd:213};

	var filters = {};

	var d = new Date('2016-11-08');

	var query = connection.query('SELECT * FROM sensor_data WHERE 1',	d,function(err,result){


		res.send(result);
	})


})


module.exports = router;
