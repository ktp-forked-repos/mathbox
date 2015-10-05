"use strict"
/**
 * The client sends a series of math expressions to
 * the server for evaluation.
 */
var net = require('net'),
    rln = require('readline');

function log(msg) {
  console.log(msg);
}

/**
 * Repeat a function `n` times, with a delay of 
 * `delay` milliseconds between each call. The
 * function should expect one parameter, the
 * count, which starts at n-1 and ends at 0.
 */
function repeat(n, delay, func) {
  if (n > 0) { 
    func(n-1);
    setTimeout(repeat, delay, n-1, delay, func);
  }
}

var sock = net.connect(1313, ()=> {
  var rl = rln.createInterface(sock,sock),
      done = false;

  rl.on("line", (line)=> {
    log(`received: ${line}`);
    if (done) {
      log('all done');
      sock.destroy();
    }
  });

  repeat(100, 250, (n)=> {
    var expr = "2*3+4";
    log(`${100-n}/100: sending ${expr}`);
    sock.write(`${expr}\r\n`);
    if (n == 0) done = true;
  });

});
