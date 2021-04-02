const {
    MessageEmbed,
    ReactionCollector
} = require('discord.js');

module.exports = {
    name: "info",
    category: "information",
    description: "Gives info about the selected command!",
    run: async (client, message, args) => {


        const commands = [
            'ban',
            'kick',
            'lock',
            'purge',
            'report',
            'topic',
            'unban',
            'warn'
        ]

        const errorembed = new MessageEmbed()
            .setTitle('Error')
            .setDescription('<:STT_no:778545452218974209> Unkown Command')
            .setFooter('Type "^info" to see all available commands')
            .setColor('RED')

        if (!args[0] === commands) return message.channel.send(errorembed);

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


        const purgeembed = new MessageEmbed()
            .setTitle('Information: Purge')
            .addField('Name', '^purge')
            .addField('Category', 'moderation')
            .addField('Description', 'Deletes an amount of text messages')
            .addField('Usage', '^purge `number of messages`')
            .addField('Cooldown', 'No Cooldown')


        const reportembed = new MessageEmbed()
            .setTitle('Information: Report')
            .addField('Name', '^report')
            .addField('Category', 'moderation')
            .addField('Description', 'Send a Message to the Developer')
            .addField('Usage', '^report `message`')
            .addField('Cooldown', '5 Minutes')


        const topicembed = new MessageEmbed()
            .setTitle('Information: Topic')
            .addField('Name', '^topic')
            .addField('Category', 'moderation')
            .addField('Description', 'Can be used when topic is inappropriate')
            .addField('Usage', '^topic')
            .addField('Cooldown', 'No Cooldown')



        const unbanembed = new MessageEmbed()
            .setTitle('Information: Unban')
            .addField('Name', '^unban')
            .addField('Category', 'moderation')
            .addField('Description', 'Unbans a member from a guild')
            .addField('Usage', '^unban `discord id`')
            .addField('Usefull', 'Use ^id @member to get the discord ID')
            .addField('Cooldown', 'No Cooldown')


        const warnembed = new MessageEmbed()
            .setTitle('Information: Warn')
            .addField('Name', '^warn')
            .addField('Category', 'moderation')
            .addField('Description', 'Warns a member, warning gets logged')
            .addField('Usage', '^warn `@member reason`')
            .addField('Cooldown', 'No Cooldown')











        if (!args[0]) {

            return message.channel.send(infoembed);

        } else if (args[0] == 'ban') {

            return message.channel.send(banembed);

        } else if (args[0] == 'kick') {

            return message.channel.send(kickembed);

        } else if (args[0] == 'lock') {

            return message.channel.send(lockembed);

        } else if (args[0] == 'purge') {

            return message.channel.send(purgeembed);

        } else if (args[0] == 'report') {

            return message.channel.send(reportembed);

        } else if (args[0] == 'topic') {

            return message.channel.send(topicembed);

        } else if (args[0] == 'unban') {

            return message.channel.send(unbanembed);

        } else if (args[0] == 'warn') {

            return message.channel.send(warnembed);

        }




    }
}