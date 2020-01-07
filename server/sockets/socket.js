const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        
        console.log('Cuál es el siguiente ticket  >>', siguiente)
        callback(siguiente);
    });
    
    //Emitir un Evento 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })
    
    client.on('atenderTicket', (data, callback) => {
        
        if (!data.escritorio) {
            return callback ({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }
        
        let atenderTicket = ticketControl.atenderTicket( data.escritorio );
        
        callback (atenderTicket);
        
        //Actualizar / Notificar cambios en los últimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
        
    })

});