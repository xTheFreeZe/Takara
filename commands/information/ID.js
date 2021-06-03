const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "id",
    category: "information",
    description: "shows Discord ID of someone",
    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        let user = message.mentions.users.first() || message.author;
        let author = message.author
        let member = message.mentions.members.first() || message.author;
        const embed = new MessageEmbed()
            .setDescription(`This is the Discord ID from ${member}: ` + " " + "**" + user + "**")
            .setFooter("Takara | Information")
            .setColor("RANDOM")
        message.channel.send(embed);
    }
}

//let argsembed = new MessageEmbed()
//.setColor("RANDOM")
//.setDescription(`<:STT_no:778545452218974209> Please mention someone ${message.author.username}`)
//if (!args[1]) return message.channel.send(argsembed);