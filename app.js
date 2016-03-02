var score = require('./score');
var template = require('./score_table.hbs');
var inputTemplate = require('./input.hbs');

var s = new score.Score();

function process() {
  var parser = parserEle.checked ? 'iitc' : 'intel';
  s.parse(taEle.value, update, parser);
}

function update() {
  var results = [];
  for (var k in s.score) {
    results.push({
      'nick': k,
      'destroyed': s.score[k].destroyed,
      'deployed': s.score[k].deployed
    });
  }
  var div = document.createElement('div');
  div.innerHTML = template({
    'startTime': s.startTime,
    'endTime': s.endTime,
    'scores': results
  });
  resultEle.appendChild(div);
}

document.body.innerHTML = inputTemplate();

var taEle = document.getElementById('log-input');
taEle.addEventListener('input', process);

var resultEle = document.getElementById('result');
var parserEle = document.getElementById('is-iitc');

