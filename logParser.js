//var reIntel = /([\d]+:[\d]+AM|PM)\n(.*) destroyed an L([\d])/g;
//var reIitc = '([\\d]+:[\\d]+)\\t?<(.*)>\\t? destroyed an L([\\d])';
var reIitc = '([\\d]+:[\\d]+)\\t?<(.*)>\\t?\\s? ([\\w]+) an L([\\d])';

function parseIitc(logData, result, end) {
  var rows = logData.split('\n');
  for (var i = 0; i < rows.length; i++) {
    var re = new RegExp(reIitc);
    var m = re.exec(rows[i]);
    if (m) {
      result({
        'time': m[1],
        'nick': m[2],
        'action': m[3],
        'resonator': m[4]
      });
    }
  }
  end();
}

function parseIntel(logData, result, end) {
  var rows = logData.split('\n');
  var tmpTime = null;
  for (var i = 0; i < rows.length; i++) {
    if (!tmpTime) {
      var matchTime = /([\d]+:[\d]+[A-Z]{2})|([a-zA-Z]{3} [\d]{1,2})/g.exec(rows[i]) || [];
      tmpTime = matchTime[1] || matchTime[2];  // Named patterns?
    } else {
      var m = /(.*) (destroyed|deployed) an L([\d])/g.exec(rows[i]);
      if (m) {
        result({
          'time': tmpTime,
          'nick': m[1],
          'action': m[2],
          'resonator': m[3]
        });
      }
      tmpTime = null;
    }
  }
  end();
}

function parse(logData, result, end, parser) {
  if (parser === undefined || parser === 'iitc') {
    parseIitc(logData, result, end);
  } else if (parser === 'intel') {
    parseIntel(logData, result, end);
  } else {
    throw 'Unknown parser.';
  }
}

module.exports = parse;
