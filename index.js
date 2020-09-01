const Discord = require('discord.js');
const {Client, MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const PREFIX = '^';

client.on('ready', () => {
    console.log('The bot is online! yaaaaaaaay')

});

client.on('message', msg => {
    if (msg.content === "#help") {
        const embed = new MessageEmbed()
            .setColor('#e2b007')
            .setTitle('This is the `^help` command of the Premium bot')
            .setDescription('These are your options:')
            .setThumbnail('https://cdn.discordapp.com/attachments/685794100112392212/750020815034122350/STT_BOT_PREMIUM_2.png')
            .addFields({
                name: ':joy:`^help fun` ',
                value: 'Some fun commands',
                inline: true
            }, {
                name: '⚔`^help staff`',
                value: 'Commands for Staff',
                inline: true
            }, )
            .addField('🛠`^help dev`', 'Developer options', true)
            .setFooter('This is the new STT Premium Bot. If you want to use it please DM:Marwin#8376');

        msg.channel.send(embed);
        msg.delete();
    }
})

client.on('message', msg => {
    if(msg.content === "^whypremium") {
        const embed = new MessageEmbed()
        .setColor('#EFEC26')
        .setThumbnail(msg.author.displayAvatarURL())
        .setDescription('You may ask yourself : **Why should I use the Premium Version?** Here are some perks you get:')
        .addField('Perks you get:', '`faster answers` `premium commands`')
        .setFooter('Premium Commands are : all the Voice Channel Commands')
    msg.reply(embed);
    msg.delete();
        
    }
})























client.login(process.env.token);