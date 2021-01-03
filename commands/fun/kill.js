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
            `${message.author.username} kills ${user.username} with a knif 🔪 🩸 `,
            `${user.username} dies because of a car accident 🚗`,
            `During a party ${user.username} had a heart attack and died because if it... sagde ☹`,
            `Bruh...${user.username} just died...☠`,
            `${user.username} fell from a high place 🏙`,
            `Looks like ${user.username} played too much fortnite and just died because of it 💻`,
            `Someone did drink too much juice and ${user.username} passed out and died 🥤`,
            `${message.author.username} kills ${user.username} during an intense gun battle 🧨 🔫`,
        ]

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        message.channel.send(randomMessage)
    }
}