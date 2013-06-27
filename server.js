var connect = require("connect");
var connectRt = require("connect-route");
var app = connect();


//IN THE SECOND MESSAGE IT'S JUST SUPPOSED TO RETURN ONE, BUT IT RETURNS FIRST AND SECOND, WHCIHC MESESUP THE SCRIPT

var indexHTML = "<!DOCTYPE html><html><head><title>Chat Room</title><style type=\"text/css\">html, body{width: 100%; height: 100%;}.message{display: block; background-color: gray;}</style><script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-1.10.1.min.js\"></script></head><body><script type=\"text/javascript\">var chatJS= {insert: function(contextElem){var txt = document.createElement('div');txt.setAttribute('id', 'txtArea');txt.style.width = '100%';txt.style.height = '75%';var tb = document.createElement('input');tb.setAttribute('id', 'txtMssg');tb.setAttribute('type', 'text');tb.style.width = '80%';tb.style.height = '20%';tb.style.verticalAlign = 'top';var bt = document.createElement('button');bt.setAttribute('id', 'btnSnd');bt.innerHTML = 'SEND';bt.style.width = '19%';bt.style.height = '20%';contextElem.appendChild(txt);contextElem.appendChild(tb);contextElem.appendChild(bt);},send: function(){	var mssgNum = ($('#txtArea').is(':empty')) ? -1 : parseInt($('#txtArea span:last').attr('data-num'), 10);$.post('/post', {sn:'Human#1', message : $('#txtMssg').val(), last:mssgNum}).done(function(data){console.log(data);temp = JSON.parse(data);temp.forEach(function(sms){$('#txtArea').append('<span class=\"message\" data-num=\"' + sms.num + '\">' + sms.sn + ': ' + sms.text + '</span>');});});}};chatJS.insert(document.getElementsByTagName('body')[0]);$('#btnSnd').click(chatJS.send);</script></body></html>";



var posts = [];// {'sn':'spooky', 'text':'behind you'},

function getPostsInRange(start){

	var tempObj = [];
	var ii = 0;
	for (var i = start, l = posts.length; i < l ; i++)
	{
		tempObj.push(posts[i]);
		tempObj[ii].num = i;
		ii += 1;

	}
	return JSON.stringify(tempObj);
}

app.use(connect.bodyParser());
app.use(connectRt(function(router){

	router.get('/', function(req, res, next){
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(indexHTML);
	});

	router.get('/update', function(req, res, next){
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(getPostsInRange(req.body.last));
	});

	router.post('/post', function(req, res, next){
		posts.push({'sn': req.body.sn, 'text':req.body.message});
		console.log('Posts object');console.log(posts);
		console.log('Request');	console.log(req.body);

		res.writeHead(200, {"Content-Type": "text/plain"});
		console.log('Response');
		if (req.body.last === '-1')
		{
			console.log(JSON.stringify([{'sn': req.body.sn, 'text':req.body.message, 'num':0}]));
			 res.end(JSON.stringify([{'sn': req.body.sn, 'text':req.body.message, 'num':0}]));
		}
		else
		{
			console.log(getPostsInRange(parseInt(req.body.last, 10) + 1));
			res.end(getPostsInRange(parseInt(req.body.last, 10) + 1));
		}
	console.log('-------------------------------------------------')
	});

	router.post('/join', function(req, res, next){
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write(req.body.userName + 'has joined the conversation.');
		res.end();
	});
}));

app.listen(process.env.PORT || 3000);

//There is no way to implement a real chatroom with http requests only
//The simulation will have to be making frequent requests to the server
//Client makes post
//server takes post and gives it post number
//server keeps getting post number
//on response to post, bring back the latest x posts
//have client-code matchup which posts are already on screen
//client sends request with latest post

//Ruby parser. Turn html file into javascript string;