// var Person = require('./person');
// var john = new Person('john');
// john.talk();

// var mybuffer = new Buffer('==ii1j2i3hli23h', 'base64');
// console.log(mybuffer);
// require('fs').writeFile('logo.png', mybuffer);

/**
*	模块依赖
*/

var net = require('net')

//追踪链接数
var count = 0, users = {}

//创建服务器
var server = net.createServer(function (conn) {
	//handle connection
	console.log('\033[90m	new connection!\033[39m');

	conn.setEncoding('utf8');
	var nickName;	//代表当前连接的昵称

	conn.write(
		'\n > welcont to \033[92mnode-chat\033[39m!' + 
		'\n > ' + count + ' other people are connected at this time.' +
		'\n > please write your name and press enter: '
		);
	count++;

	conn.on('data', function(data){
		console.log(data);
		data = data.replace('\r\n', '');



		if (!nickName) {
			if (users[data]) {
				conn.write('\033[93m> nickname already in use. try again:\033[39m ');
				return;
			}else{
				nickName = data;
				users[nickName] = conn;

				// for (var i in users){
				// 	users[i].write('\033[90m > ' + nickName + ' joined the room\033[39m\n ');
				// }
				broadcast('\033[90m > ' + nickName + ' joined the room\033[39m\n');
			}
		}else{
			//否则视为聊天信息
			// for (var i in users) {
			// 	if (i != nickName) {
					console.log(users.count);
					broadcast('\033[96m > ' + nickName + ':\033[39m ' + data + '\n', true);
			// 	}
			// }
		}
	});

	conn.on('close', function(){
		count--;
		delete users[nickName];
		broadcast('\033[96m > ' + nickName + ' left the room\033[39m\n');
	});

	function broadcast (msg, exceptMyself) {
		for(var i in users){
			if (!exceptMyself || i != nickName) {
				console.log(i + '   --v hah');
				users[i].write(msg);
			}
		}
	}

});



//监听
server.listen(3000, function() {
	console.log('\033[96m	server listing on *:3000\033[39m');
});