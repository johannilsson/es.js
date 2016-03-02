
var test = require('tape');
var logParser = require('../logParser');

test('test single IITC line', function(t) {
  t.plan(4);  // Number of assertions to run.
  logParser('19:18<a> destroyed an L6 Resonator on Länsstyrelsen', function(result) {
    t.equal(result.nick, 'a', 'Nick ok');
    t.equal(result.time, '19:18', 'Time ok');
    t.equal(result.resonator, '6', 'Resonator level ok');
  }, function() {
    t.ok(true, 'Reached end.');
  });
});

test('test multiple IITC lines', function(t) {
  t.plan(1);
  var lines =
    '20:46<a> destroyed an L8 Resonator on Vilande Buddha\n' +
    '20:46<b> linked Södermalmskyrkan to Fågel På Kvist\n' +
    '20:47<c> deployed an L6 Resonator on Three Figures\n' +
    '20:48<d> destroyed an L5 Resonator on Byggarbarnet';

  var count = 0;
  logParser(lines, function(data) {
    count++;
  }, function() {
    t.equal(count, 3, 'Test that we got two hits.');
  });

});

test('test single IITC line that does not match', function(t) {
  t.plan(1);
  logParser('19:19<a> created a Control Field @KTH Speech, Music and Hearing +1 MUs', function(result) {
    //t.ok(result === null, 'Result is expected to be null.');
  }, function() {
    t.ok(true, 'Reached end.');
  });
});

test('test standard intel log format', function(t) {
  t.plan(1);
  var count = 0;
  logParser(
    '12:22AM\n' + 
    'a deployed an L4 Resonator on Alviksstrand (Alviks strand, 167 51 Bromma, Sweden)\n' + 
    '12:22AM\n' +
    'b captured The Moose-Camel Roundabout (Mikrofonvägen 23, 126 28 Hägersten, Sweden)\n' +
    '12:22AM\n' +
    'b deployed an L7 Resonator on The Moose-Camel Roundabout (Mikrofonvägen 23, 126 28 Hägersten, Sweden)\n' +
    '12:24AM\n' +
    'b destroyed an L4 Resonator on Västberga Info (Kontrollvägen, 126 30 Hägersten, Sweden)\n' +
    '12:24AM\n' +
    'b destroyed an L6 Resonator on Västberga Info (Kontrollvägen, 126 30 Hägersten, Sweden)\n' +
    '12:24AM\n' +
    'b destroyed an L4 Resonator on Västberga Info (Kontrollvägen, 126 30 Hägersten, Sweden)',
    function(result) {
      count++;
    },
    function() {
      t.equal(count, 5, 'Parsed standard intel format.');
    }, 'intel');
});

test('Test dateformat with intel log', function(t) {
  t.plan(3);
  var lines =
    'Oct 4\n' +
    'a destroyed an L4 Resonator on Änglar & Krypare (Johanneshovsvägen 3, 121 40 Johanneshov, Sweden)';
  logParser(lines, function(result) {
    t.equal('a', result.nick);
    t.equal('destroyed', result.action);
    t.equal('4', result.resonator);
  }, function() {
  }, 'intel');
});


