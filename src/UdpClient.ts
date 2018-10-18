import * as dgram  from 'dgram'

export default class UdpClient{

  private client;
  private PORT;
  private HOST;

  constructor(){

    this.PORT = 33333;
    this.HOST = '127.0.0.1';
  }

  public startClient(){

    //this.server.setBroadcast(true);
    //this.server.setMulticastTTL(128);
    this.client = dgram.createSocket('udp4');


  
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
