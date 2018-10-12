import * as dgram  from 'dgram'

export default class UdpClient{

  private static client;
  private static PORT;
  private static HOST;

  constructor(){

    this.PORT = 33333;
    this.HOST = '127.0.0.1';
  }

  public startClient(){

    //this.server.setBroadcast(true);
    //this.server.setMulticastTTL(128);
    this.client = dgram.createSocket('udp4');
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
    

    const self = this;
    self.client.on('listening', function () {
      let address = self.client.address();
      console.log('client: UDP Client listening on ' + address.address + ":" + address.port);
      self.client.setBroadcast(true)
      self.client.setMulticastTTL(128); 
      self.client.addMembership('224.1.1.1', self.HOST);
    });
  
    self.client.on('message', function (message, remote) {   
      console.log('A: Epic Command Received. Preparing Relay.');
      console.log('B: From: ' + remote.address + ':' + remote.port +' - ' + message);
    });


    self.client.on('close', function() {
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
