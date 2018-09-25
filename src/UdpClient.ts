import * as dgram  from 'dgram'

export default class UdpClient{

  private client;
  private PORT;
  private HOST;

  constructor(){

    this.PORT = 33333;
    this.HOST = '127.0.0.1';
  }
  /*
   *
   *
   *
   *
   *
   *
   * */
  sendMessage(message){

    const self = this;
    this.client = dgram.createSocket('udp4');
    let msg = new Buffer(message);
    this.client.send(msg, 0, msg.length,  self.PORT, self.HOST, function(err, bytes){

      if(err)
        throw err;
      console.log('UDP message sent to ' + self.HOST +':'+ self.PORT);
      self.client.close();
    
    })
  
  }

}
