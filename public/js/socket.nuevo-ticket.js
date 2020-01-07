// Comando para establecer la conexión

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al SERVIDOR >>', )
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor', )
});

socket.on('estadoActual', function (resp) {
    console.log('resp >>', resp)
    label.text( resp.actual );
});

$('button').on('click', function () {
    
    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        label.text(siguienteTicket);
    })
});



