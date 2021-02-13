const {
    MessageEmbed
} = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: "topic",
    category: "moderation",
    description: "Used when changing the topic",

    run: async (client, message) => {
        let author = message.author
        let channel = message.channel
        const log_channel = message.guild.channels.cache.find(r => r.name === 'logs');

        let permsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} you can't use that!`)
            .addField("Error", 'Missing `KICK_MEMBERS`')
            .setColor("RANDOM")

        const nologembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please create a channel called `logs` before using this command!")
            .setColor("RANDOM")

        if (!message.member.hasPermission('KICK_MEMBERS')) return message.delete(), message.reply(permsembed);
        if (!log_channel) return message.channel.send(nologembed);
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;
        const embed = new MessageEmbed()
            .setTitle('Watch out!')
            .setColor('#EC0808')
            .setDescription('Please make sure your conversation is relevant to the current channel!')
        message.channel.send(embed);

        const logembed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`TOPIC`)
            .addField('Moderator', `${message.author.tag}`)
            .addField('Channel', `${message.channel}`)
            .setTimestamp()

        log_channel.send(logembed);

        message.delete();
    }
}