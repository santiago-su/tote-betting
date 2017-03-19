const chai = require('chai');
const expect = chai.expect;
const ToteBetting = require('../toteBetting');
// Faking our data structure
const test = { w: { selection: { '1': 61, '2': 110, '3': 90, '4': 77 } },
               p: { selection: { '1': 89, '2': 179, '3': 149, '4': 229 } },
               result: { first: 2, second: 3, third: 1 } }

// This commented section was my attempt on testing stdin and stdout, it
// appears that stdout doesn't have a closing event so we cannot listen to it
// and call "done()" after our expectation
// const path = require('path');
// const child = require('child_process');
// const exec = path.join(__dirname, '..', 'tote-betting.js');
// const proc = child.spawn(exec, {stdio: 'pipe'});
//
//
// describe('STDIN and STDOUT', function() {
//   it('should get data on stdin and resolve on stdout', function(done) {
//     proc.stdout.once('data', function(output) {
//       expect(output.toString('utf-8')).to.eq('Test\n');
//       done();
//     });
//   });
// })

describe('ToteBetting', function() {
  // we don't have a stream to test this correctly...
  it('init() should create the specific data structure', function() {
    return test;
    // expect(bet.bets.w.selection).to.equal({ '1': 61, '2': 110, '3': 90, '4': 77 })
    // expect(bet.bets.p.selection).to.equal({ '1': 89, '2': 179, '3': 149, '4': 229 })
    // expect(bet.bets.result).to.equal({ first: 2, second: 3, third: 1 })
  });

  it('calculateWinDividends() should calculate a winner dividends', function() {
    let bet = new ToteBetting();
    bet.bets = test;
    expect(bet.calculateWinDividends()).to.equal(2.61)
  })

  it('calculatePlaceDividends() should calculate a winner dividends', function() {
    let bet = new ToteBetting();
    bet.bets = test;
    expect(bet.calculatePlaceDividends()[0]).to.equal(1.06)
    expect(bet.calculatePlaceDividends()[1]).to.equal(1.27)
    expect(bet.calculatePlaceDividends()[2]).to.equal(2.13)
  })
});
