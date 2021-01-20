const Discord = require('discord.js');


module.exports = {
  name: 'animu',
  description: 'Get a random ai generated anime picture from thisanimedoesnotexist.ai, enter a value between 0.3 and 2 for creativity value, default is 2',
  execute(message,args){
    randInt = Math.floor(Math.random()*9999)+1000;
    if(args[0] != undefined){
      if(args[0] >= 0.3 &&  args[0] <= 2){
        let num = args[0];
        num = Number(num).toFixed(1);
        let url = "||https://thisanimedoesnotexist.ai/results/psi-"+num+"/seed"+randInt+".png||";
        message.channel.send(url);
      }
      else{
        message.channel.send("Please enter a value between 0.3 and 2 for creativity value.");
      }
    }
    else{
      let url = "||https://thisanimedoesnotexist.ai/results/psi-2.0/seed"+randInt+".png||";
      message.channel.send(url);
    }


  

   }
};