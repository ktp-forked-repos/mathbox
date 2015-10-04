"use strict";

// abstract parent class
class Expr {
  plus(y) {
    return new BinOp(this, '+', y);
  }
  minus(y) {
    return new BinOp(this, '-', y);
  }
  times(y) {
    return new BinOp(this, '*', y);
  }
  over(y) {
    return new BinOp(this, '/', y);
  }
  mod(y) {
    return new BinOp(this, '%', y);
  }
  isExactly(expr) {
    return this.toString() == expr.toString();
  }
  toString() {
    throw new Exception("Instantiate a subclass of Expr instead.") ;
  }
}


class Num extends Expr {

  constructor(value) {
    super();
    this.value = value;
  }

  eval() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }
}



class BinOp extends Expr {

  constructor(x,op,y) {
    super();
    this.x=x; this.y=y; this.op=op;
  }

  eval() {
    var x=this.x, y=this.y;
    switch(this.op) {
      case '+': return x.eval() + y.eval();
      case '-': return x.eval() - y.eval();
      case '*': return x.eval() * y.eval();
      case '/': return x.eval() / y.eval();
      case '%': return x.eval() % y.eval();
    }
  }

  toString() {
    // fully parenthesized so I don't have to mess with precedence here.
    return `(${this.x.toString()}${this.op}${this.y.toString()})`;
  }
}

exports.Num = Num;
exports.Expr = Expr;
exports.BinOp = BinOp;
