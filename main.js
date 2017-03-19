const fs = require('fs');
const readline = require('readline');
const input = process.argv[2];
const output = process.argv[3];
const ToteBetting = require("./toteBetting")

let bet = new ToteBetting

const rl = readline.createInterface({
  input : fs.createReadStream(input, {encoding: "utf8"}),
  output: fs.createWriteStream(output, {
    flags: 'w',
    encoding: "utf8",
    mode: 0666
  }),
  terminal: false
})

rl.on('line', function(line) {
  bet.init(line);
});

rl.on('close', function() {
  let win = bet.calculateWinDividends();
  let place1 = bet.calculatePlaceDividends()[0];
  let place2 = bet.calculatePlaceDividends()[1];
  let place3 = bet.calculatePlaceDividends()[2];
  rl.output.write("Win:" + bet.bets.result.first + ":$" + win + "\n")
  rl.output.write("Place:" + bet.bets.result.first + ":$" + place1 + "\n")
  rl.output.write("Place:" + bet.bets.result.second + ":$" + place2 + "\n")
  rl.output.write("Place:" + bet.bets.result.third + ":$" + place3 + "\n")
});
