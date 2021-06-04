const {
    MessageEmbed,
    NewsChannel
} = require('discord.js');

module.exports = {
    name: "status",
    description: "change the status of the bot",

    run: async (client, message, PREFIX) => {

        if (message.author.id !== '420277395036176405') {
            const permsembed = new MessageEmbed()
                .setDescription('<:STT_no:778545452218974209> Only Marwin#0001 can use this command!')
                .setColor("RANDOM")

            return message.channel.send(permsembed);
        }

        let args = message.content.substring(PREFIX.length).split(" ");
        let newStatus = args.slice(1).join(" ");

        const newStatusembed = new MessageEmbed()
            .setTitle('Success!')
            .setDescription('<:STT_yes:778545433810173952>  Changed status to playing' + " " + "**" + newStatus+ "**")
            .setColor('GREEN')

        if (!newStatus) return message.channel.send('Please provide a status!');



        client.user.setActivity(newStatus).catch(() => {
            return message.channel.send('A random error occured!');
        })

        message.channel.send(newStatusembed);

    }
}