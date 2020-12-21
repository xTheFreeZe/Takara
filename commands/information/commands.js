const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "commands",
    category: "information",
    description: "List of all Commands",
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setTitle("STT Premium")
            .setColor("#e2b007")
            .setThumbnail("https://cdn.discordapp.com/attachments/681060754564448257/784713060552146995/STT_BOT_PREMIUM_2.png")
            .setDescription("All Commands :")
            .addField("General commands ", "`^help` , `^help fun` , `^help mod` , `^help dev`")
            .addField("Test commands", "`^delay 10` , `^delay 20`")
            .addField("Info commands", "`^info help` , `^info ping` , `^help join` ,`^info kick` , `^info suggest` , `^info warn`")
            .addField("Chat commands", "`^suggest [suggestion]` , `^pred [team vs team ] ` , `^hug [person you want to hug`")
            .addField("Chat commands", "`^speak [your message ] ` ")
            .addField("Staff commands", "`^warn [@member] [reason] ` , `^topic`")
            .addField("Staff commands", "`^kick [@member] [reason] `  `^ban [@member] [reason] `")
            .addField("Bug command", "`^report [your report ] `")
            .addField("Fun commands", "`^ping` , `^online` , `^avatar`, `^memeoftheday`")
            .addField("Help staff", "`^help suggest` , `^help ban`")
            .addField("Voice Channel commands", "`^join` , `^leave` , `^play`")
            .addField("Socials", "`^twitter` , `^twitter2` ,  `^website`")
            .addField("ID Command", "`^ID [@member]`")
            .addField("Thanks for using my Bot", "Marwin")
            .setFooter("Last edit : 05.12.2020")
        message.channel.send(embed)
    }
}