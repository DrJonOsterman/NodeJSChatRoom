var chatJS= {

insert: function(contextElem){

	var txt = document.createElement('textarea');
	txt.style.width = '100%';
	txt.style.height = '75%';

	var tb = document.createElement('input');
	tb.setAttribute('type', 'text');
	tb.style.width = '80%';
	tb.style.height = '20%';
	tb.style.verticalAlign = 'top';

	var bt = document.createElement('button');
	bt.innerHTML = 'SEND';
	bt.style.width = '19%';
	bt.style.height = '20%';

	contextElem.appendChild(txt);
	contextElem.appendChild(tb);
	contextElem.appendChild(bt);
}


send: function(){
	$.post('server.js', {message : $('$el').val()}).done(this.receive);
}

receive: function(data){
	console.log(data);
}
chatJS.insert(document.getElementsByTagName('body')[0]);