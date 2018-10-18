
import * as net from 'net';


export default class TcpServer{
  
  private clients : Array<any>;
  private server;
  private PORT : number;
  private HOST : string;
  private SERVER_MAX_CONNECTIONS : number
  /*
   *  
   *  class constructor
   *
   * */
  constructor(){
    
    const self = this;
    self.clients = [];
    self.PORT = 3333;
    self.HOST = '127.0.0.1'
    self.SERVER_MAX_CONNECTIONS = 10;
    
    self.server = net.createServer(function(socket){
      self.onClientConnected(socket);
    });

    self.server.maxConnections = self.SERVER_MAX_CONNECTIONS;
    self.StartServer();
  }

  /*
   *
   * used to initialize the TPC
   *
   *
   * @return { void } 
   *
   * */
  public StartServer() : void{
  
    const self = this;
    //make the server listen on certain port and host
    self.server.listen(self.PORT, self.HOST);
    //start the server events  catchers
    self.onServerEvents();

    // emitted when new client connects
    self.server.on('connection',function(socket){

      //console.log('Buffer size : ' + socket.bufferSize);

      // used when receive data from this socket client
      socket.on('data', function(data){
        const bread = socket.bytesRead;
        const bwrite = socket.bytesWritten;
        //console.log('Bytes read : ' + bread);
        //console.log('Bytes written : ' + bwrite);
        console.log('client said : ' + data);

        //echo data
      }); // end onData
  
      // start the socket events catchers
      self.onSocketEvents(socket);
    }); //end event onConnection of each client
  }

  /*
   * send a message to given socket (client)
   *  
   *  @param { string } message
   *  @param { net.Socket } socket
   *
   *  @ return { void }
   * */
  public sendMessage(message : string, socket : net.Socket) : void{
    
    //here we validated the message was sent succefully
    const is_kernel_buffer_full = socket.write(message);
    if(is_kernel_buffer_full){
      console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
    }else{
      socket.pause();
    }
  }

  /*
   * broadcast a message to all connected sockets (clients)
   *  
   *  @param { string } message
   *  @param { net.Socket } sender
   *
   *  @ return { void }
   * */
  public broadcast(message : string, sender : net.Socket = this.server) : void {
    
    const self = this;
    self.clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      self.sendMessage(message, client);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }


  /*
   * give some information on new socket connected
   *  
   *  @param { net.Socket } sender
   *
   *  @ return { void }
   * */
  private onClientConnected(socket : net.Socket) : void{
    
      const self = this;
      
      //send a message when socket connected
      self.sendMessage('Echo Server \r\n', socket);
      socket.pipe(socket);

    //console.log('---------server details -----------------');
      const lport = socket.localPort;
      const laddr = socket.localAddress;
      //console.log('Server is listening at LOCAL port :' + lport);
      //console.log('Server LOCAL ip :' + laddr);
      //console.log('server: send package');

      console.log('------------remote client info --------------');

      const rport = socket.remotePort;
      const raddr = socket.remoteAddress;
      const rfamily = socket.remoteFamily;

      console.log('REMOTE Socket is listening at port :' + rport);
      console.log('REMOTE Socket ip :' + raddr);
      console.log('REMOTE Socket is IP4/IP6 : ' + rfamily);

      console.log('--------------------------------------------')
    //var no_of_connections =  server.getConnections(); // sychronous version
    self.server.getConnections(function(error,count){
      console.log('Number of concurrent connections to the server : ' + count);
      console.log('--------------------------------------------')
    });

    //set the socket encoding 
    socket.setEncoding('utf8');

    // called after timeout -> same as socket.on('timeout')
    // it just tells that soket timed out => its ur job to end or destroy the socket.
    // socket.end() vs socket.destroy() => end allows us to send final data and allows some i/o activity to finish before destroying the socket
    // whereas destroy kills the socket immediately irrespective of whether any i/o operation is goin on or not...force destry takes place
    socket.setTimeout(800000,function(){
      console.log('Socket timed out');
    });
  }


  /*
   * start events handlers for server
   *  
   *  @ return { void }
   * */
  private onServerEvents(){
  
    const self = this;
    // emits when any error occurs -> calls closed event immediately after this.
    self.server.on('error',function(error){
      console.log('Error: ' + error);
    });

    //emits when server is bound with server.listen
    self.server.on('listening',function(){
      const address = self.server.address();
      const port = address.port;
      const family = address.family;
      const ipaddr = address.address;
      console.log('Server is listening at port: ' + port);
      console.log('Server ip :' + ipaddr);
      console.log('Server is IP4/IP6 : ' + family);
    });
  
    // emits when server is closed
    self.server.on('close', function(){
      console.log('server: connection closed ');
    });
  }

  /*
   * start events handlers on new socket connected
   *  
   *  @param { net.Socket } sender
   *
   *  @ return { void }
   * */
  private onSocketEvents(socket : net.Socket) : void {
  
    socket.on('drain',function(){
      console.log('write buffer is empty now .. u can resume the writable stream');
      socket.resume();
    });

    socket.on('error',function(error){
      console.log('Error : ' + error);
    });

    socket.on('timeout',function(){
      console.log('Socket timed out !');
      socket.end('Timed out!');
      // can call socket.destroy() here too.
    });

    socket.on('end',function(data){
      console.log('Socket ended from other end!');
      console.log('End data : ' + data);
      //remove socket from array
      //self.clients.splice(self.clients.indexOf(socket), 1);
      //self.broadcast('client leave');
    });

    socket.on('close',function(error){
      var bread = socket.bytesRead;
      var bwrite = socket.bytesWritten;
      console.log('Bytes read : ' + bread);
      console.log('Bytes written : ' + bwrite);
      console.log('Socket closed!');
      if(error){
        console.log('Socket was closed coz of transmission error');
      }
    }); 
  }

}
