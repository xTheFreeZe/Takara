const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "unban",
    category: "moderation",
    description: "unbans a member from a guild",

    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        let permsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
            .addField("Error", 'Missing `BAN_MEMBERS`')
            .setColor("RANDOM")
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(permsembed);
        const user = args[1]


        if (!user) {
            const embed = new MessageEmbed()
                .setDescription("Please enter a valid user ID!")
                .setColor("#3342FF")
            return message.channel.send(embed);

        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(user)
            })
            const unbanembed = new MessageEmbed()
                .setDescription(`${user} has been unbanned`)
                .setColor("#7CFC00")
            await message.channel.send(unbanembed);

        } catch (e) {
            const errembed = new MessageEmbed()
                .setDescription("Something has happened and I could not unban this Member")
                .setColor("#DC143C")

            return message.channel.send(errembed);
        }

    }
}