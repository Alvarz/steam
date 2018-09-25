import * as dgram  from 'dgram'

export default class UdpServer {

  private server;
  private PORT;
  private HOST;

  constructor(){

    this.PORT = 33333;
    this.HOST = '127.0.0.1';
    this.server = dgram.createSocket('udp4');
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
    this.server.on('listening', function(){

      const address = self.server.address();
      console.log('UDP Server listening on ' + address.address + ":" + address.port);
    
    });

    this.server.bind(this.PORT, this.HOST);

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
      console.log(remote.address + ':' + remote.port +' - ' + message);
    });
  
  }
  

}

  /*var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');



server.bind(PORT, HOST);*/
