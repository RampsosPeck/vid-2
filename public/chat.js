//io esta accecible a todo el html
//io()
//io('http://midominio.com')

const socket = io()

// DOM elements 
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

//Cada vez que haga click en tl boton send
btn.addEventListener('click', function(){
  
    console.log({
        username: username.value,
        message: message.value
    });
    //Se activara la funcion emit que envia datos al servidor
    socket.emit('mimensaje', {
        username: username.value,
        message: message.value
    });
    message.value = '';
});

//Cuando esta escribiendo el otro popdra ver que lo esta haciendo
message.addEventListener('keypress', function(){
    //Le envio cuando alguien esta escribiendo el nombre del usuario
    socket.emit('typing', username.value)
});

//Aqui recibimos lo que el servidor nos envia y lo ponemos en el DOM
socket.on('smsserver', function(data){
    actions.innerHTML = '';
    output.innerHTML += `<p> 
        <strong>${data.username}</strong>: ${data.message}
    
    </p>`  
});

//Aqui escuchamos el typing del server
socket.on('tyserver', function(data) {
    //el el id actions en su contenido HTML
    actions.innerHTML = `<p> <em>${data} esta escribiendo...</em>  </p>`
});




