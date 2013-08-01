var connect = require("connect");
var connectRt = require("connect-route");
var app = connect();

var indexHTML = "<!DOCTYPE html>\n<html>\n<head><title>Chat Room</title>\n<style type=\"text/css\">\n\thtml, body{width: 100%; height: 100%;}\n\t.message{display: block; background-color: #E6E6FA;}\n</style>\n<!-- <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-1.10.1.min.js\"></script>-->\n<script type=\"text/javascript\" src=\"http://localhost/MemoryGamma/lib/jquery-1.8.2.min.js\"></script>\n<script type=\"text/javascript\">function apprise(string,args,callback)\n{var default_args={'confirm':false,'verify':false,'input':false,'animate':false,'textOk':'Ok','textCancel':'Cancel','textYes':'Yes','textNo':'No'}\nif(args)\n{for(var index in default_args)\n{if(typeof args[index]==\"undefined\")args[index]=default_args[index];}}\nvar aHeight=$(document).height();var aWidth=$(document).width();$('body').append('<div class=\"appriseOverlay\" id=\"aOverlay\"></div>');$('.appriseOverlay').css('height',aHeight).css('width',aWidth).fadeIn(100);$('body').append('<div class=\"appriseOuter\"></div>');$('.appriseOuter').append('<div class=\"appriseInner\"></div>');$('.appriseInner').append(string);$('.appriseOuter').css(\"left\",($(window).width()-$('.appriseOuter').width())/2+$(window).scrollLeft()+\"px\");if(args)\n{if(args['animate'])\n{var aniSpeed=args['animate'];if(isNaN(aniSpeed)){aniSpeed=400;}\n$('.appriseOuter').css('top','-200px').show().animate({top:\"100px\"},aniSpeed);}\nelse\n{$('.appriseOuter').css('top','100px').fadeIn(200);}}\nelse\n{$('.appriseOuter').css('top','100px').fadeIn(200);}\nif(args)\n{if(args['input'])\n{if(typeof(args['input'])=='string')\n{$('.appriseInner').append('<div class=\"aInput\"><input type=\"text\" class=\"aTextbox\" t=\"aTextbox\" value=\"'+args['input']+'\" /></div>');}\nelse\n{$('.appriseInner').append('<div class=\"aInput\"><input type=\"text\" class=\"aTextbox\" t=\"aTextbox\" /></div>');}\n$('.aTextbox').focus();}}\n$('.appriseInner').append('<div class=\"aButtons\"></div>');if(args)\n{if(args['confirm']||args['input'])\n{$('.aButtons').append('<button value=\"ok\">'+args['textOk']+'</button>');$('.aButtons').append('<button value=\"cancel\">'+args['textCancel']+'</button>');}\nelse if(args['verify'])\n{$('.aButtons').append('<button value=\"ok\">'+args['textYes']+'</button>');$('.aButtons').append('<button value=\"cancel\">'+args['textNo']+'</button>');}\nelse\n{$('.aButtons').append('<button value=\"ok\">'+args['textOk']+'</button>');}}\nelse\n{$('.aButtons').append('<button value=\"ok\">Ok</button>');}\n$(document).keydown(function(e)\n{if($('.appriseOverlay').is(':visible'))\n{if(e.keyCode==13)\n{$('.aButtons > button[value=\"ok\"]').click();}\nif(e.keyCode==27)\n{$('.aButtons > button[value=\"cancel\"]').click();}}});var aText=$('.aTextbox').val();if(!aText){aText=false;}\n$('.aTextbox').keyup(function()\n{aText=$(this).val();});$('.aButtons > button').click(function()\n{$('.appriseOverlay').remove();$('.appriseOuter').remove();if(callback)\n{var wButton=$(this).attr(\"value\");if(wButton=='ok')\n{if(args)\n{if(args['input'])\n{callback(aText);}\nelse\n{callback(true);}}\nelse\n{callback(true);}}\nelse if(wButton=='cancel')\n{callback(false);}}});}</script>\n<style type=\"text/css\">.appriseOverlay{position:fixed;top:0;left:0;background:rgba(0,0,0,0.3);display:none;}.appriseOuter{background:#eee;border:1px solid #fff;box-shadow:0 3px 7px #333;-moz-box-shadow:0 3px 7px #333;-webkit-box-shadow:0 3px 7px #333;-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;-khtml-border-radius:4px;z-index:99999999;min-width:200px;min-height:50px;max-width:75%;position:fixed;display:none;}.appriseInner{color:#333;text-shadow:0 1px 0 #fff;padding:20px;}.appriseInner button{border:1px solid #bbb;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-khtml-border-radius:3px;background:0;color:#232d3d;font-size:12px;font-weight:700;text-shadow:0 1px 0 #fff;cursor:pointer;box-shadow:0 1px 2px #ccc;-moz-box-shadow:0 1px 2px #ccc;-webkit-box-shadow:0 1px 2px #ccc;margin:0 3px;padding:4px 10px;}.appriseInner button:hover{color:#d85054;}.aButtons,.aInput{text-align:center;margin:20px 10px 0;}.aTextbox{border:1px solid #aaa;-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;-khtml-border-radius:4px;box-shadow:0 1px 0 #fff;-moz-box-shadow:0 1px 0 #fff;-webkit-box-shadow:0 1px 0 #fff;width:180px;font-size:12px;font-weight:700;padding:5px 10px;}</style>\n</head>\n<body>\n\n<script type=\"text/javascript\">\nvar chatJS= {\n\tuserName: null,\n\tisLoopRunning: false,\n\trequestInterval: 5000,\n\tgetLastMssgNum: function(){\n\t\treturn ($('#txtArea').is(':empty')) ? -1 : parseInt($('#txtArea span:last').attr('data-num'), 10);\n\t},\n\tinsert: function(contextElem){\n\t\tvar txt = document.createElement('div');\n\t\ttxt.setAttribute('id', 'txtArea');\n\t\ttxt.style.width = '100%';\n\t\ttxt.style.height = '75%';\n\t\tvar tb = document.createElement('input');\n\t\ttb.setAttribute('id', 'txtMssg');\n\t\ttb.setAttribute('type', 'text');\n\t\ttb.style.width = '80%';\n\t\ttb.style.height = '20%';\n\t\ttb.style.verticalAlign = 'top';\n\t\tvar bt = document.createElement('button');\n\t\tbt.setAttribute('id', 'btnSnd');\n\t\tbt.innerHTML = 'SEND';\n\t\tbt.style.width = '19%';\n\t\tbt.style.height = '20%';\n\t\tcontextElem.appendChild(txt);\n\t\tcontextElem.appendChild(tb);\n\t\tcontextElem.appendChild(bt);\n\t},\n\tregister: function(){\n\t\t$.post('/join', {sn:this.userName}).done(this.updateWindow);\n\t},\n\tsend: function(){\n\t\t$.post('/post', {sn:chatJS.userName, message:$('#txtMssg').val(), last:chatJS.getLastMssgNum()}).done(chatJS.updateWindow);\n\t\t$('#txtMssg').val('');\n\t},\n\tupdateWindow: function(chatData){\n\t\t/*console.log('getting chat data');*/console.log(chatData);\n\t\tif (chatData === 'No new posts')\n\t\t{\n\t\t\treturn;\n\t\t}\n\t\telse\n\t\t{\n\t\t\tJSON.parse(chatData).forEach(function(sms){\n\t\t\t\t$('#txtArea').append('<span class=\"message\" data-num=\"' + sms.num + '\">' + sms.sn + ': ' + sms.text + '</span>');\n\t\t\t});\n\t\t\tif(chatJS.isLoopRunning === false)\n\t\t\t{\n\t\t\t\tchatJS.requestLoop();\n\t\t\t}\n\t\t}\n\t},\n\trequestLoop: function(){\n\t\tconsole.log('running the little loop');\n\t\tchatJS.isLoopRunning = true;\n\t\tfunction littleLoop(){\n\t\t\tconsole.log('in the loop body');\n\t\t\t$.post('/update', {sn:chatJS.userName, message:$('#txtMssg').val(), last:chatJS.getLastMssgNum()}).done(chatJS.updateWindow);\n\t\t}\n\t\tsetInterval(littleLoop, chatJS.requestInterval);\n\t}\n};\n\nfunction begin(){\n\tapprise('Please choose a username.', {'input':true}, function(input){\n\t\tif (input === false)\n\t\t{\n\t\t\tbegin();\n\t\t}\n\t\telse\n\t\t{ \n\t\t\tchatJS.insert(document.getElementsByTagName('body')[0]); /*insert code*/\n\t\t\t$('#btnSnd').click(chatJS.send);/*set up click event handler*/\n\t\t\tchatJS.userName = input;\n\t\t\tchatJS.register();\n\t\t}\n\t});\n}\n\nbegin();\n\n\n\n\n\n</script>\n</body>\n</html>";

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

	router.post('/update', function(req, res, next){
		res.writeHead(200, {"Content-Type": "text/html"});
		console.log('Last is ' + req.body.last);
		console.log('Array length is ' + posts.length);
		if (parseInt(req.body.last, 10) === posts.length - 1)
		{
			res.end('No new posts')
		}
		else
		{
			res.end(getPostsInRange(parseInt(req.body.last, 10) + 1));
		}
	});

	router.post('/post', function(req, res, next){
		posts.push({'sn': req.body.sn, 'text':req.body.message});
		res.writeHead(200, {"Content-Type": "text/plain"});
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
//WEBSOCKETS, look into that