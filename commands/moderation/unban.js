const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'unban',
    run: async (client, message, args) => {

        const log_channel = message.guild.channels.cache.find(r => r.name === 'logs');

        let permsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
            .addField("Error", 'Missing `BAN_MEMBERS`')
            .setColor("RANDOM")

        const nologembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please create a channel called `logs` before using this command!")
            .setColor("RANDOM")

        const nonnumberembed = new MessageEmbed()
            .setDescription('<:STT_no:778545452218974209> int value should be a number')
            .addField('ERROR', 'Value is not snowflake!')
            .setColor('RED')

        const searchembed = new MessageEmbed()
            .setDescription('<:STT_no:778545452218974209> Not a valid user!')
            .setColor('RED')
            .addField('ERROR', 'Unknown User')

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(permsembed);

        if (!args[0]) return message.channel.send('Please enter a users ID to unban!').then(m => m.delete({
            timeout: 5000
        }));

        if (!log_channel) return message.channel.send(nologembed);

        let checknumber = parseInt(args[0]);

        let numberlength = parseInt(args[0]).length;

        if (isNaN(checknumber)) return message.channel.send(nonnumberembed);


        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            return message.channel.send(searchembed);
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({
                dynamic: true
            }));

        message.guild.fetchBans().then(bans => {

            const user = bans.find(ban => ban.user.id === member.id);

            if (user) {
                embed.setTitle(`Successfully Unbanned ${user.user.tag}`)
                    .setColor('#00ff00')
                    .addField('User ID', user.user.id, true)
                    .addField('User Tag', user.user.tag, true)
                    .addField('Banned Reason', user.reason != null ? user.reason : 'no reason')
                    .addField('Unbanned Reason', reason)
                message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))
                console.log(`${message.author.username} unbanned ${user.user.tag} on ${message.guild}.`)
            } else {
                embed.setTitle(`${member.tag} isn't banned!`)
                    .setColor('#ff0000')
                return message.channel.send(embed)
            }

            const logembed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`UNBAN  || ${user.user.tag} `)
                .addField('Moderator', `${message.author.tag}`)
                .addField('Channel', `${message.channel}`)
                .addField('Banned Reason', user.reason)
                .addField('Unbanned Reason', reason)
                .setTimestamp()

            log_channel.send(logembed);

        }).catch(e => {
            console.log(e)
            message.channel.send('An error has occurred!')
        });

    }
}