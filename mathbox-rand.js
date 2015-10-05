"use strict";
/*
 * This file contains a function to build random
 * arithmetic expressions.
 */
var mbx = require('./mathbox-expr');

/**
 * Choose a mathematical operator, at random.
 */
function randOp() {
  var ops="+-*/%";
  return ops[Math.floor(Math.random()*ops.length)];
}


/**
 * Generate a random mathbox expression, with
 * `n` leaf nodes. Leaves are arbitrarily set
 * to 3 leading and 2 trailing decimal places,
 * for asthetics.
 */
function randEx(n) {
  if (n<1) throw "randEx(n): expected n > 0";
  if (n == 1) {
    return new mbx.Num(Math.floor(Math.random()*100000)/(Math.random() > 0.5 ? 100 : -100));
  } else {
    var x = 1+Math.floor(Math.random() * (n-1));
    return new mbx.BinOp(randEx(x), randOp(), randEx(n-x));
  }
}

module.exports = {
  randEx: randEx
}
