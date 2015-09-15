"use strict";

var mbx = require('./mathbox-expr');

// !! note: this is a pretty lexer that will simply
// ignore stray characters it doesn't understand.

const lexer = /([()+\-*\/])|(\s+)|(\d+(\.\d+)?)/g;

exports.tokenize = function (str) {
  var match, result = [];   
  while (match = lexer.exec(str)) {  
    result.push(match[0]);
  }
  return result;
}

