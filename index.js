const Discord = require('discord.js');
const {Client, MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const PREFIX = '^';

client.on('ready', () => {
    console.log('The bot is online! yaaaaaaaay')

});
























client.login(process.env.token);