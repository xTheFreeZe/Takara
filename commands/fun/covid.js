const fetch = require('node-fetch');

const Discord = require('discord.js');

const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "covid",
    desciption: "Displays stats for covid-19",

    async run(client, message, args) {
        let countries = args.join(" ");

        const noArgs = new MessageEmbed()
            .setTitle('Missing arguments')
            .setColor("0xFF0000")
            .setDescription('You are missing some args (ex: ^covid all || ^covid Canada)')
            .setTimestamp()

        if (!args[0]) return message.channel.send(noArgs);

        if (args[0] === 'all') {
            fetch(`https://covid19.mathdro.id/api`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()
                    let lastUpdate = data.lastUpdate.toLocaleString()
                    let picture = data.image.toLocaleString()

                    const embed = new MessageEmbed()
                        .setTitle(`Worldwide COVID-19 Stats 🌍`)
                        .addField('Confirmed Cases', confirmed)
                        .addField('Recouvered', recovered)
                        .addField('Deaths', deaths)
                        .addField('Last Updated', lastUpdate)
                        .setImage(picture)

                    message.channel.send(embed)

                })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()
                    let lastUpdate = data.lastUpdate.toLocaleString()
                    let picture = data.image.toLocaleString()

                    const embed = new MessageEmbed()
                        .setTitle(`COVID-19 Stats for **${countries}** 💉`)
                        .addField('Confirmed Cases', confirmed)
                        .addField('Recouvered', recovered)
                        .addField('Deaths', deaths)
                        .addField('Last Updated', lastUpdate)
                        .setThumbnail(picture)


                    message.channel.send(embed)

                }).catch(e => {
                    return message.channel.send('Invalid country!')
                })
        }
    }
}