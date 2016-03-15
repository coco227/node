// var http = require('http');

// http.createServer(function (request, response) {

// 	// 发送 HTTP 头部 
// 	// HTTP 状态值: 200 : OK
// 	// 内容类型: text/plain
// 	response.writeHead(200, {'Content-Type': 'text/plain'});

// 	// 发送响应数据 "Hello World"
// 	response.end('Hello World\n');
// }).listen(8888);

// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');

var qs = require('querystring');
require('http').createServer(function (req, res){
	if ('/' == req.url) {
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end([
			'<form method = "POST" action = "/url">' , 
			'<h1>My form</h1>' , 
			'<fieldset>' , 
			'<label>Personal information</label>' ,
			'<p>What is your name?</p>' , 
			'<input type = "text" name = "name">' , 
			'<p><button>Submit</button></p>' , 
			'</form>'
		].join(''));
	}else if ('/url' == req.url && 'POST' == req.method) {
		var body = '';
		req.on('data', function(chunk){
			body += chunk;
		});
		req.on('end', function(){
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.end('<p>Your name is <b>' + qs.parse(body).name + '</b></p>');
		});
	}
}).listen(3000);