import * as dgram  from 'dgram'

export default class UdpServer {

  private server;
  private PORT;
  private SRC_PORT;
  private MULTICAST_ADDR;
  private HOST;
  private news; 
  private clients;
  
  constructor(isMulticast = false){

    this.PORT = 6024;
    this.SRC_PORT = 6025;
    this.HOST = '127.0.0.1';
    this.server = dgram.createSocket('udp4');
    this.MULTICAST_ADDR = '224.0.0.114'
    this.clients = []
    //this.server.setBroadcast(true);
    //this.server.setMulticastTTL(128);
    ////setInterval(broadcastNew, 3000);
    //
    
      this.news = [
        "event|newUser",
        "event|newtransaction",
        "event|deletedUser",
        "event|UpdatedUser",
        "event|removedUser",
        "event|getUser",
      ];

    this.startServer(isMulticast);
  }


  /*
   *
   *
   *
   *
   *
   *
   * */
  public startServer(isMulticast = false){

    let self = this;

    //this.server.setBroadcast(true);
    //this.server.setMulticastTTL(128);
    self.server.on('listening', function(){

      const address = self.server.address();
      console.log('server: UDP Server listening on ' + address.address + ":" + address.port);
    
    });

    //this.server.bind(this.PORT, this.HOST);

    if(isMulticast){
    
      self.server.bind(self.SRC_PORT, self.HOST, function(){
        
        self.server.setMulticastTTL(128)
      })
    
    }
    else{
    
      self.server.bind( self.PORT, self.HOST);
    }


    this.server.on('message', function (message, remote) {
      console.log('server: recive message from ' + remote.address + ':' + remote.port +' - ' + message);
      self.clients.push(remote)
    });


    this.server.on('close', function() {
        console.log('server: Server UDP socket closed : BYE!')
    });
  }

  public sendMessageMulticast(){

    //self.client.setBroadcast(true);
    let self = this;

    setInterval(function(){

    //let msg = new Buffer(message);
  
    let msg = new Buffer(self.news[Math.floor(Math.random()*self.news.length)]);
    self.server.send(msg, 0, msg.length,  self.PORT, self.MULTICAST_ADDR, function(err, bytes){

        if(err)
          throw err;

        console.log('server: UDP message sent to ' + self.MULTICAST_ADDR +' port '+ self.PORT);
        //self.client.close();
        // setTimeout(function(){ self.client.close(); }, 1000);
    });

    }, 4000)
    

  }
  /*
   *
   *
   *
   *
   *
   *
   * */
  public sendMessage(message = ''){

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
