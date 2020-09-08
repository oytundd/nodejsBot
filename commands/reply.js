
const { owner } = require('../config.json');
const Discord = require('discord.js');
const { DiscordAPIError } = require('discord.js');
const {guildsDb} = require("../db.js");

module.exports = {
	name: 'reply',
	description: 'Add auto reply.',
	args: true,
	execute(message, args) {
		if(message.author.id == owner){
			let guildId = message.guild.id.toString();
			switch(args[0]){
				case "add":
					guildsDb.set(guildId,args[2],`replies.${args[1]}`)
					console.log(guildsDb);
					break;	
				case "del":
					guildsDb.delete(guildId,`replies.${args[1]}`);
					break;
				case "list": 
					let counterObj = guildsDb.get(guildId, 'replies');
					let guildName = guildsDb.get(guildId,'name');
                    const embedList = new Discord.MessageEmbed()
                        embedList.setColor('#0099ff')
                        embedList.setTitle('Auto-Reply List for '+ guildName);
                        for(let key in counterObj){
                            embedList.addField(key,counterObj[key]);
						}
                    message.channel.send(embedList);
                    break;
                    
			}
			
		}
	},

};