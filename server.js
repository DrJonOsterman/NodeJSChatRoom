var connect = require("connect");
var connectRt = require("connect-route");
var app = connect();

var indexHTML = "<!DOCTYPE html><html><head><title>Chat Room</title><style type=\"text/css\">html, body{width: 100%; height: 100%;}.message{display: block; background-color: gray;}</style><script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-1.10.1.min.js\"></script><script type=\"text/javascript\">function apprise(string,args,callback){var default_args={'confirm':false,'verify':false,'input':false,'animate':false,'textOk':'Ok','textCancel':'Cancel','textYes':'Yes','textNo':'No'}if(args){for(var index in default_args){if(typeof args[index]==\"undefined\")args[index]=default_args[index];}}var aHeight=$(document).height();var aWidth=$(document).width();$('body').append('<div class=\"appriseOverlay\" id=\"aOverlay\"></div>');$('.appriseOverlay').css('height',aHeight).css('width',aWidth).fadeIn(100);$('body').append('<div class=\"appriseOuter\"></div>');$('.appriseOuter').append('<div class=\"appriseInner\"></div>');$('.appriseInner').append(string);$('.appriseOuter').css(\"left\",($(window).width()-$('.appriseOuter').width())/2+$(window).scrollLeft()+\"px\");if(args){if(args['animate']){var aniSpeed=args['animate'];if(isNaN(aniSpeed)){aniSpeed=400;}$('.appriseOuter').css('top','-200px').show().animate({top:\"100px\"},aniSpeed);}else{$('.appriseOuter').css('top','100px').fadeIn(200);}}else{$('.appriseOuter').css('top','100px').fadeIn(200);}if(args){if(args['input']){if(typeof(args['input'])=='string'){$('.appriseInner').append('<div class=\"aInput\"><input type=\"text\" class=\"aTextbox\" t=\"aTextbox\" value=\"'+args['input']+'\" /></div>');}else{$('.appriseInner').append('<div class=\"aInput\"><input type=\"text\" class=\"aTextbox\" t=\"aTextbox\" /></div>');}$('.aTextbox').focus();}}$('.appriseInner').append('<div class=\"aButtons\"></div>');if(args){if(args['confirm']||args['input']){$('.aButtons').append('<button value=\"ok\">'+args['textOk']+'</button>');$('.aButtons').append('<button value=\"cancel\">'+args['textCancel']+'</button>');}else if(args['verify']){$('.aButtons').append('<button value=\"ok\">'+args['textYes']+'</button>');$('.aButtons').append('<button value=\"cancel\">'+args['textNo']+'</button>');}else{$('.aButtons').append('<button value=\"ok\">'+args['textOk']+'</button>');}}else{$('.aButtons').append('<button value=\"ok\">Ok</button>');}$(document).keydown(function(e){if($('.appriseOverlay').is(':visible')){if(e.keyCode==13){$('.aButtons > button[value=\"ok\"]').click();}if(e.keyCode==27){$('.aButtons > button[value=\"cancel\"]').click();}}});var aText=$('.aTextbox').val();if(!aText){aText=false;}$('.aTextbox').keyup(function(){aText=$(this).val();});$('.aButtons > button').click(function(){$('.appriseOverlay').remove();$('.appriseOuter').remove();if(callback){var wButton=$(this).attr(\"value\");if(wButton=='ok'){if(args){if(args['input']){callback(aText);}else{callback(true);}}else{callback(true);}}else if(wButton=='cancel'){callback(false);}}});}</script><style type=\"text/css\">.appriseOverlay{position:fixed;top:0;left:0;background:rgba(0,0,0,0.3);display:none;}.appriseOuter{background:#eee;border:1px solid #fff;box-shadow:0 3px 7px #333;-moz-box-shadow:0 3px 7px #333;-webkit-box-shadow:0 3px 7px #333;-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;-khtml-border-radius:4px;z-index:99999999;min-width:200px;min-height:50px;max-width:75%;position:fixed;display:none;}.appriseInner{color:#333;text-shadow:0 1px 0 #fff;padding:20px;}.appriseInner button{border:1px solid #bbb;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-khtml-border-radius:3px;background:0;color:#232d3d;font-size:12px;font-weight:700;text-shadow:0 1px 0 #fff;cursor:pointer;box-shadow:0 1px 2px #ccc;-moz-box-shadow:0 1px 2px #ccc;-webkit-box-shadow:0 1px 2px #ccc;margin:0 3px;padding:4px 10px;}.appriseInner button:hover{color:#d85054;}.aButtons,.aInput{text-align:center;margin:20px 10px 0;}.aTextbox{border:1px solid #aaa;-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;-khtml-border-radius:4px;box-shadow:0 1px 0 #fff;-moz-box-shadow:0 1px 0 #fff;-webkit-box-shadow:0 1px 0 #fff;width:180px;font-size:12px;font-weight:700;padding:5px 10px;}</style></head><body><script type=\"text/javascript\">var chatJS= {insert: function(contextElem){var txt = document.createElement('div');txt.setAttribute('id', 'txtArea');txt.style.width = '100%';txt.style.height = '75%';var tb = document.createElement('input');tb.setAttribute('id', 'txtMssg');tb.setAttribute('type', 'text');tb.style.width = '80%';tb.style.height = '20%';tb.style.verticalAlign = 'top';var bt = document.createElement('button');bt.setAttribute('id', 'btnSnd');bt.innerHTML = 'SEND';bt.style.width = '19%';bt.style.height = '20%';contextElem.appendChild(txt);contextElem.appendChild(tb);contextElem.appendChild(bt);},register: function(userName){$.post('/join', {sn:userName}).done(this.updateWindow);},send: function(){var mssgNum = ($('#txtArea').is(':empty')) ? -1 : parseInt($('#txtArea span:last').attr('data-num'), 10);$.post('/post', {sn:'Human#1', message : $('#txtMssg').val(), last:mssgNum}).done(this.updateWindow);},updateWindow: function(chatData){console.log('getting chat data'); console.log(chatData);JSON.parse(chatData).forEach(function(sms){$('#txtArea').append('<span class=\"message\" data-num=\"' + sms.num + '\">' + sms.sn + ': ' + sms.text + '</span>');});}};function begin(){apprise('Please choose a username.', {'input':true}, function(input){if (input === false){begin();}else{ chatJS.insert(document.getElementsByTagName('body')[0]); //insert code$('#btnSnd').click(chatJS.send);//set up click event handlerchatJS.register(input);}});}begin();</script></body></html>";


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