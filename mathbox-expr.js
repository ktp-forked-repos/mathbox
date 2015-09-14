"use strict";

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
}


class Num extends Expr {
   constructor(value) {
     super();
     this.value = value;
   }
   eval() {
     return this.value;
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
    }
  }
}

exports.Num = Num;
exports.Expr = Expr;
exports.BinOp = BinOp;
