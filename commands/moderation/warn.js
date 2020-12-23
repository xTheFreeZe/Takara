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


        if (!args[1]) {
            message.channel.send('<:STT_no:778545452218974209> Use ^warn {@person} (reason) and `STT Premium` will warn the Person you mentioned.  ');
            message.delete();
        }

        let msgArgs = args.slice(2).join(" ");
        // let logembed = new MessageEmbed()
        //   .setColor("RANDOM")
        // .setDescription(`**WARN** | ${member}`)
        //.addField(`Moderator:`, `${author}`)
        //.addField(`Channel: `, `${channel}`)
        //.addField(`Reason:`, `error`)
        //.setThumbnail(msg.author.displayAvatarURL())
        //.setTimestamp()
        const embed = new MessageEmbed()
            .setDescription(`<:STT_yes:778545433810173952> ${message.author.username} warned ${member}`)
            .addField('Reason:', "**" + msgArgs + "**")
            .setColor('RANDOM')
            .setFooter(`STT Premium | Moderation`)
        message.channel.send(embed);
        //log_channel.send(logembed);
        message.delete();
        console.log(`${member} has been warned! Provided Reason:` + " " + msgArgs);
    }
}