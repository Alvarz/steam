import * as dgram  from 'dgram'

export default class UdpServer {

  private server;
  private PORT;
  private HOST;
  private news; 

  constructor(){

    this.PORT = 33333;
    this.HOST = '127.0.0.1';
    this.server = dgram.createSocket('udp4');
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

    //this.server.setBroadcast(true);
    //this.server.setMulticastTTL(128);
    let self = this;
    self.server.on('listening', function(){

      const address = self.server.address();
      console.log('server: UDP Server listening on ' + address.address + ":" + address.port);
    
    });

    //this.server.bind(this.PORT, this.HOST);
  
    self.server.bind( self.PORT, self.HOST, function() {
      self.server.setBroadcast(true)
      self.server.setMulticastTTL(128);
      self.server.addMembership('224.1.1.1'); 
      //setInterval(self.broadcastNew, 3000);
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

    self.server.send(msg, 0, msg.length,  self.PORT, self.HOST, function(err, bytes){

      if(err)
        throw err;
      console.log('server: UDP message sent to ' + self.HOST +':'+ self.PORT);
      //self.client.close();
      // setTimeout(function(){ self.client.close(); }, 1000);
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
  private broadcastNew() {

    //const self = this;

    let self = this;

      let message = new Buffer(self.news[Math.floor(Math.random()*self.news.length)]);
      this.server.send(message, 0, message.length, this.PORT, this.HOST);
      console.log("server: Sent " + message + " to the wire...");
  }

  /*
   *
   *
   *
   *
   *
   *
   * */
  public listen(){

    this.server.on('message', function (message, remote) {
      console.log('server: recive message from ' + remote.address + ':' + remote.port +' - ' + message);
    });


    this.server.on('close', function() {
        console.log('server: Server UDP socket closed : BYE!')
    });
  
  
  }



}

  /*var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');



server.bind(PORT, HOST);*/
