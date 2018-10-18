import * as dgram  from 'dgram'

export default class UdpServer {

  private server;
  private PORT : number;
  private SRC_PORT : number;
  private MULTICAST_ADDR : string;
  private HOST : string;
  private news : Array<string>; 
  private clients : Array<any>;
  /*
   *
   *  class constructor
   *
   **/
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
    //test messages to send
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
   * start the server
   *
   * @param { boolean } isMulticast
   *
   * @return { void }
   * */
  public startServer(isMulticast : boolean = false) : void {

    let self = this;
    //this.server.setBroadcast(true);
    //this.server.setMulticastTTL(128);

    //this.server.bind(this.PORT, this.HOST);
  
    self.onServerStart();

    if(isMulticast){
      self.server.bind(self.SRC_PORT, self.HOST, function(){
        self.server.setMulticastTTL(128)
      })
    }
    else{
      self.server.bind( self.PORT, self.HOST);
    }
  
    //emits when a new messages was received
    self.server.on('message', function (message, remote) {
      console.log('server: recive message from ' + remote.address + ':' + remote.port +' - ' + message);
      self.clients.push(remote)
    });
  }

  /*
   *
   * used to send muticast messages to clients
   *
   * @return { void }
   * */
  public sendMessageMulticast() : void {

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
   * used to send messages to client
   *
   * @return { void }
   * */
  public sendMessage(message = ''){

    //self.client.setBroadcast(true);
    let self = this;

    //let msg = new Buffer(message);
    let msg = new Buffer(self.news[Math.floor(Math.random()*self.news.length)]);
  
    for(let client of self.clients){
      
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

  /*
   * launch events handlers on server start
   *
   * @return { void }
   * */
  private onServerStart() : void {
    
    const self = this;
    self.server.on('listening', function(){

      const address = self.server.address();
      console.log('server: UDP Server listening on ' + address.address + ":" + address.port);
    
    });
    
    self.server.on('close', function() {
        console.log('server: Server UDP socket closed : BYE!')
    });
  }

}
