const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "serverinfo",
    category: "information",
    description: "Shows stats for the current server",
    run: async (client, message, PREFIX) => {
        const embed = new MessageEmbed()
            .setTitle('Server Info')
            .setColor("RANDOM")
            .addField('Server name:', `${message.guild.name}`)
            .addField('Total members:', `${message.guild.memberCount}`)
            .addField('Owner:', `${message.guild.owner}`)
            .addField("Roles Count", `This server has ${message.guild.roles.cache.size} roles`)
            .addField("Emoji Count", `This server has ${message.guild.emojis.cache.size} emojis`)
            .setThumbnail(`${message.guild.iconURL()}`)
            .setFooter('Takara | Information')
        message.channel.send(embed);
    }
}