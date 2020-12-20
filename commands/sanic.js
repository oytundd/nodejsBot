const Discord = require('discord.js');
let fs = require('fs');
var gis = require('g-i-s');

module.exports = {
  name: 'sanic',
  execute(message){
fs.readFile('../data/us.txt', function(err, data) {
    if(err) throw err;
    let array = data.toString().split("\r\n");
    let randNum = Math.floor(Math.random() * array.length);
    let randName = array[randNum];
    let ADDITION = " the hedgehog";
    let searchQuery = randName.concat(ADDITION)
    console.log(searchQuery);
    gis(searchQuery, logResults);
function logResults(error, results) {
  if (error) {
    console.log(error);
  }
  else {
    let queryURL = (JSON.stringify(results[0].url, null, '  '));
    sliced = queryURL.slice(1,-1);
    message.channel.send(sliced);
  }
}
});
  }
};
