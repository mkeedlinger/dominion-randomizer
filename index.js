#!/usr/bin/env node

const inq = require('inquirer')
const com = require('commander')
const fs = require('fs')

const cards = JSON.parse(
  fs.readFileSync(`${__dirname}/cards.json`, { encoding: 'utf8' })
)

com
  .version(
    JSON.parse(
      fs.readFileSync(`${__dirname}/package.json`, { encoding: 'utf8' })
    ).version
  )
  .option('-n, --non-interactive', "Run with defaults; don't require input.")
  .parse(process.argv)

inq
  .prompt([
    {
      type: 'checkbox',
      name: 'boxSets',
      message: 'Select the boxes that you would like to choose from (none defaults to all):\n',
      choices: Object.keys(cards),
      pageSize: 20
    },
    {
      type: 'input',
      name: 'numberOfCards',
      message: 'How many cards would you like in your game?\n',
      default: 10
    }
  ])
  .then(res => {
    var midCards = []
    var resCards = []
    res.boxSets.forEach(function(item) {
      cards[item].forEach(function(card) {
        midCards.push(card)
      })
    })
    while (resCards.length < res.numberOfCards) {
      resCards.push(
        midCards.splice(Math.floor(Math.random() * midCards.length), 1)
      )
    }
    console.log("\n\nHere are your cards!")
    resCards.forEach(function(item, iter){
      console.log(`${++iter}\t${item}`)
    })
  })
