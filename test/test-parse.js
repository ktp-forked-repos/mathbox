var mbp = require("../mathbox-parse");

exports.testLexer = function (test) {
  test.deepEqual(mbp.tokenize("(1/23*(45-6))"),
             ['(','1','/','23','*','(','45','-','6',')',')']);
  test.done();
}
