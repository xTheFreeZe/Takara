const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "kill",
    category: "fun",
    description: "Sends a funny way of killing someone...",
    run: async (client, message, PREFIX) => {
        const user = message.mentions.users.first() || message.author;
        let author = message.author

        const messages = [
            `${message.author.username} kills ${user.username} with a knife 🔪 🩸 `,
            `${user.username} dies because of a car accident 🚗`,
            `During a party ${user.username} had a heart attack and died because if it... sagde ☹`,
            `Bruh...${user.username} just died...☠`,
            `${user.username} fell from a high place 🏙`,
            `Looks like ${user.username} played too much fortnite and just died because of it 💻`,
            `Someone did drink too much juice and ${user.username} passed out and died 🥤`,
            `${message.author.username} kills ${user.username} during an intense gun battle 🧨 🔫`,
            `A plane landed on ${user.username}... Sounds dumb but is true! ✈`,
            `A car didnt stop and crashed into ${user.username} but ${message.author.username} also dies because he laughed too hard...`,
            `STT Premium was too bored of thinking of a cool kill message so the bot just kills ${user.username} 🤖`,
            `A huge rock hits ${user.username} 😂`,
            `${user.username} got soooo old and died 🧓`,
            `${user.username} didn't look under the bed and got killed by a huge monster with long hairs 👹`,
            `Did you know you can die from being mad at a videogame? Because ${user.username} just died 💀`,
            `${user.username} thought he would be cool and strong enough to fight against a gang! He wasnt strong enough <:pepega:728525939293814785>`

        ]

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        message.channel.send(randomMessage)
    }
}