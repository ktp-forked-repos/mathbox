"use strict";
/*
 * This file contains classes that represent nodes
 * in an abstract syntax tree for math expressions.
 *
 * The inheritance hierarchy looks like this:
 *
 *   Expr
 *     - Num
 *     - BinOp
 */

/**
 * `Expr` is an abstract parent class for AST nodes.
 * It provides a bunch of small methods to help with
 * building trees by hand.
 */

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

  leafCount() {
    throw new Exception("Instantiate a subclass of Expr instead.") ;
  }

  negate() {
    throw new Exception("Instantiate a subclass of Expr instead.") ;
  }

}


/**
 * `Num`s serve as leaf nodes for the AST.
 * The class just wraps a javascript Number as an Expr.
 */
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

  leafCount() {
    return 1;
  }

  negate() {
    return new Num(-this.value);
  }

}



/**
 * A `BinOp` represents an arbitrary operation on
 * two operands, `x` and `y`. The operator is a
 * single character, stored in the `op` field.
 */
class BinOp extends Expr {

  constructor(x,op,y, negated) {
    super();
    this.x=x; this.y=y; this.op=op;
    this.negated = negated;
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
    return (this.negated ? '-' : '')
         + `(${this.x.toString()}${this.op}${this.y.toString()})`;
  }

  leafCount() {
    return this.x.leafCount() + this.y.leafCount();
  }

  negate() {
    return new BinOp(this.x, this.op, this.y, !this.negated);
  }

}


module.exports = {
  Expr: Expr,
  Num: Num,
  BinOp: BinOp
}
