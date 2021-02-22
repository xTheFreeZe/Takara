const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "log",
    category: "information",
    description: "checks if a log channel is there",
    run: async (client, message, args) => {
        const log_channel = message.guild.channels.cache.find(r => r.name === 'logs')

        const logyes = new MessageEmbed()
            .setColor('#00FF00')
            .setDescription('<:STT_yes:778545433810173952> There is a log channel!')
            .setFooter('All Mod commands can be used!')

        const logno = new MessageEmbed()
            .setColor("#FF0000")
            .setDescription('<:STT_no:778545452218974209> There is **no** log channel!')
            .setFooter('No Mod commands can be used!')

        if (!log_channel) return message.channel.send(logno);

        log_channel.send(`This is a test message, see ${message.channel}!`);
        
        message.channel.send(logyes);
    }
}