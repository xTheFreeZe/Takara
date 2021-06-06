const {
    MessageEmbed,
    NewsChannel
} = require('discord.js');

const servercheck = new Set();

module.exports = {
    name: "status",
    description: "change the status of the bot",

    run: async (client, message, PREFIX) => {

        if (servercheck.has(message.guild.id)) {
            const timemebed = new MessageEmbed()
                .setDescription("<:STT_no:778545452218974209> To prevent issues, this command has a **5 Minute** Cooldown!")
                .setColor("#FF0000")
            message.channel.send(timemebed);

        } else {

            let args = message.content.substring(PREFIX.length).split(" ");
            let newStatus = args.slice(1).join(" ");

            const newStatusembed = new MessageEmbed()
                .setTitle('Success!')
                .setDescription('<:STT_yes:778545433810173952>  Changed status to playing' + " " + "**" + newStatus + "**")
                .setColor('GREEN')

            if (!newStatus) return message.channel.send('Please provide a status!');



            client.user.setActivity(newStatus).catch(() => {
                return message.channel.send('A random error occured!');
            })

            message.channel.send(newStatusembed);

            servercheck.add(message.guild.id);
            setTimeout(() => {
                servercheck.delete(message.guild.id);
                client.user.setActivity('^help');
            }, 300000);

        }

    }
}