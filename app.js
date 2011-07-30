/**
 * Module dependencies.
 */

//var request = require('request');
var express = require('express');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('view options', { layout: false });
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
 });


// Routes

app.get('/', function(req, res){
	res.render('index.ejs', {locals: { message: ''}});
});

app.get('/one', function(req, res){
	res.render('index.ejs', {locals: { message: ''}});
});

app.get('/two', function(req, res){
	res.render('service.ejs', {locals: { message: ''}});
});

app.get('/three', function(req, res){
	res.render('support.ejs', {locals: { message: ''}});
});

app.get("/onequestion", function(req, res){
	var satisfy = req.param("satisfy");
	var price = req.param("price");
	var reason = req.param("reason");
	var age = req.param("age");
	var sex = req.param("sex");
	
	console.log('satisfy : ' + satisfy);
	console.log('price : ' + price);
	console.log('reason : ' + reason);
	
	var request = require('request');
	var parameter = '&parameter=satisfy:' + satisfy + ',price:' + price + ',reason:' + reason + ',age:' + age + ',sex:' + sex + ',';
	var url = 'http://convertintaliocloud.appspot.com/cloudprotest/?accesskey=QuestionnaireProduct&intaliouser=admin' + parameter;
	request(
		{url : url},
		function (error, response, body) {
			try {
				if (error !== null) {
					 console.log('error: ' + error);
				}
				var resData = eval("("+ body +")");
				if (resData[0].error == 'Yes') {
					res.render('error.ejs', { locals: { message : resData[0].contents}});
					return;
				} else {
					if (resData[0].count == 0) {
						res.render('error.ejs', { locals: { message : 'データの処理時に問題が発生しました'}});
					} else {
						res.render('complete.ejs', { locals: { message : 'アンケートの協力、ありがとうございます'}});
					}
				}
			} catch (e) {
				console.log('error : ' + e);
				res.render('error.ejs', { locals: { message : '予期せぬエラーが発生しました'}});
				return;
			}
		}
	);
	
});

app.get("/twoquestion", function(req, res){
	var satisfy = req.param("satisfy");
	var price = req.param("price");
	var requesting = req.param("requesting");
	var age = req.param("age");
	var sex = req.param("sex");
	
	console.log('satisfy : ' + satisfy);
	console.log('price : ' + price);
	
	var request = require('request');
	var parameter = '&parameter=satisfy:' + satisfy + ',price:' + price + ',requesting:' + requesting + ',age:' + age + ',sex:' + sex + ',';
	var url = 'http://convertintaliocloud.appspot.com/cloudprotest/?accesskey=QuestionnaireService&intaliouser=admin' + parameter;
	request(
		{url : url},
		function (error, response, body) {
			try {
				if (error !== null) {
					 console.log('error: ' + error);
				}
				var resData = eval("("+ body +")");
				if (resData[0].error == 'Yes') {
					res.render('error.ejs', { locals: { message : resData[0].contents}});
					return;
				} else {
					if (resData[0].count == 0) {
						res.render('error.ejs', { locals: { message : 'データの処理時に問題が発生しました'}});
					} else {
						res.render('complete.ejs', { locals: { message : 'アンケートの協力、ありがとうございます'}});
					}
				}
			} catch (e) {
				console.log('error : ' + e);
				res.render('error.ejs', { locals: { message : '予期せぬエラーが発生しました'}});
				return;
			}
		}
	);
	
});

app.get("/threequestion", function(req, res){
	var satisfy = req.param("satisfy");
	var operator = req.param("operator");
	var hoping = req.param("hoping");
	var age = req.param("age");
	var sex = req.param("sex");
	
	console.log('satisfy : ' + satisfy);
	console.log('operator : ' + operator);
	
	var request = require('request');
	var parameter = '&parameter=satisfy:' + satisfy + ',operator:' + operator + ',hoping:' + hoping + ',age:' + age + ',sex:' + sex + ',';
	var url = 'http://convertintaliocloud.appspot.com/cloudprotest/?accesskey=QuestionnaireSupport&intaliouser=admin' + parameter;
	request(
		{url : url},
		function (error, response, body) {
			try {
				if (error !== null) {
					 console.log('error: ' + error);
				}
				var resData = eval("("+ body +")");
				if (resData[0].error == 'Yes') {
					res.render('error.ejs', { locals: { message : resData[0].contents}});
					return;
				} else {
					if (resData[0].count == 0) {
						res.render('error.ejs', { locals: { message : 'データの処理時に問題が発生しました'}});
					} else {
						res.render('complete.ejs', { locals: { message : 'アンケートの協力、ありがとうございます'}});
					}
				}
			} catch (e) {
				console.log('error : ' + e);
				res.render('error.ejs', { locals: { message : '予期せぬエラーが発生しました'}});
				return;
			}
		}
	);
	
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
