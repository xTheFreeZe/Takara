const {
    MessageEmbed,
    Message
} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: "warn",
    category: "moderation",
    description: "Warns a Member",
    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        const log_channel = message.guild.channels.cache.find(r => r.name === 'logs');
        let permsembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You cant use that")
            .addField("Error", 'Missing `KICK_MEMBERS`')
            .setColor("RANDOM")
        const nologembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please create a channel called `logs` before using this command!")
            .setColor("RANDOM")

        const STTwarnembed = new MessageEmbed()
            .setDescription('<:STT_no:778545452218974209> You can not warn the Bot with this command!')
            .setColor('RED')

        let author = message.author
        let channel = message.channel
        const argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please mention someone and provide a reason.`)
            .setColor("RANDOM")
        if (!args[1]) return message.channel.send(argsembed);
        if (!log_channel) return message.channel.send(nologembed);
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(permsembed);
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;

        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        const STTPremium = client.users.cache.get('749889822214324236')

        const selfwarnembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You can not warn yourself!")
            .setColor("RANDOM")

        if (user == message.author) return message.channel.send(selfwarnembed);

        const userembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please mention someone!")
            .setColor("RANDOM")

        if (!user) return message.channel.send(userembed);

        if (user == STTPremium) return message.channel.send(STTwarnembed);

        let msgArgs = args.slice(2).join(" ");

        if (!msgArgs) return message.channel.send(argsembed);


        const embed = new MessageEmbed()
            .setDescription(`** WARNING || ${user.tag} **`)
            .addField('Reason:', msgArgs)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`STT Premium | Moderation`)
        message.channel.send(embed);

        const logembed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`WARNING || ${user.tag}`)
            .addField('Moderator', `${message.author.tag}`)
            .addField('Channel', `${message.channel}`)
            .addField('Reason', msgArgs)
            .setTimestamp()

        log_channel.send(logembed);

        const DMembed = new MessageEmbed()
            .setTitle("<:STT_yes:778545433810173952> You have been warned!")
            .addField('Server:', `${message.guild}`)
            .addField('Moderator:', `${message.author.username}`)
            .addField('Reason:', msgArgs)
            .setColor("RANDOM")
            .setTimestamp()
        user.send(DMembed).catch((e) => {
            message.channel.send('An unexpected error occured! See : ' + " " + e);
            log_channel.send('DM was not sent! The user may have disabled DMs or the user was a Bot!');
        })

        message.delete();
        console.log(`${member} has been warned! Provided Reason:` + " " + msgArgs);
    }
}