const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'unban',
    run: async (client, message, args) => {

        const log_channel = message.guild.channels.cache.find(r => r.name === 'logs');

        const nologembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please create a channel called `logs` before using this command!")
            .setColor("RANDOM")

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You are missing **BAN_MEMBERS** permission!').then(m => m.delete({
            timeout: 5000
        }));

        if (!args[0]) return message.channel.send('Please enter a users ID to unban!').then(m => m.delete({
            timeout: 5000
        }));

        if (!log_channel) return message.channel.send(nologembed);


        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send('Not a valid user!', 'Error:' + " " + e).then(m => m.delete({
                timeout: 5000
            }));
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
                message.channel.send(embed)
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