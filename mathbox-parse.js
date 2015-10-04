"use strict";
var mbx = require('./mathbox-expr');

// !! this is a pretty crude lexer that will simply
// ignore stray characters it doesn't understand.

const lexer = /([()+\-*\/])|(\s+)|(\d+(\.\d+)?)/g;

function* tokenize (str) {
  var match;
  while (match = lexer.exec(str)) {  
    yield match[0];
  }
}

module.exports = {
  tokenize: tokenize
};
