const blacklist = require('./blacklist.json');

const tok = () => {
  let table = [];
  for (let key in blacklist) {
    if (
      blacklist[key]['E-mail'].length > 0 &&
      blacklist[key]['Title'] != 'Araştırma Görevlisi'
    ) {
      table.push(blacklist[key]['E-mail']);
    }
  }
  let json = JSON.stringify(table);
  var fs = require('fs');
  fs.writeFile('blacklistv2.json', json, 'utf8', function (err) {
    if (err) throw err;
    console.log('complete');
  });
};

module.exports = tok;
