const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "ID",
    category: "information",
    description: "shows Discord ID of someone",
    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        let user = message.mentions.users.first();
        let author = message.author
        const member = message.guild.member(user);
        let argsembed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:STT_no:778545452218974209> Please mention someone ${message.author.username}`)
        if (!args[1]) return message.channel.send(argsembed);
        const embed = new MessageEmbed()
            .setDescription(`This is the Discord ID from ${member}: ` + " " + "**" + user + "**")
            .setFooter("STT Premium | Information")
            .setColor("RANDOM")
        message.channel.send(embed);
    }
}