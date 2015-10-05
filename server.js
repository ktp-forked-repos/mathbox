"use strict"
/**
 * The server listens on localhost:1313 and
 * accepts math expressions separated by 
 * newline sequences (\r\n).
 * 
 * The response for each expression is the
 * fully parenthesized expression, followed
 * by an '=', followed by the value.
 */
var net = require('net'),
    rln = require('readline'),
    mbp = require('./mathbox-parse');

function log(msg) {
  console.log(msg);
}

var server = net.createServer((client)=> {
  var rl = rln.createInterface(client, client);
  rl.on("line", (str)=> {
    var exp = mbp.parse(str),
        val = exp.eval(),
        rep = `${exp.toString()}=${val}`;
    log(`heard: ${str}`);
    log(`reply: ${rep}`);
    client.write(`${rep}\r\n`);
  });
});

server.listen(1313, ()=> log('listening...'));
