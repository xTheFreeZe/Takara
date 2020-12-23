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
        let permsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} you can't use that!`)
            .addField("Error", 'Missing `KICK_MEMBERS`')
            .setColor("RANDOM")
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.delete(), message.reply(permsembed);
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;
        //let log_channel = message.guild.channels.cache.get('780815502997454848');
        //let logembed = new MessageEmbed()
        //  .setDescription("**TOPIC**")
        // .addField('Moderator', `${author}`)
        //.addField('Channel', `${channel}`)
        //.setThumbnail(msg.author.displayAvatarURL())
        //.setColor("RANDOM")
        //.setTimestamp()
        //log_channel.send(logembed);   
        const embed = new MessageEmbed()
            .setTitle('Watch out!')
            .setColor('#EC0808')
            .setDescription('Please make sure your conversation is relevant to the current channel!')
        message.channel.send(embed);
        message.delete();
    }
}