var connect = require("connect");
var connectRt = require("connect-route");
var app = connect();

var indexHTML = "<!DOCTYPE html><html><head><title>Chat Room</title><style type=\"text/css\">html, body{width: 100%; height: 100%;}.message{display: block; background-color: gray;}</style><script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-1.10.1.min.js\"></script></head><body><script type=\"text/javascript\">var chatJS= {insert: function(contextElem){var txt = document.createElement('div');txt.setAttribute('id', 'txtArea');txt.style.width = '100%';txt.style.height = '75%';var tb = document.createElement('input');tb.setAttribute('id', 'txtMssg');tb.setAttribute('type', 'text');tb.style.width = '80%';tb.style.height = '20%';tb.style.verticalAlign = 'top';var bt = document.createElement('button');bt.setAttribute('id', 'btnSnd');bt.innerHTML = 'SEND';bt.style.width = '19%';bt.style.height = '20%';contextElem.appendChild(txt);contextElem.appendChild(tb);contextElem.appendChild(bt);},send: function(){	var mssgNum = ($('#txtArea').is(':empty')) ? -1 : parseInt($('#txtArea span:last').attr('data-num'), 10);$.post('/post', {sn:'Human#1', message : $('#txtMssg').val(), last:mssgNum}).done(function(data){console.log(data);temp = JSON.parse(data);temp.forEach(function(sms){$('#txtArea').append('<span class=\"message\" data-num=\"' + sms.num + '\">' + sms.sn + ': ' + sms.text + '</span>');});});}};chatJS.insert(document.getElementsByTagName('body')[0]);$('#btnSnd').click(chatJS.send);</script></body></html>";

var posts = [];//Array of objects. use {'sn':'spookyGhost', 'text':'look behind you'},

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
		res.writeHead(200, {"Content-Type": "text/plain"});
		//This needs something more. If it's the first post AND the posts array is empty, serve as first message
		//If it's the first post but posts array is populated serve everything (after req.body.post is pushed to posts array)

		if (req.body.last === '-1')
		{
			if (posts.length === 0)
			{
				res.end(JSON.stringify([{'sn': req.body.sn, 'text':req.body.message, 'num':0}]));
			}
			else
			{
				res.end(getPostsInRange(0));
			}
		}
		else
		{
			res.end(getPostsInRange(parseInt(req.body.last, 10) + 1));
		}
	});

	router.post('/join', function(req, res, next){
		posts.push({'sn': 'MessageBot', 'text':req.body.sn + ' has joined the conversation.'});
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end(getPostsInRange(0));
	});
}));

app.listen(process.env.PORT || 3000);
 //There is no way to implement a real chatroom with http requests, that is broadcasting new posts to everyone without the client machine requesting it
//The simulation will have to be a periodic request sent out.
//Put server announcements in the queue as well
//MessageBot: DBZGoku has joined the conversation