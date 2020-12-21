const {
    MessageEmbed, Message
} = require('discord.js');

module.exports = {
    name: "ping",
    category: "information",
    description: "Ping of the Bot",
    run: async (client, message) => {
        var ping = client.ws.ping;
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(":ping_pong: Ping of STT Premium is `" + `${ping}` + " ms`")
            .addField("`My Status`", "[Click here](https://sttproductions.statuspage.io/)", true)
        message.channel.send(embed);
        message.delete();
    }
}