var logParser = require('./logParser');

var Score = (function() {

  var self,
  sumActivity,
  update;

  function Score() {
    this.score = {};
    this.startTime = null;
    this.endTime = null;
    self = this;
  }

  Score.prototype.parse = function(lines, callback, parser) {
    this.callback = callback;
    logParser(lines, sumActivity, update, parser);
  };

  sumActivity = function(activity) {
    if (!self.score[activity.nick]) {
      self.score[activity.nick] = {
        'destroyed': [0,0,0,0,0,0,0,0],
        'deployed': [0,0,0,0,0,0,0,0]
      };
    }

    self.score[activity.nick][activity.action][activity.resonator-1]++;

    if (self.startTime === null) {
      self.startTime = activity.time;
    }
    self.endTime = activity.time;
  };

  update = function() {
    self.callback();
  };

  return Score;
})();

module.exports.Score = Score;

