const Commando = require('discord.js-commando');

module.exports = class CovidCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "covid",
            description: "Displays stats about covid-19"
        })
    }

    run = async (message, args) => {
        message.reply("works");
    }
}