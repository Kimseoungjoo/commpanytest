var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();
var mysqldb = require('./mysql_db');

app.set('port', process.env.PORT || 80);
app.use(bodyParser.urlencoded({extended:true, limit: '10mb'}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(function (req, res, next) { //1
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});
app.use(express.static(path.join(__dirname,''), {maxAge : 86400000}));
app.use(express.static(path.join(__dirname,'public'), {maxAge : 86400000}));

app.get('/', function(req, res){
	res.redirect('/index.html');
});

var returnMsg = {
    'errcode' : '0000',
    'errmsg' : 'Successful'
};
// 사용자 관리
// 등록/편집
app.put('/setUser', function(req, res){
    console.log('setUser');
    console.log(req.body);

    var data = req.body;
    
    var no = data.no;
    var name = data.name;
    var usedate = data.usedate || '';
    var returndate = data.returndate || '';
    var etc = data.etc || '';

    var query = "INSERT INTO machine_idx (no, name, usedate, returndate, etc) VALUES ('" + no + "','" + name + "','" + usedate + "','" + returndate + "','" + etc + "');";
console.log(query);
    mysqldb.query(query, function(err, result){
        if(err){
            console.log(err);
            returnMsg.errcode = '9999';
            returnMsg.errmsg = err;
            res.json(returnMsg);
            res.end();
            return;
        }

		returnMsg.errcode = '0000';
        returnMsg.errmsg = 'Successful';

        console.log(result);
        res.json(returnMsg);
        res.end();
    });
});
app.put('/updateUser', function(req, res){
    console.log('updateUser');
    console.log(req.body);

    var data = req.body;
    
    var idx = data.idx;
    if(!idx){
        returnMsg.errcode = '0001';
        returnMsg.errmsg = 'No user idx selected!';
        res.json(returnMsg);
        res.end();
        return;
    }
	var no = data.no || '';
    var name = data.name || '';
    var usedate = data.usedate || '';
    var returndate = data.returndate || '';
    var etc = data.etc || '';

    var query = "UPDATE machine_idx SET no='" + no + "',name='" + name + "',usedate='" + usedate + "',returndate='" + returndate + "',etc='" + etc + "' WHERE idx=" + idx + ";";
    console.log(query);
    mysqldb.query(query, function(err, result){
        if(err){
            console.log(err);
            returnMsg.errcode = '9999';
            returnMsg.errmsg = err;
            res.json(returnMsg);
            res.end();
            return;
        }

		returnMsg.errcode = '0000';
        returnMsg.errmsg = 'Successful';

        console.log(result);
        res.json(returnMsg);
        res.end();
    });
});
app.put('/deleteUser', function(req, res){
    console.log(req.body);

    var data = req.body;

    var idx = data.idx;
    
    var query = "DELETE FROM machine_idx WHERE idx = " + idx + ";";
console.log(query);
    mysqldb.query(query, function(err, result){
        if(err){
            console.log(err);
            returnMsg.errcode = '9999';
            returnMsg.errmsg = err;
            res.json(returnMsg);
            res.end();
            return;
        }

		returnMsg.errcode = '0000';
        returnMsg.errmsg = 'Successful';

        console.log(result);
        res.json(returnMsg);
        res.end();
    });
});
app.get('/getUserList', function (req, res) {
    console.log(req.query);

    var data = req.query;
    
    var no = data.no;
    var name = data.name;

	var bOnlyName = false;
    var query = "SELECT idx, no, name, usedate, returndate, etc FROM machine_idx";
    if(no || name){
        if(no && name){
            query += " WHERE no='" + no + "' AND name='" + name + "'";
        }
        else{
            if(no){
                query += " WHERE no='" + no + "'";
            }
            else{
				bOnlyName = true;
                //query += " name='" + name + "'";
				query += " ORDER BY idx DESC";
            }
        }
    }
console.log(query);
    mysqldb.query(query, function (err, result) {
		if (err) {
			console.log(err);
            returnMsg.errcode = '9999';
            returnMsg.errmsg = err;
            res.json(returnMsg);
            res.end();
            return;
		}
		returnMsg.errcode = '0000';
        returnMsg.errmsg = 'Successful';
		if(bOnlyName){
			var resultList = [];
			//console.log(result.length);
			for(var x = 0;x < result.length;x++){
				var resultObj = result[x];
				//console.log(resultObj);
				if(resultObj.name == name){
					resultList.push(resultObj);
				}
			}

			var returnResult = [];
			for(var x = 0;x < resultList.length;x++){
				var myIdxObj = resultList[x];
				for(var y = 0;y < result.length;y++){
					var resultObj = result[y];
					if(resultObj.no == myIdxObj.no){
						if(resultObj.name == myIdxObj.name){
							console.log(resultObj);
							returnResult.push(resultObj);
						}
						break;
					}
				}
			}
			returnMsg["result"] = returnResult;
		}
		else
			returnMsg["result"] = result;
		res.json(returnMsg);
		res.end();
	});
});

app.post('/setMachine', function(req, res){
    console.log(req.body);

    var data = req.body;
    
    var no = data.no;
    var cpu = data.cpu;
    var ssd1 = data.ssd1 || '';
    var ssd2 = data.ssd2 || '';
    var ssd3 = data.ssd3 || '';
    var hdd1 = data.hdd1 || '';
    var hdd2 = data.hdd2 || '';
    var hdd3 = data.hdd3 || '';
    var os = data.os || '';
    var vga = data.vga || '';
    var fromdate = data.fromdate || '';
    var updatedate = data.updatedate || '';
    var location = data.location || '';
    var etc = data.etc || '';
    var model = data.model || '';
    var mem = data.mem || '';
    var status = data.status || '';
    var price = data.price || '';
    
    var query = "INSERT INTO machine_list (no, cpu, ssd1, ssd2, ssd3, hdd1, hdd2, hdd3, os, vga, fromdate, updatedate, location, etc, model, mem, status, price) \n"
        +"VALUES ('" + no + "','" + cpu + "','" + ssd1 + "','" + ssd2 + "','" + ssd3 + "','" + hdd1 + "','" + hdd2 + "','" + hdd3 + "','" + os + "','" + vga + "','" + fromdate + "','" + updatedate + "','" + location + "','" + etc + "','" + model + "','" + mem + "','" + status + "','" + price + "');";
console.log(query);
    mysqldb.query(query, function(err, result){
        if(err){
            console.log(err);
            returnMsg.errcode = '9999';
            returnMsg.errmsg = err;
            res.json(returnMsg);
            res.end();
            return;
        }

		returnMsg.errcode = '0000';
        returnMsg.errmsg = 'Successful';
        console.log(result);
        res.json(returnMsg);
        res.end();
    });
});
app.put('/deleteMachine', function(req, res){
    console.log(req.body);

    var data = req.body;

    var idx = data.idx;
    
    var query = "DELETE FROM machine_list WHERE idx = " + idx + ";";
console.log(query);
    mysqldb.query(query, function(err, result){
        if(err){
            console.log(err);
            returnMsg.errcode = '9999';
            returnMsg.errmsg = err;
            res.json(returnMsg);
            res.end();
            return;
        }

		returnMsg.errcode = '0000';
        returnMsg.errmsg = 'Successful';
        console.log(result);
        res.json(returnMsg);
        res.end();
    });
});
app.post('/updateMachine', function(req, res){
    console.log(req.body);

    var data = req.body;
    
    var idx = data.idx;
    if(!idx){
        returnMsg.errcode = '0001';
        returnMsg.errmsg = 'No idx selected!';
        res.json(returnMsg);
        res.end();
        return;
    }
    var cpu = data.cpu;
    var ssd1 = data.ssd1 || '';
    var ssd2 = data.ssd2 || '';
    var ssd3 = data.ssd3 || '';
    var hdd1 = data.hdd1 || '';
    var hdd2 = data.hdd2 || '';
    var hdd3 = data.hdd3 || '';
    var os = data.os || '';
    var vga = data.vga || '';
    var fromdate = data.fromdate || '';
    var updatedate = data.updatedate || '';
    var location = data.location || '';
    var etc = data.etc || '';
    var model = data.model || '';
    var mem = data.mem || '';
    var status = data.status || '';
    var price = data.price || '';

    var query = "UPDATE machine_list SET cpu='" + cpu + "',\n"
                + "ssd1='" + ssd1 + "',\n"
                + "ssd2='" + ssd2 + "',\n"
                + "ssd3='" + ssd3 + "',\n"
                + "hdd1='" + hdd1 + "',\n"
                + "hdd2='" + hdd2 + "',\n"
                + "hdd3='" + hdd3 + "',\n"
                + "os='" + os + "',\n"
                + "vga='" + vga + "',\n"
                + "fromdate='" + fromdate + "',\n"
                + "updatedate='" + updatedate + "',\n"
                + "location='" + location + "',\n"
                + "model='" + model + "',\n"
                + "mem='" + mem + "',\n"
                + "status='" + status + "',\n"
                + "price='" + price + "',\n"
                + "etc='" + etc + "'\n"
                + "WHERE idx=" + idx + ";";
console.log(query);
    mysqldb.query(query, function(err, result){
        if(err){
            console.log(err);
            returnMsg.errcode = '9999';
            returnMsg.errmsg = err;
            res.json(returnMsg);
            res.end();
            return;
        }

		returnMsg.errcode = '0000';
        returnMsg.errmsg = 'Successful';
        console.log(result);
        res.json(returnMsg);
        res.end();
    });
});
app.get('/getMachineList', function (req, res) {
    console.log(req.query);

    var data = req.query;
    
    var no = data.no;
    var location = data.location;

    var query = "SELECT * FROM machine_list";
    if(no || location){
        query += " WHERE";
        if(no && location){
            query += " no='" + no + "' AND location='" + location + "'";
        }
        else{
            if(no){
                query += " no='" + no + "'";
            }
            else{
                query += " location='" + location + "'";
            }
        }
    }
console.log(query);
    mysqldb.query(query, function (err, result) {
		if (err) {
			console.log(err);
            returnMsg.errcode = '9999';
            returnMsg.errmsg = err;
            res.json(returnMsg);
            res.end();
            return;
		}

		returnMsg.errcode = '0000';
        returnMsg.errmsg = 'Successful';
		returnMsg["result"] = result;
		res.json(returnMsg);
		res.end();
	});
});
app.get('/getMachineInfo', function (req, res) {
    console.log(req.query);

    var data = req.query;
    
    var no = data.no;
	if(!no){
		var query = "select aa.no, aa.userIdx, aa.name, aa.usedate, aa.returndate, aa.userEtc, bb.idx, bb.cpu, bb.ssd1, bb.ssd2, bb.ssd3, bb.hdd1, bb.hdd2, bb.hdd3, bb.os, bb.vga, bb.fromdate, bb.updatedate, bb.location, bb.etc, bb.model, bb.mem, bb.status, bb.price from (select t1.no, t1.idx as userIdx, t1.name, t1.usedate, t1.returndate, t1.etc as userEtc from machine_idx t1 inner join (select max(idx) as userIdx,no from machine_idx group by no) t2 on t1.no = t2.no and t1.idx = t2.userIdx) as aa left join (select t1.* from machine_list t1 inner join (select max(idx) as idx,no from machine_list group by no) t2 on t1.idx = t2.idx and t1.no = t2.no) as bb on aa.no = bb.no order by aa.no";
	}
	else{
		var query = "SELECT * FROM (SELECT * FROM machine_list WHERE no = '" + no + "' ORDER BY idx DESC LIMIT 1) a, (SELECT idx as userIdx,no,name,usedate,returndate,etc as userEtc FROM machine_idx WHERE no = '" + no + "' ORDER BY idx DESC LIMIT 1) b WHERE a.no = b.no AND a.no = '" + no + "'";
	}
console.log(query);
    mysqldb.query(query, function (err, result) {
		if (err) {
			console.log(err);
            returnMsg.errcode = '9999';
            returnMsg.errmsg = err;
            res.json(returnMsg);
            res.end();
            return;
		}

		returnMsg.errcode = '0000';
        returnMsg.errmsg = 'Successful';
		returnMsg["result"] = result;
		res.json(returnMsg);
		res.end();
	});
});
app.get('/loginService', function (req, res) {
    console.log(req.query);

    var data = req.query;
    
    var id = data.id;
	var pw = data.pw;
	
	if(!id || !pw){
		returnMsg.errcode = '8888';
		returnMsg.errmsg = 'Login Error!';
		res.json(returnMsg);
		res.end();
		return;
	}
	
	var query = "SELECT id,pw FROM machine_member where id='" + id + "' AND pw='" + pw + "'";
	console.log(query);
    mysqldb.query(query, function (err, result) {
console.log(result);
console.log(err);
		if (err) {
			console.log(err);
            returnMsg.errcode = '9999';
            returnMsg.errmsg = err;
            res.json(returnMsg);
            res.end();
            return;
		}

		returnMsg.errcode = '0000';
        returnMsg.errmsg = 'Successful';
		returnMsg["result"] = result;
		res.json(returnMsg);
		res.end();
	});
});
app.listen(8585);
