const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "unban",
    category: "moderation",
    description: "unbans a member from a guild",

    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        const member = args[1]


        if (!member) {
            const embed = new MessageEmbed()
                .setDescription("Please enter a valid user ID!")
                .setColor("#3342FF")
            return message.channel.send(embed);

        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(member)
            })
            const unbanembed = new MessageEmbed()
                .setDescription(`${member} has been unbanned`)
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