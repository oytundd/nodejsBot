'use strict';
const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./config.json');
const prefix = '.'

const client = new Discord.Client();
client.commands = new Discord.Collection();

const {guildsDb} = require("./db.js");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

function guildObject(id){
	this.id = id;
	this.name;
	this.emoteCounter = [];
	this.replies = {};
  }
  
client.once('ready', () => {
	console.log('Ready!');
	const guildMap = client.guilds.cache;
	const guildidArr = guildMap.keyArray();
	let guildId;
	for(guildId of guildidArr){
		if(!guildsDb.has(guildId.toString())){
			let guildObj = guildMap.get(guildId);
			let guildName = guildObj.name;
			let guildVar = new guildObject(guildId);
			guildsDb.set(guildId.toString(),guildVar);
			guildsDb.set(guildId.toString(),guildName,'name');
		}
	}
	console.log(guildsDb);
});

client.on('message', message => {
	if(message.author.bot) return;
	let messageStr = message.content;
	let messageGuildid = message.guild.id.toString();
	if(guildsDb.has(messageGuildid,`replies.${messageStr}`)){
		message.channel.send(guildsDb.get(messageGuildid,`replies.${messageStr}`));
}

	if (!message.content.startsWith(prefix)) return;

	const tempArgs = message.content.slice(prefix.length).trim() //.split(/ +/);
	const args = tempArgs.match(/"[^"]*"|\S+/g).map(m => m.slice(0, 1) === '"'? m.slice(1, -1): m);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);