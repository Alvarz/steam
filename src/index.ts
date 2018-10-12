import Steam from './Steam';
import UdpServer from './UdpServer'
import UdpClient from './UdpClient'
/**
 * Bearded Logger
 *
 * @package  Bearded 
 * @author   Carlos Alvarez <beardedframework@gmail.com>
 */


//module export default Steam;


/*const steam = new Steam();

steam.on('begin', () => console.log('About to execute'));
steam.on('end', () => console.log('Done with execute'));

steam.execute(() => console.log('*** Executing task ***'));*/

let UdpServerInstance = new UdpServer();
UdpServerInstance.startServer();
UdpServerInstance.listen();


let UdpClientInstance = new UdpClient();
UdpClientInstance.startClient();
UdpClientInstance.listen();

UdpServerInstance.sendMessage('broadcasting!');
//const clientInstance = new UdpClient();
//clientInstance.sendMessage('hellow world thought UDP!');
//UdpClient.sendMessage('hellow world thought UDP new message!');
UdpClientInstance.sendMessage('hellow world thought UDP!');

setTimeout(function(){ UdpClientInstance.sendMessage('hellow world thought UDP! second');; }, 5000);


//setTimeout(function(){ UdpClientInstance.closeSocketConnection(); }, 10000);




