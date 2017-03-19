var _ = require('underscore')

// Win percentage 15% and Place percentage 12 %
const wPercentage = 0.15;
const pPercentage = 0.12;

function ToteBetting() {
  // Initial state
  this.bets = {
    w: {
      selection: {}
    },
    p: {
      selection: {}
    },
    result: {
      first: 0,
      second: 0,
      third: 0
    }
  },

  // Populate our data structure with our stdin data
  this.init = function(line) {
    let data = line.split(":");
    // If our stream has not ended yet
    if (data[0] !== "Result") {
      if (data[1] === "W") {
        if (this.bets.w.selection.hasOwnProperty(data[2])) {
          this.bets.w.selection[data[2]] += parseFloat(data[3]);
        } else {
          this.bets.w.selection[data[2]] = parseFloat(data[3]);
        }
      } else if (data[1] === "P") {
        if (this.bets.p.selection.hasOwnProperty(data[2])) {
          this.bets.p.selection[data[2]] += parseFloat(data[3]);
        } else {
          this.bets.p.selection[data[2]] = parseFloat(data[3]);
        }
      }
    // Safe to asume that we end the stream here
    } else {
      this.bets.result.first += parseFloat(data[1]);
      this.bets.result.second += parseFloat(data[2]);
      this.bets.result.third += parseFloat(data[3]);
    }
  },

  // TabCorp dividends
  this.tabWinDividends = function() {
    return _.values(this.bets.w.selection).reduce((a,b) => a + b) * wPercentage;
  },
  this.tabPlaceDividends = function() {
    return _.values(this.bets.p.selection).reduce((a,b) => a + b) * pPercentage;
  },

  // Calculate Winner dividends
  this.calculateWinDividends = function() {
    // Remaining money for punters
    let totalW = parseFloat(_.values(this.bets.w.selection).
      reduce((a,b) => a + b) - this.tabWinDividends());
    let winnerDiv = Math.round(
      totalW/this.bets.w.selection[this.bets.result.first] * 100)/100;
    return winnerDiv;
  },

  // Calculate place winners
  this.calculatePlaceDividends = function() {
    // Remaining money for place punters
    let totalP = parseFloat(_.values(this.bets.p.selection).
      reduce((a,b) => a + b) - this.tabPlaceDividends());
    let splitIntoThree = totalP/3;
    let first = Math.round(
      splitIntoThree/this.bets.p.selection[this.bets.result.first] * 100)/100;
    let second = Math.round(
      splitIntoThree/this.bets.p.selection[this.bets.result.second] * 100)/100;
    let third = Math.round(
      splitIntoThree/this.bets.p.selection[this.bets.result.third] * 100)/100;
    return [first, second, third]
  }
}



module.exports = ToteBetting
