const {
    MessageEmbed,
    MessageFlags
} = require('discord.js');

module.exports = {
    name: "lock",
    category: "moderation",
    run: async (client, message, args) => {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        let reason = args[2] ? args.slice(2).join(" ") : 'no reason';
        let permsembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You cant use that")
            .addField("Error", 'Missing `MANAGE_MESSAGES`')
            .setColor("RANDOM")


        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(permsembed);
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })


            const lockembed = new MessageEmbed()
                .setDescription('<:STT_yes:778545433810173952> Locked all channels!')
                .addField('Reason', reason)
                .setColor('#229954')
            return message.channel.send(lockembed);
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

        } else if (args[0] === 'spam') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })

                const spamembed = new MessageEmbed()
                    .setDescription('<:STT_yes:778545433810173952> Locked all channels!')
                    .addField('Reason', 'Due to spam, this channel is currently locked!')
                    .setColor('#229954')

                return message.channel.send(spamembed);
            })

        }
    }
}