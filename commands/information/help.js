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
    run: async (client, message, PREFIX) => {
        var ping = client.ws.ping;
        const embed = new MessageEmbed()
            .setColor('#e2b007')
            .setTitle('This is the `^help` Command')
            .setDescription('<:STT_yes:778545433810173952> These are your options:')
            .setThumbnail('https://cdn.discordapp.com/attachments/685794100112392212/750020815034122350/STT_BOT_PREMIUM_2.png')

            .addField('`^help fun`', 'Fun commands')

            .addField('`^help mod`', 'Commands for staff')

            .addField('`^help dev`', 'Developer options')

            .addField('`Ping:`', `${ping} ms`, true)

            .addField("`My Website`", "[Click here](https://sad-spence-0be9ad.netlify.app)", true)

            .addField("`My Status`", "[Click here](https://sttproductions.statuspage.io/)", true)

            .setFooter("Many Features were made possible by Epicrafter#3685. Thank you!")



        message.channel.send(embed);
    }
}