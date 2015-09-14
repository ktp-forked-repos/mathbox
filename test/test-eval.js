var mbx=require('../mathbox-expr');

exports.testEval = function(test) {
    var x = new mbx.Num(2), y = new mbx.Num(3);
    test.expect(4);
    test.ok(x.plus(y).eval()  ==  5, '2+3');
    test.ok(x.minus(y).eval() == -1, '2-3');
    test.ok(x.times(y).eval() ==  6, '2*3');
    test.ok(x.over(y).eval() == 2/3, '2/3');
    test.done()
}
