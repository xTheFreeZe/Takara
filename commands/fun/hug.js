const {
    MessageEmbed
} = require('discord.js');

const {
    axios
} = require('axios');

module.exports = {
    name: "hug",
    category: "fun",
    description: "Hug a Person",

    run: async (client, message, PREFIX) => {
        let args = message.content.substring(PREFIX.length).split(" ");
        let author = message.author

        const user = message.mentions.users.first();

        const argsembed = new MessageEmbed()
            .setDescription(`<:STT_no:778545452218974209> ${message.author.username} please mention someone you want to hug.`)
            .setColor("RANDOM")

        const errorembed = new MessageEmbed()
            .setDescription('An Error has occured!')
            .setColor('RED')

        const url = 'https://some-random-api.ml/animu/hug';

        let response, data;

        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(errorembed);
        }


        if (!args[1]) return message.channel.send(argsembed);


        if (!user) return message.channel.send(argsembed);

        if (user == author) return message.channel.send("You are hugging your self right now! PepeHands...");

        const hugembed = new MessageEmbed()
            .setTitle(`${message.author.username} hugs ${user.username}`)
            .setImage(data.link)

        await message.channel.send(hugembed);

    }
}