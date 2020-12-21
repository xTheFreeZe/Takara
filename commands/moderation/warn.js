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
        let permsembed = new MessageEmbed()
            .setDescription("<:STT_no:778545452218974209> You cant use that")
            .addField("Error", 'Missing Permissions')
            .setColor("RANDOM")
        let log_channel = message.guild.channels.cache.get('780815502997454848');
        if (!args[1]) return message.channel.send(`<:STT_no:778545452218974209> ${author} You need to use 3 Arguments. Example **^warn @person [reason]**`);
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(permsembed);
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;
        let channel = message.channel

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
            .setDescription(`<:STT_yes:778545433810173952> ${author} warned ${member}| Reason:` + "**" + msgArgs + "**")
            .setColor('RANDOM')
            .setFooter(`${member} has been warned`)
        message.channel.send(embed);
        //log_channel.send(logembed);
        message.delete();
        console.log(`${member} has been warned! Provided Reason:` + " " + msgArgs);
    }
}