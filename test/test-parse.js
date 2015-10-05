var mbp = require("../mathbox-parse"),
    mbx = require("../mathbox-expr");

exports.testLexer = function (test) {
  test.deepEqual(mbp.lex("(1/23*(45-6))"),
                 ['(','1','/','23','*','(','45','-','6',')',')']);
  test.done();
}

var N = (n) => new mbx.Num(n);

exports.testParser = function (test) {
  test.deepEqual(mbp.parse("1"), N(1) );
  test.deepEqual(mbp.parse("2+3"), N(2).plus(N(3)) );
  test.deepEqual(mbp.parse("2*3+4"), ( N(2).times(N(3)) ).plus(N(4)) );
  test.deepEqual(mbp.parse("2+3*4"), N(2).plus( N(3).times(N(4))) );
  test.done();
}

exports.testParens = function (test) {
  test.deepEqual(mbp.parse("(1)"), N(1) );
  test.deepEqual(mbp.parse("((2)+(3))"), N(2).plus(N(3)) );
  test.deepEqual(mbp.parse("((2*3)+4)"), ( N(2).times(N(3)) ).plus(N(4)) );
  test.done();
}

exports.testNegatives = function (test) {
  test.deepEqual(mbp.parse("-1"), N(-1) );
  test.deepEqual(mbp.parse("--1"), N(+1) );
  test.deepEqual(mbp.parse("---1"), N(-1) );
  test.deepEqual(mbp.parse("-2+-3"), N(-2).plus(N(-3)) );
  test.equal(mbp.parse("-(2+-3)").toString(), "-(2+-3)");
  test.done();
}
