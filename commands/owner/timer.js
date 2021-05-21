const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "timer",
    category: "owner",
    description: "Time until Bot goes offline!",

    run: async (client, message) => {

        if (message.author.id !== '420277395036176405') {
            
            const permsembed = new MessageEmbed()
                .setDescription('<:STT_no:778545452218974209> Only Marwin#0001 can use this command!')
                .setColor("RANDOM")

            return message.channel.send(permsembed)
        }


        var timeend = new Date("May 24, 2021").getTime();

        var now = new Date().getTime();

        var distance = timeend - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));




        const embed = new MessageEmbed()
            .setDescription("Time remaining:" + " " + days + " " + "Days" + " " + "and" + " " + hours + " " + "Hours ")
            .setColor('BLUE')

        message.channel.send(embed);
    }
}