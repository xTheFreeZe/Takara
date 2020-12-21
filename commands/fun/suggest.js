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
        const argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please provide a suggestion.`)
            .setColor("RANDOM")
        if (!args[1]) return message.channel.send(argsembed);
        const embed = new MessageEmbed()
            .setDescription("📃 " + `New Suggestion from ${author}:` + " " + "**" + msgArgs + "**")
            .setColor("RANDOM")



        if (!args[1]) {
            message.channel.send("No!");
        }

        message.channel.send(embed).then(messagereaction => {
            messagereaction.react("👍");
            messagereaction.react("👎");
            messagereaction.react("😐");
            message.delete();
        })
    }
}