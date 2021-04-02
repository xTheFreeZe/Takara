const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "info",
    category: "information",
    description: "Gives info about the selected command!",
    run: async (client, message, args) => {

        const infoembed = new MessageEmbed()
            .setTitle('Information Command')
            .setDescription('Choose a command you want to learn more about.')
            .addField('Available Commands', '`ban`, `kick`, `lock`, `purge`, `report`, `topic`, `unban`, `warn`')
            .setFooter('Type ^info [command] to see the information')



        if (!args[0]) {

            return message.channel.send(infoembed);
        }




    }
}