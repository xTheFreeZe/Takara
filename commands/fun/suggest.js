const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "suggest",
    category: "fun",
    description: "Lets you make a suggestions",

    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        let author = message.author
        const user = message.mentions.users.first();
        let msgArgs = args.slice(1).join(" ");
        let messagelength = msgArgs.length
        const argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please provide a suggestion.`)
            .setColor("RANDOM")
        if (!msgArgs) return message.channel.send(argsembed);
        if (messagelength < 5) return message.channel.send('Your suggestion must at least contain 5 letters!');
        const embed = new MessageEmbed()
            .setTitle(`📜 New Suggestion from ${message.author.username}!`)
            .addField('Suggestion', msgArgs)
            .setColor("RANDOM")

        message.channel.send(embed).then(messagereaction => {
            messagereaction.react("👍");
            messagereaction.react("👎");
            messagereaction.react("😐");
            message.delete();
        })
    }
}