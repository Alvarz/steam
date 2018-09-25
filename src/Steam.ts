//const EventEmitter = require('events');
import { EventEmitter } from 'events';


export default class Steam extends EventEmitter {

 execute(taskFunc) {
    console.log('Before executing');
    this.emit('begin');
    taskFunc();
    this.emit('end');
    console.log('After executing');
 }

}
