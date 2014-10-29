var chance = new require('chance')();

module.exports = fillKickballForm = function(obj) {

  var allTeams = ['BALLTOWN', 'BLUE', 'SAVED', 'PARTY'];
  var otherTeams = ['BLUE', 'SAVED', 'PARTY']
  var ourTeam = 'BALLTOWN'
  var lastTeam = 'TRIPPIN'

  var rankValues = [
    8220005202,
    8220005203,
    8220005204,
    8220020114,
    8220020115
  ];

  var ids = {
    'BALLTOWN': 'input_719228758_61_8220005206_0',
    'BLUE': 'input_719228758_61_8220020117_0',
    'TRIPPIN': 'input_719228758_61_8220005205_0',
    'SAVED': 'input_719228758_61_8220005207_0',
    'PARTY': 'input_719228758_61_8220020116_0'
  };

  function isFirst(percentFirst) {
    return (getRandom(0, 100) < percentFirst);
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function orderTeams() {
    var order;
    if (isFirst(80)) {
      order = chance.shuffle(otherTeams);
      order.unshift(ourTeam);
    } else {
      order = chance.shuffle(allTeams)
    }
    order.push(lastTeam)
    return order;
  }

  function assignRanks(teams) {
    var ranks = {};
    obj[ids[teams[0]]] = rankValues[0];
    obj[ids[teams[1]]] = rankValues[1];
    obj[ids[teams[2]]] = rankValues[2];
    obj[ids[teams[3]]] = rankValues[3];
    obj[ids[teams[4]]] = rankValues[4];
    return ranks;
  }

  return assignRanks(orderTeams());

}