// var http = require("http");


// var html = '<!DOCTYPE html><html><head></head><body><h2>ok, this  is being served as text/html now.</h2></body></html>';

// function serverFunc(request, response)
// {
// 	response.writeHead(200, {"Content-Type": "text/html"});
// 	response.write(html);
// 	console.log(__dirname);
// 	response.end();
// }
// http.createServer(serverFunc).listen(process.env.PORT || 3000);


var connect = require("connect");
var connectRt = require("connect-route");
var app = connect();


app.use(connectRt(function(router){

	router.get('/', function(req, res, next){
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write('<h1>This the home yall.<a href="/update">Testing request</a></h1>');
		res.end(); //res.end('index');
	});

		router.get('/update', function(req, res, next){
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write('<h1>Request works</h1>');
		res.end(); //res.end('index');
	});

}));

app.listen(process.env.PORT || 3000);