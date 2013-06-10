var http = require("http");

function serverFunc(request, response)
{
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write('Hello World');
	response.end();
}
http.createServer(serverFunc).listen(process.env.PORT || 3000);