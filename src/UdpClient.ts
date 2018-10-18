import * as dgram  from 'dgram'

export default class UdpClient{

  private client;
  private PORT;
  private HOST;
  private MULTICAST_ADDR;

  constructor(){

    this.PORT = 6024;
    this.HOST = '127.0.0.1';
    //this.MULTICAST_ADDR = '239.255.255.250'
    this.MULTICAST_ADDR = '224.0.0.114'
  }

  public startClient(){
  
    let self = this;
    //this.server.setBroadcast(true);
    //this.server.setMulticastTTL(128);
    this.client = dgram.createSocket({ type: 'udp4', reuseAddr: true});

    
    this.client.on('listening', function(){

      const address = self.client.address();
        console.log('client: UDP client listening on ' + address.address + ":" + address.port);
      
    });

    this.client.bind(self.PORT, function(){

      self.client.addMembership(self.MULTICAST_ADDR, self.HOST);
      console.log('client: added memebership to ' + self.MULTICAST_ADDR + ' port ' + self.PORT)
    
    })

  
    this.client.on('message', function (message, remote) {   
      console.log('A: Epic Command Received. Preparing Relay.');
      console.log('B: From: ' + remote.address + ':' + remote.port +' - ' + message);
    });


    this.client.on('close', function() {
        console.log('client: Client UDP socket closed : BYE!')
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
    const self = this;
    let msg = new Buffer(message);
    self.client.send(msg, 0, msg.length,  self.PORT, self.HOST, function(err, bytes){

      if(err)
        throw err;
      console.log('client: UDP message sent to ' + self.HOST +':'+ self.PORT);
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
  public closeSocketConnection(){
      const self = this;
      setTimeout(function(){ self.client.close(); }, 1000);
  }

}
