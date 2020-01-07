const fs = require('fs');

class Ticket {
    
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
    
}

class TicketControl {
    
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        
        let data = require('../data/data.json');
     //   let data = JSON.parse(fs.readFileSync('server/data/data.json'));
        
        if (data.hoy === this.hoy) {
            
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
            
        } else {
            this.reiniciarConteo()
        }
    }
    
    siguiente() {
        
        this.ultimo += 1;
        
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        
        this.grabarArchivo();
        
        return `Ticket ${ this.ultimo }`
        
    }
    
    getUltimoTicket () {
        return `Ticket ${ this.ultimo }`
    }
    
    getUltimos4 () {
        return this.ultimos4
    }
    
    atenderTicket (escritorio) {
        
        // Verifico que hayan tickets pendientes de atender
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
    
        //Extraigo  el nro para romper la relación que tiene JS con que todos los objetos son pasados por Referencia
        let numeroTicket = this.tickets[0].numero;   
        
        //Elimino la primera posición del arreglo
        this.tickets.shift();
        
        //Creo un nuevo ticket que es el que voy a atender que tiene el nro de ticket y escritorio a ser atendido
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        
        //Agrego el ticket creado al inicio del Arreglo
        console.log('atenderTicket >>', atenderTicket)
        this.ultimos4.unshift( atenderTicket );
        
        //Verifico que solamente existan 4 tickets en ese array
        if ( this.ultimos4.length > 4 ) {
            this.ultimos4.splice(-1, 1); // Borra el último elemento
        }
        
        console.log('últimos 4 >>', this.ultimos4);
        
        this.grabarArchivo();
        
        //Regreso cuál es el ticket que quiero atender
        return atenderTicket;
    }
    
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }
    
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
    
        let jsonDataString = JSON.stringify(jsonData);
    
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
    
}

module.exports = {
    TicketControl,
};