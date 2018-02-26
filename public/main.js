//var socket = io.connect('http://localhost:8080', { 'forceNew': true });
var socket = io.connect('http://localhost:8080');

socket.on('messages',(data) =>{
    console.log(data);
    render(data)
});

function render(data) {
	var html = data.map(function (elem, index){
    	return(`<div>
        		 <strong>${elem.author}</strong>:
                 <em>${elem.text}</em>
        </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}



function addMessage(e) {
	var mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', mensaje);
  return false;
}

