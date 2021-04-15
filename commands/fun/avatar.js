const {
    MessageEmbed
} = require('discord.js');


module.exports = {
    name: "avatar",
    category: "fun",
    description: "sends the avatar of a user",

    run: async (client, message, PREFIX) => {
        let author = message.author
        const user = message.mentions.users.first() || message.author;

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("STT Premium | Fun", client.user.avatarURL())
            .setTitle(`${user.tag}'s avatar:`)
            .setImage(user.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 1024
            }))
        message.channel.send(embed);
    }
}