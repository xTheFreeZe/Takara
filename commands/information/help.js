const {
    MessageEmbed
} = require('discord.js');
const {
    category
} = require('../moderation/report');

module.exports = {
    name: "help",
    category: "information",
    description: "General Info command",
    run: async (client, message, args, PREFIX) => {


        let author = message.author
        let channel = message.channel
        var ping = client.ws.ping;

        const funembed = new MessageEmbed()
            .setColor('#E16210')
            .setTitle('Fun Commands')
            .setDescription('<:STT_yes:778545433810173952> `^avatar`, `^meme`, `^memeoftheday`, `^8ball`, `^kill`, `^hug`, `^suggest`, `^join`, `^play`, `^leave`')
            .setFooter("STT Premium | Information")

        const modembed = new MessageEmbed()
            .setColor('#2E0E81')
            .setTitle('Staff Commands')
            .setDescription('<:STT_yes:778545433810173952> This is only ment for Staff Members!')
            .addField('kick/ban command:', '`^kick/^ban [@member]`', true)
            .addField('General Chat Commands:', '`^unban`, `^warn`, `^topic`, `^id`, `^ping`, `^uptime`', true)
            .setFooter("STT Premium | Information")

        const devembed = new MessageEmbed()
            .setColor('#56E448')
            .setTitle('Developer Commands')
            .setDescription('<:STT_yes:778545433810173952> Everybody can use these commands, they are only here to give the Developer Info about certain things!')
            .addField('Basic commands:', '`^ping`, `^id`, `^update`, `^talk`', true)
            .addField('Coding commands:', '`^info help`, `^info ping`, `^info join`, `^info kick`, `^info suggest`, `^info warn`', true)
            .setFooter("STT Premium | Information")


        const utilitieembed = new MessageEmbed()
            .setTitle("Utilities")
            .setDescription('<:STT_yes:778545433810173952> `^uptime`, `^id`, `^report`, `^list`, `^permissions`, `^system`')
            .setColor("#FCFEFE")
            .setFooter("STT Premium | Information")


        const embed = new MessageEmbed()
            .setColor('#e2b007')
            .setTitle('This is the `^help` Command')
            .setDescription('<:STT_yes:778545433810173952> These are your options:')
            .setThumbnail('https://cdn.discordapp.com/attachments/681060754564448257/794509069867286528/stt-premium-logo.jpg')

            .addField('`^help fun`', 'Fun commands')

            .addField('`^help mod`', 'Commands for staff')

            .addField('`^help dev`', 'Developer options')

            .addField('`^help util`', 'Utilitie Commands')

            .addField('`Ping:`', `${ping} ms`, true)

            .addField("`My Website`", "[Click here](https://gifted-williams-0e90d5.netlify.app/)", true)

            .addField("`My Status`", "[Click here](https://sttproductions.statuspage.io/)", true)

            .setFooter("Many Features were made possible by Epicrafter#3685. Thank you!")

        if (!args[0]) {

            return message.channel.send(embed)

        } else if (args[0] == 'fun') {

            return message.channel.send(funembed)

        } else if (args[0] == 'mod') {

            return message.channel.send(modembed)

        } else if (args[0] == 'dev') {

            return message.channel.send(devembed)

        } else if (args[0] == 'util') {

            return message.channel.send(utilitieembed)
        }


    }
}