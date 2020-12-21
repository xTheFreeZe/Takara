const {
    MessageEmbed,
    Message
} = require('discord.js');

module.exports = {
    name: "help fun",
    category: "information",
    description: "Info to all help fun commands",

    run: async (client, message, PREFIX) => {
        const embed = new MessageEmbed()
            .setColor('#E16210')
            .setTitle('**Fun Commands**')
            .setDescription('`^avatar`, `^meme`, `^memeoftheday`,  `^hug`,  `^twitter`, `^website`, `^announcement`, `^server`, `^suggest`, `^join`, `^play`, `^leave`, `^report`')
            .addField('Suggestion Command:', '^suggest {suggestion} <-- try ^help suggest for more info!', true)
        msg.channel.send(embed);
    }
}