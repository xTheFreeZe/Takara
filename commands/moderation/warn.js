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
        let permsembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You cant use that")
            .addField("Error", 'Missing `KICK_MEMBERS`')
            .setColor("RANDOM")
        let log_channel = message.guild.channels.cache.get('780815502997454848');
        let author = message.author
        let channel = message.channel
        const argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please mention someone and provide a reason.`)
            .setColor("RANDOM")
        if (!args[1]) return message.channel.send(argsembed);
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(permsembed);
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;

        const user = message.mentions.users.first();
        const member = message.guild.member(user);

        const selfwarnembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You can not warn yourself!")
            .setColor("RANDOM")

        if (user == message.author) return message.channel.send(selfwarnembed);

        const userembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> Please mention someone!")
            .setColor("RANDOM")

        if (!user) return message.channel.send(userembed)

        let msgArgs = args.slice(2).join(" ");

        if (!msgArgs) return message.channel.send('`Reason is required!`');

        const embed = new MessageEmbed()
            .setDescription(`** ${user.tag} || WARNING **`)
            .addField('Reason:', msgArgs)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`STT Premium | Moderation`)
        message.channel.send(embed);

        const DMembed = new MessageEmbed()
            .setDescription('<:STT_yes:778545433810173952> You have been warned!')
            .addField('Server:', `${message.guild}`)
            .addField('Moderator:', `${message.author.username}`)
            .addField('Reason:', msgArgs)
            .setColor("RANDOM")
            .setTimestamp()
        user.send(DMembed);

        message.delete();
        console.log(`${member} has been warned! Provided Reason:` + " " + msgArgs);
    }
}