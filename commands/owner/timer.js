const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "timer",
    category: "owner",
    description: "Time until Bot goes offline!",

    run: async (client, message) => {


        var timeend = new Date("May 24, 2021").getTime();

        var now = new Date().getTime();

        var distance = timeend - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));




        const embed = new MessageEmbed()
            .setDescription("Time remaining:" + " " + days + " " + "Days" + " " + "and" + " " + hours + " " + "Hours ")
            .setColor('BLUE')

        message.channe.send(embed);
        console.log(distance);

    }
}