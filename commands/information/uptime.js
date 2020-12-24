const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "uptime",
    category: "information",
    description: "Uptime of the bot",
    run: async(client, message, PREFIX, Discord) => {
        let author = message.author
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        const embed = new MessageEmbed()
            .setDescription(`The bot has been online for ${uptime}`)
            .setColor('RANDOM')
            .setFooter('STT Premium | Information')
            .setTimestamp()
        message.channel.send(embed);
    }
}