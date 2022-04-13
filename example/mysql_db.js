var mysql = require('mysql');
var sqlPool = mysql.createPool({
    host    : 'localhost',
    user    : 'root',
    password: 'akcl1234',
    database: 'smsoftlab'
});

//DB 쿼리 조회
exports.query = function(sql, values, callback){
	sqlPool.getConnection(function(err, connection){
		if(!err){
			if(typeof(values) == 'undefined'){
				connection.query(sql, function(err, result){
					callback(err, result);
				});
			}else{
				connection.query(sql, values, function(err, result){
					callback(err, result);
				});
			}
			connection.release();
		}
		else{
			console.log(err);
		}
	});
};
