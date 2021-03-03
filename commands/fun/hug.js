const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "hug",
    category: "fun",
    description: "Hug a Person",

    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        let author = message.author
        const argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please mention someone you want to hug.`)
            .setColor("RANDOM")
        if (!args[1]) return message.channel.send(argsembed);
        const user = message.mentions.users.first();

        if (!user) return message.channel.send(argsembed);

        if (user == author) return message.channel.send("umarmen tust du dich nicht du trauriger!");

        let msgArgs = args.slice(1).join(" ");
        const embed = new MessageEmbed()
            .setDescription(`${author} hugs ${user.username}!`)
            .setImage('https://acegif.com/wp-content/gif/anime-hug-38.gif')
        message.channel.send(embed);
        message.delete();
    }
}