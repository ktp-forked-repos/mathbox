var mbx = require('../mathbox-expr');

exports.testEval = function(test) {
    var x = new mbx.Num(2), y = new mbx.Num(3);
    test.ok(x.plus(y).eval()  ==  5, '2+3');
    test.ok(x.minus(y).eval() == -1, '2-3');
    test.ok(x.times(y).eval() ==  6, '2*3');
    test.ok(x.over(y).eval() == 2/3, '2/3');
    test.ok(x.mod(y).eval()  == 2%3, '2%3');
    test.done()
}

exports.testToString = function(test) {
    var x = new mbx.Num(2), y = new mbx.Num(3),
        s = (obj, goal) => test.equal(obj.toString(), goal);
    s(x.plus(y),  '(2+3)');
    s(x.minus(y), '(2-3)');
    s(x.times(y), '(2*3)');
    s(x.over(y),  '(2/3)');
    s(x.mod(y),   '(2%3)');
    s(x.times(x.plus(y)),  '(2*(2+3))');
    test.done()
}

exports.testIsExactly = function(test) {
    // want to test whether expressions are exactly the
    // same (as opposed to evaluating to the same thing)
    // so I can test the parser.
    var n0  = new mbx.Num(0),
        n1a = new mbx.Num(1),
        n1b = new mbx.Num(1);

    test.ok(n0.isExactly(n0));
    test.ok(n1a.isExactly(n1b));
    test.ok(!n0.isExactly(n1a));
    test.ok(n1a.plus(n1b).isExactly(n1b.plus(n1a)));
    test.ok(!n1a.plus(n0).isExactly(n0.plus(n1a)),
               "1+0 should not be the same expression as 0+1");
    test.done()
}

var N = (n) => new mbx.Num(n);
exports.testNegate = function(test) {
  test.equals(N(1).negate().toString(), '-1');
  test.equals((N(2).plus(N(3))).negate().toString(), '-(2+3)');
  test.done();
}
