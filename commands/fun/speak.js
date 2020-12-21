const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "speak",
    category: "fun",
    description: "Sends your message in an embed",

    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        let author = message.author
        if (!args[1]) return message.channel.send(`<:STT_no:778545452218974209> ${author} You need to use a second Argument! Example **^speak [your message]**`);
        //if (!msg.member.roles.cache.has('714096868178788414')) return msg.reply(`<:STT_no:778545452218974209> ${author} You can't use that!`);
        if (message.channel instanceof Discord.DMChannel) return;
        if (message.author.bot) return;

        const user = message.mentions.users.first();
        const member = message.guild.member(user);


        if (!args[1]) {
            message.channel.send('Use ^speak {your message} and the bot will re-send your message in en embed ');
            message.delete();
        }

        let msgArgs = args.slice(1).join(" ");
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription("**" + msgArgs + "**")
            .setTimestamp()
        message.channel.send(embed);
        message.delete();

    }
}