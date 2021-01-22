const Discord = require('discord.js');

let descriptorMsg = "Image provided by thisanimedoesnotexist.ai supply a value between 0.3 and 2 to customize creativity level, default is 2, might be NSFW:"
module.exports = {
  name: 'animu',
  description: 'Get a random ai generated anime picture from thisanimedoesnotexist.ai, enter a value between 0.3 and 2 for creativity value, default is 2',

  execute(message,args){
    randInt = Math.floor(Math.random()*99999)+10000;
    if(args[0] != undefined){
      if(args[0] >= 0.3 &&  args[0] <= 2){
        let num = args[0];
        num = Number(num).toFixed(1);
        let url = "https://thisanimedoesnotexist.ai/results/psi-"+num+"/seed"+randInt+".png";
        message.channel.send(descriptorMsg,{
          files: [{
             attachment: url,
             name: "SPOILER_FILE.jpg",
          }]
       });
      }
      else{
        message.channel.send("Please enter a value between 0.3 and 2 for creativity value.");
      }
    }
    else{
      let url = "https://thisanimedoesnotexist.ai/results/psi-2.0/seed"+randInt+".png";
      message.channel.send(descriptorMsg,{
        files: [{
           attachment: url,
           name: "SPOILER_FILE.jpg",
           content:"Image provided by thisanimedoesnotexist.ai, might be NSFW:"
        }]
     });
    }


  

   }
};