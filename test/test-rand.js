var mbp = require('../mathbox-parse');

exports.testLeafCount = function(test) {
  test.ok(mbp.parse('123').leafCount() == 1);
  test.ok(mbp.parse('12+3').leafCount() == 2);
  test.ok(mbp.parse('1*2+3').leafCount() == 3);
  test.ok(mbp.parse('(1*(2+3))+4').leafCount() == 4);
  test.done()
}
