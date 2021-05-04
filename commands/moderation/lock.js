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
        let reason = args[1] ? args.slice(1).join(" ") : 'no reason';

        const desccontentfirstembed = [
            "**Using the** `lock` **command**",
            " ",
            " ",
            "`^lock on` to lock all channels",
            " ",
            "`^lock off` to unlock all channels!",
            " ",
            " ",
            `STT Premium | Information | ${message.author.username} `
        ]

        let permsembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You cant use that")
            .addField("Error", 'Missing `MANAGE_MESSAGES`')
            .setColor("RANDOM")

        let errorembed = new MessageEmbed()
            .setTitle('Error')
            .setDescription('<:STT_no:778545452218974209> Unknown Command!')
            .addField(`Don't know what to use?`, 'Try `^lock on` or `^lock off`')
            .setColor('RED')

        let firstmessageembed = new MessageEmbed()
            .setDescription(desccontentfirstembed)
            .setColor('YELLOW')


        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(permsembed);

        if (!args[0]) {

            message.channel.send(firstmessageembed);

        } else if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔐`)
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
                    channel.setName(channel.name.replace('🔐', ''))
                })
            })


            const unlockembed = new MessageEmbed()
                .setDescription('<:STT_yes:778545433810173952> Unlocked all channels!')
                .setColor('#229954')
            return message.channel.send(unlockembed)

        } else {

            return message.channel.send(errorembed);

        }
    }
}