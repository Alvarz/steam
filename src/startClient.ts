import Steam from './Steam';
import UdpClient from './UdpClient'

/**
 * Bearded Logger
 *
 * @package  Bearded 
 * @author   Carlos Alvarez <beardedframework@gmail.com>
 */

let UdpClientInstance = new UdpClient();


setTimeout(function(){ UdpClientInstance.sendMessage("message sent"); }, 5000);
