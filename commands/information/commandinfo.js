const {
    MessageEmbed,
    ReactionCollector
} = require('discord.js');

module.exports = {
    name: "info",
    category: "information",
    description: "Gives info about the selected command!",
    run: async (client, message, args) => {

        const infoembed = new MessageEmbed()
            .setTitle('Information Command')
            .setDescription('Choose a command you want to learn more about.')
            .addField('Available Commands', '`ban`, `kick`, `lock`, `purge`, `report`, `topic`, `unban`, `warn`')
            .setFooter('Type ^info [command] to see the information')
            .setColor('GREEN')


        const banembed = new MessageEmbed()
            .setTitle('Information: Ban')
            .addField('Name', '^ban')
            .addField('Category', 'moderation')
            .addField('Description', 'Bans a member from a guild')
            .addField('Usage', '^ban @member reason')
            .addField('Cooldown', 'No Cooldown')


        const kickembed = new MessageEmbed()
            .setTitle('Information: Kick')
            .addField('Name', '^kick')
            .addField('Category', 'moderation')
            .addField('Description', 'Kicks a member from a guild')
            .addField('Usage', '^kick @member reason')
            .addField('Cooldown', 'No Cooldown')


        const lockembed = new MessageEmbed()
            .setTitle('Information: Lock')
            .addField('Name', '^lock')
            .addField('Category', 'moderation')
            .addField('Description', 'Locks all Text-Channels')
            .addField('Usage', '^lock on/off')
            .addField('Cooldown', 'No Cooldown')





        if (!args[0]) {

            return message.channel.send(infoembed);

        } else if (args[0] == 'ban') {

            return message.channel.send(banembed);

        } else if (args[0] == 'kick') {

            return message.channel.send(kickembed);

        } else if (args[0] == 'lock') {

            return message.channel.send(lockembed);

        }




    }
}