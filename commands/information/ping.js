const {
    MessageEmbed,
    Message
} = require('discord.js');

module.exports = {
    name: "ping",
    category: "information",
    description: "Ping of the Bot",
    run: async (client, message) => {

        var ping = client.ws.ping;

        let highping = ping > 100;

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(":ping_pong: Ping of STT Premium is `" + `${ping}` + " ms`")
            .addField("`My Status`", "[Click here](https://sttproductions.statuspage.io/)", true)
        message.channel.send(embed);
        if (highping) message.channel.send('High Ping detected! This could lead to slow messages. If the ping isnt at 90 - 110 in an Hour, please check out the Status Page of the Bot too see if everything is normal!');
        message.delete();
    }
}