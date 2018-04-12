var form = document.getElementsByTagName('form');
var socket = io();

form[0].addEventListener('submit', function(e){
	var message = document.getElementById('m');
	e.preventDefault();
	socket.emit('chat message', message.value);
	message.value = '';
});

socket.on('chat message', function(msg){
	var messages = document.getElementById('messages');
	var li = document.createElement('li');
	var textnode = document.createTextNode(msg);         // Create a text node
	li.appendChild(textnode);
	messages.appendChild(li);
});
