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

const clientInstance = new UdpClient();
clientInstance.sendMessage('hellow world thought UDP!');
//clientInstance.sendMessage('hellow world thought UDP new message!');




