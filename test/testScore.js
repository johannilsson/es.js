var test = require('tape');
var score = require('../score.js');

test('Test Score', function(t){
  t.plan(7);
  var s = new score.Score();

  var lines =
    '20:40<a> destroyed an L8 Resonator on Vilande Buddhai\n' +
    '20:41<a> destroyed an L8 Resonator on Vilande Buddha\n' +
    '20:42<a> deployed an L8 Resonator on Vilande Buddha\n' +
    '20:43<b> destroyed an L8 Resonator on Vilande Buddha\n' +
    '20:44<a> destroyed an L8 Resonator on Vilande Buddha\n' +
    '20:45<b> destroyed an L5 Resonator on Byggarbarnet';

  s.parse(lines, function() {
    t.equal(s.startTime, '20:40', 'Verify start time');
    t.equal(s.endTime, '20:45', 'Verify end time');

    t.equal(s.score.tapptapp.destroyed[7], 3,
            'Verify that a destroyed three L8 resonators');
    t.equal(s.score.tapptapp.deployed[7], 1,
            'Verify that a deployed one L8 resonator');
    t.equal(s.score.vanuda.destroyed[7], 1,
            'Verify that b destroyed one L8 resonator');
    t.equal(s.score.vanuda.destroyed[4], 1,
            'Verify that b destroyed one L8 resonator');
    t.equal(s.score.vanuda.deployed[0], 0,
            'Verify that b did not deployed a L1 resonator');
  });
});


