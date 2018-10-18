import * as dgram  from 'dgram'

export default class UdpServer {

  private server;
  private PORT;
  private HOST;
  private news; 
  private clients;
  
  constructor(){

    this.PORT = 33333;
    this.HOST = '127.0.0.1';
    this.server = dgram.createSocket('udp4');
    this.clients = []
    //this.server.setBroadcast(true);
    //this.server.setMulticastTTL(128);
    ////setInterval(broadcastNew, 3000);
    //
    
      this.news = [
        "Borussia Dortmund wins German championship",
        "Tornado warning for the Bay Area",
        "More rain for the weekend",
        "Android tablets take over the world",
        "iPad2 sold out",
        "Nation's rappers down to last two samples"
      ];
  }

  /*
   *
   *
   *
   *
   *
   *
   * */
  public startServer(){

    let self = this;

    //this.server.setBroadcast(true);
    //this.server.setMulticastTTL(128);
    self.server.on('listening', function(){

      const address = self.server.address();
      console.log('server: UDP Server listening on ' + address.address + ":" + address.port);
    
    });

    //this.server.bind(this.PORT, this.HOST);
  
    self.server.bind( self.PORT, self.HOST);


    this.server.on('message', function (message, remote) {
      console.log('server: recive message from ' + remote.address + ':' + remote.port +' - ' + message);
      self.clients.push(remote)
    });


    this.server.on('close', function() {
        console.log('server: Server UDP socket closed : BYE!')
    });
  }

  /*
   *
   *
   *
   *
   *
   *
   * */
  public sendMessage(message){

    //self.client.setBroadcast(true);
    let self = this;

    //let msg = new Buffer(message);
    let msg = new Buffer(self.news[Math.floor(Math.random()*self.news.length)]);
  
    for(let client of self.clients){
      
      console.log(client)
      let msg = new Buffer(message);
      self.server.send(msg, 0, msg.length,  client.port, client.address, function(err, bytes){

        if(err)
          throw err;
        console.log('server: UDP message sent to ' + client.address +':'+ client.port);
        //self.client.close();
        // setTimeout(function(){ self.client.close(); }, 1000);
      });
    
    }

  }

}

  /*var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');



server.bind(PORT, HOST);*/
