const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "lock",
    category: "moderation",
    run: async (client, message, args) => {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        const log_channel = message.guild.channels.cache.find(r => r.name === 'logs');
        let permsembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You cant use that")
            .addField("Error", 'Missing `MANAGE_MESSAGES`')
            .setColor("RANDOM")

        const nologembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please create a channel called `logs` before using this command!")
            .setColor("RANDOM")

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(permsembed);
        if (!log_channel) return message.channel.send(nologembed);
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })

            const logembed1 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`LOCK`)
                .addField('Moderator', `${message.author.tag}`)
                .addField('Channel', `${message.channel}`)
                .setTimestamp()


            const lockembed = new MessageEmbed()
                .setDescription('<:STT_yes:778545433810173952> Locked all channels!')
                .setColor('#229954')
            return message.channel.send(lockembed), log_channel.send(logembed1);
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                    channel.setName(channel.name.replace('🔒', ''))
                })
            })


            const unlockembed = new MessageEmbed()
                .setDescription('<:STT_yes:778545433810173952> Unlocked all channels!')
                .setColor('#229954')
            return message.channel.send(unlockembed)
        }
    }
}