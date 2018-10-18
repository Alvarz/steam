import Steam from './Steam';
import UdpServer from './UdpServer'

/**
 * Bearded Logger
 *
 * @package  Bearded 
 * @author   Carlos Alvarez <beardedframework@gmail.com>
 */

let UdpServerInstance = new UdpServer(true);


setTimeout(function(){ UdpServerInstance.sendMessageMulticast(); }, 4000);

