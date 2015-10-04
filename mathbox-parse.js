"use strict";
var mbx = require('./mathbox-expr');

// !! this is a pretty crude lexer that will simply
// ignore stray characters it doesn't understand.

const lexer = /([()+\-*%\/])|(\s+)|(\d+(\.\d+)?)/g;

function* tokenize (str) {
  var match;
  while (match = lexer.exec(str)) {
    yield match[0];
  }
}

/**
 * A simple recursive descent parser for arithmetic expressions.
 */
class Parser {

  constructor(str) {
    this.tokens = tokenize(str);
    this.token = null;
    this.node = null;
  }

  next() {
    var gen = this.tokens.next();
    this.token = gen.done ? '' : gen.value;
    // recursively skip whitespace:
    if (/\s+/.exec(this.token) !== null) this.next();
    return this.token;
  }

  // expr ::= term {('+'|'-') term}.
  expr() {
    var res = this.term();
    while (['+','-'].indexOf(this.token) !== -1) {
      res = new mbx.BinOp(res, this.token, this.term());
    }
    return res;
  }

  // term ::= factor {('*'|'/'|'%') factor}.
  term() {
    var res = this.factor();
    while (['*','/','%'].indexOf(this.token) !== -1) {
      res = new mbx.BinOp(res, this.token, this.factor());
    }
    return res;
  }

  // factor ::= <number> | '(' expr ')'.
  factor() {
    var tok = this.next(),
        num = parseFloat(tok),
        res;

    if (isNaN(num))
      switch(tok) {
      case '(':
        res = this.expr()
        if (this.next()!=')') {
          throw new Error(`expected ')', but found '${this.token}' instead`);
        }
        break;
      default:
        throw new Error(`unexpected token: '${tok}'`);
      }
    else res = new mbx.Num(num);

    this.next();
    return res;
  }

}

// --- public interface ---

exports.parse = function (str) {
  return new Parser(str).expr();
}

exports.lex = function (str) {
  var res = []
  for (var tok of tokenize(str)) res.push(tok);
  return res;
}
