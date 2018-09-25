import * as dgram  from 'dgram'

export default class UdpClient{

  private static client;
  private static PORT;
  private static HOST;

  /* constructor(){

    this.PORT = 33333;
    this.HOST = '127.0.0.1';
  }*/
  /*
   *
   *
   *
   *
   *
   *
   * */
  public static sendMessage(message){

    const self = UdpClient;
    self.PORT = 33333;
    self.HOST = '127.0.0.1';
    self.client = dgram.createSocket('udp4');
    let msg = new Buffer(message);
    self.client.send(msg, 0, msg.length,  self.PORT, self.HOST, function(err, bytes){

      if(err)
        throw err;
      console.log('UDP message sent to ' + self.HOST +':'+ self.PORT);
      //self.client.close();
      setTimeout(function(){ self.client.close(); }, 1000);
    })

    self.client.on('close', function() {
        console.log('Client UDP socket closed : BYE!')
    });
  
  }

}
