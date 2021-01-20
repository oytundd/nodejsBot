const Discord = require('discord.js');


module.exports = {
  name: 'animu',
  execute(message){
    randInt = Math.floor(Math.random()*9999)+1000;
    url = "https://thisanimedoesnotexist.ai/results/psi-2.0/seed"+randInt+".png";
    message.channel.send(url);
   }
};
