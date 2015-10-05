var mbp = require('../mathbox-parse'),
    mbr = require('../mathbox-rand');

exports.testLeafCount = function(test) {
  test.ok(mbp.parse('123').leafCount() == 1);
  test.ok(mbp.parse('12+3').leafCount() == 2);
  test.ok(mbp.parse('1*2+3').leafCount() == 3);
  test.ok(mbp.parse('(1*(2+3))+4').leafCount() == 4);
  test.done()
}

// It's pretty hard to test a random function,
// but we can test that the result has the
// right number of leaf nodes.
exports.testRandEx = function(test) {
  for (var i=1; i<=20; i++) {
    test.equal(i, mbr.randEx(i).leafCount());
  }
  test.done()
}
