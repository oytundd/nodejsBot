const Enmap = require('enmap');
const myEnmap = new Enmap({ name: 'test' });

const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const reply = require('./commands/reply');


const guildArray = [ '133503007366053888', '420960021476802561', '704783059999784980' ];
let guildId;

console.log(myEnmap);
// let guildInt;
// let name = "test";


// console.log(myEnmap);
// myEnmap.destroy();
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



