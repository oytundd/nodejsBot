const Enmap = require('enmap');
const myEnmap = new Enmap({ name: 'test' });

const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const reply = require('./commands/reply');
const {guildsDb} = require("./db.js");


console.log(guildsDb);
/*
const serverID = {
    emoteCounter :{
        emote1:count1,
        emote2:count2,
        emote3:count3
    }
    replies :{
        trigger1:reply1,
        trigger2:reply2,
        trigger3:reply4,
    }
}
*/



