import Steam from './Steam';
import UdpServer from './udp/UdpServer'
import TcpServer from './tcp/TcpServer'

/**
 * Bearded Logger
 *
 * @package  Bearded 
 * @author   Carlos Alvarez <beardedframework@gmail.com>
 */

//let UdpServerInstance = new UdpServer(true);
//setTimeout(function(){ UdpServerInstance.sendMessageMulticast(); }, 4000);

const TcpServerInstance = new TcpServer();
