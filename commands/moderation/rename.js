const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "rename",
    category: "moderation",
    description: "rename a mentioned user!",

    run: async (client, message, PREFIX) => {

        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        let args = message.content.substring(PREFIX.length).split(" ");
        let newName = args.slice(2).join(" ");

        const noArgsone = new MessageEmbed()
            .setTitle('Oops, you are missing something!')
            .setColor('RED')
            .setDescription('<:STT_no:778545452218974209> Please mention someone and provide a new Nickname for them!')

        const noUser = new MessageEmbed()
            .setTitle('Oops, you are missing something!')
            .setColor('RED')
            .setDescription('<:STT_no:778545452218974209> Please mention someone!')

        const noNewName = new MessageEmbed()
            .setTitle('Oops, you are missing something!')
            .setColor('RED')
            .setDescription('<:STT_no:778545452218974209> Please provide a new Nickname!')

        if (!args[1]) {

            return message.channel.send(noArgsone);

        }

        if (!user) {

            return message.channel.send(noUser);

        }

        if (!newName) {

            return message.channel.send(noNewName);

        }

        const successembed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Success!')
            .setDescription(`<:STT_yes:778545433810173952> Successfully renamed ${user.username} to ${newName}`)
            .setTimestamp()
            .setFooter('Takara | Moderation')

        member.setNickname(newName, `${message.author.username} renamed ${user.username} with ^rename`).catch(() => {
            message.channel.send('error');
        })

        message.channel.send(successembed)

    }
}