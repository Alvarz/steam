import * as net from 'net';


export default class TpcClient{
  
  private client : net.Socket;
  private SERVER_PORT : number;
  private SERVER_HOST : string;

  /*
   *
   * class constructor
   *
   * */
  constructor(){
    this.SERVER_PORT = 3333;
    this.SERVER_HOST = '127.0.0.1'

    this.StartClient();
  }

  /*
   * initialize the client
   *
   * @return { void }
   *
   * */
  public StartClient() : void{

    //this.client = new net.Socket();
    const self = this;
    self.client = net.connect(self.SERVER_PORT, self.SERVER_HOST);

    self.client.on('data',function(data){
  
       console.log('server said:' + data);
    });
  }

  /*
   * send a message to the server
   *
   * @param { string } message
   *
   * @return { void } 
   *
   * */
  public sendMessage(message : string) : void{
  
    const is_kernel_buffer_full = this.client.write(message  + ' \r\n');
    if(is_kernel_buffer_full){
      console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
    }else{
      this.client.pause();
    }
  }

  /*
   * start events handlers on client connected to server
   *
   * @return { void } 
   *
   * */
  private onConnection() : void{
    
    const self = this;

    self.client.on('connect',function(){
      console.log('Client: connection established with server');

      console.log('---------client details -----------------');
      var address = self.client.address();
      var port = address.port;
      var family = address.family;
      var ipaddr = address.address;
      console.log('Client is listening at port: ' + port);
      console.log('Client ip :' + ipaddr);
      console.log('Client is IP4/IP6 : ' + family);

      // writing data to server
        self.sendMessage('hello server');
    });
  
    //set the encoding
    self.client.setEncoding('utf8');
  
    self.client.on('close', function(){
      console.log('client: connection closed ');
    });

    self.client.on('drain',function(){
      console.log('write buffer is empty now .. u can resume the writable stream');
      self.client.resume();
    });
  }


}
