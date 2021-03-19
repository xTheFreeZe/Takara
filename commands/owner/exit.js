const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "exit",
    category: "owner",
    description: "Makes the Bot leave from the current Guild!",

    run: async (client, message, PREFIX) => {
        if (message.author.id !== '420277395036176405') {
            const permsembed = new MessageEmbed()
                .setDescription('<:STT_no:778545452218974209> Only Marwin#0001 can use this command!')
                .setColor("RANDOM")

            return message.channel.send(permsembed)
        }


        var server = message.guild

        message.channel.send('Leaving... Bye!')

        console.log(`Bot left ${message.guild.name} `)

        server.leave()
    }
}