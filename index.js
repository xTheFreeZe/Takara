const Discord = require('discord.js');
const {
    Client,
    MessageEmbed
} = require('discord.js');
const client = new Discord.Client();
const {
    PREFIX,
} = require('./config.json');

const got = require('got');


/*
const activities_list = [
    "with friends",
    "Overwatch",
    "in a Tournament",
    "with JavaScript",
    "^help",
    "with premium",
    "games",
    "games with friends",
    "Overwatch ranked",
    "in the Syntax Terror Tournaments",
    "Overwatch with friends",
    "nothing",
    "Apex Legends",
    "in a three Squad",
    "Fall Guys",
    "Hearthstone"

];
*/


client.on('ready', () => {
    console.log("STT Premium is ready!")
    client.user.setActivity('^help')
    /*
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 40000);
    */
});




client.setMaxListeners(1000);

const {
    Collection
} = require("discord.js");

client.commands = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on('message', async message => {

    let PREFIX = '^';

    if (!message.guild) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);

    if (command)
        command.run(client, message, args);

})

client.on("guildCreate", guild => {
    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
        for (let key in channels) {
            let c = channels[key];
            if (c[1].type === "text") {
                channelID = c[0];
                break channelLoop;
            }
        }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    const embed = new MessageEmbed()
        .setDescription(`Thanks for inviting me to your Server!`)
        .setColor("RANDOM")
    var ping = client.ws.ping;
    const helpembed = new MessageEmbed()
        .setColor('#e2b007')
        .setTitle('Get started with:')
        .setDescription('My prefix is `^`')
        .setThumbnail('https://cdn.discordapp.com/attachments/681060754564448257/841419896797528064/unknown.png')

        .addField('`^help fun`', 'Fun commands')

        .addField('`^help mod`', 'Commands for staff')

        .addField('`^help dev`', 'Developer options')

        .addField('Takara', 'Marwin | 2021')

        .setFooter('Type ^help for more information')

    const logembed = new MessageEmbed()
        .setDescription('Please create a channel called `logs` so you can use all mod commands!')
        .setColor("RANDOM")


    if (!channel) return;


    channel.send(embed);
    channel.send(helpembed);
    channel.send(logembed);
});

client.on('guildCreate', (guild) => {

    const embed = new MessageEmbed()
        .setTitle('Joined new server')
        .addField('Guild Info', `${guild.name}`)
        .addField('Server ID', `${guild.id}`)
        .addField('Members', `This Server has **${guild.memberCount}** members`)


        .setThumbnail(guild.iconURL({
            dynamic: true
        }))
        .setColor('RANDOM')

    let joinreportchannel = client.channels.cache.get('821393308378464287');

    joinreportchannel.send(embed);

})

/* 

client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");

    if (!channel) return console.log('welcome return.')

    const content = [
        `**Welcome to the server ${member}!** `,
        `**Remember to read the rules in <#753238962050695228>.**`,2
        `*You can assign yourself the roles you want in <#822811391240962048>*`

    ]

    const welcomeembed = new MessageEmbed()
        .setTitle(`Welcome to the 2ez Community Server`)
        .setDescription(content)
        .setImage('https://cdn.discordapp.com/attachments/821393051561361493/830127085414252565/2ez_banner_3.png')
        .setColor('RANDOM')

    channel.send(welcomeembed);


})

*/
/*

client.on('guildMemberAdd', async member => {

    const channel = client.channels.cache.get('821393308378464287');

    if (!channel) return console.log('welcome returned.')

    const content = [
        `Remember to read the rules in <#753238962050695228>.`,
        ` `,
        `You can assign yourself the roles you want in <#822811391240962048>`

    ]

    const welcomeembed = new MessageEmbed()
        .setTitle(`Welcome to the 2ez Community Server!`)
        .setDescription(content)
        .setImage('https://cdn.discordapp.com/attachments/821393051561361493/830127085414252565/2ez_banner_3.png')
        .setColor('RANDOM')

    channel.send(`Welcome to the Server ${member}!`, welcomeembed);


})

*/



client.on("message", msg => {
    if (msg.content === "^help ban err") {
        let author = msg.author
        let channel = msg.channel
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Troubleshooting")
            .setDescription("**Ban Error:**")
            .addField('1.)', 'Make sure the bot has the permissions to ban someone.')
            .addField(' 2.)', 'Make sure you have a role that can ban people.')
            .addField("Available info:", '`BOT PERMISSIONS [549]` > `MESSAGE RETURNED [549]` > `SENT INTO LOGS[587]`')
            .setFooter(`Takara | Troubleshooting | ${msg.author.username}`)
            .setTimestamp()
        msg.reply(embed)
    }
})



client.on('message', msg => {
    if (msg.content === "^delay 10") {
        const embed = new MessageEmbed()
            .setDescription(':white_check_mark: Successfully edited.')
            .setFooter('            }, 1000)')
        msg.reply('Message edit in 10 seconds')
            .then((msg) => {
                setTimeout(function () {
                    msg.edit(embed);
                }, 10000)
            });
    }
})

client.on('message', msg => {
    if (msg.content === "^delay 20") {
        const embed = new MessageEmbed()
            .setDescription(':white_check_mark: Successfully edited.')
            .setFooter('            }, 2000)')
        msg.reply('Message edit in 20 seconds')
            .then((msg) => {
                setTimeout(function () {
                    msg.edit(embed);
                }, 20000)
            });
    }
})



client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let author = msg.author

    switch (args[0]) {
        case "permissions":
            let author = msg.author
            let permsembed = new MessageEmbed()
                .setDescription("<:STT_no:778545452218974209> You can not use that!")
                .addField('Error', 'Missing `MANAGE_MESSAGES`')
                .setColor("RANDOM")
            if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply(permsembed);
            const embed = new MessageEmbed()
                .setDescription('**Permissions Check**')
                .setColor("RANDOM")
                .addField('Roles', '`^permsroles @Member`')
                .addField('Kick', '`^permskick @Member`')
                .addField('Message', '`^permsmsg @Member`')
                .setFooter(`Request: ${msg.author.username}`)
            msg.channel.send(embed);


    }
})



client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");


    switch (args[0]) {
        case "permskick":
            const user = msg.mentions.users.first() || msg.author;
            const member = msg.guild.member(user);
            const embed = new MessageEmbed()
                .setDescription(`<:STT_yes:778545433810173952> ${user.username} can kick people!`)
                .setFooter(`Request: ${msg.author.username}`)
                .setColor("#00FF00")
            let permsembed = new MessageEmbed()
                .setDescription(`<:STT_no:778545452218974209> ${user.username} can not kick people!`)
                .setFooter(`Request: ${msg.author.username}`)
                .setColor("#FF0000")
            if (!member.hasPermission('KICK_MEMBERS')) return msg.delete(), msg.channel.send(permsembed);


            msg.channel.send(embed);
            msg.delete();

    }
})


client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case "permsmsg":
            const user = msg.mentions.users.first() || msg.author;
            const member = msg.guild.member(user);
            const embed = new MessageEmbed()
                .setDescription(`${user.username} can manage Messages!`)
                .setFooter(`Request: ${msg.author.username}`)
                .setColor("#00FF00")
            let permsembed = new MessageEmbed()
                .setDescription(`${user.username} can not manage Messages!`)
                .setFooter(`Request: ${msg.author.username}`)
                .setColor("#FF0000")
            if (!member.hasPermission('MANAGE_MESSAGES')) return msg.delete(), msg.channel.send(permsembed);

            msg.channel.send(embed);

    }
})

client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case "permsroles":
            const user = msg.mentions.users.first() || msg.author;
            const member = msg.guild.member(user);
            const embed = new MessageEmbed()
                .setDescription(`<:STT_yes:778545433810173952> ${user.username} can manage Roles!`)
                .setFooter(`Request: ${msg.author.username}`)
                .setColor("#00FF00")
            let permsembed = new MessageEmbed()
                .setDescription(`<:STT_no:778545452218974209> ${user.username} can not manage Roles!`)
                .setFooter(`Request: ${msg.author.username}`)
                .setColor("#FF0000")
            if (!member.hasPermission('MANAGE_ROLES')) return msg.delete(), msg.channel.send(permsembed);

            msg.channel.send(embed);
            msg.delete();

    }

})





//predict command (just the talk command with reactions)
client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let author = msg.author

    switch (args[0]) {
        case "pred":
            if (!args[1]) return msg.channel.send(`<:STT_no:778545452218974209> ${author} You need to use a second argument. Example **^pred Team vs Team**`);
            const user = msg.mentions.users.first();
            let msgArgs = args.slice(1).join(" ");
            let voteembed = new MessageEmbed()
                .setDescription("**" + msgArgs + "**")
                .setColor("RANDOM")
            const embed = new MessageEmbed()
                .setColor('0xFFC300')
                .setDescription('^pred {team vs team} and the bot will react with 👍 👎')


            if (!args[1]) {
                msg.channel.send(embed);
            }

            msg.channel.send(voteembed).then(messagereaction => {
                messagereaction.react("◀");
                messagereaction.react("▶");
                msg.delete();
            })

            break;



    }
})







client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");


    switch (args[0]) {
        case "fix":
            const user = msg.mentions.users.first();

            let msgArgs = args.slice(1).join(" ");
            const embed = new MessageEmbed()
                .setColor('#7CFC00')
                .setTitle('Problem fixed!')
                .setDescription("<:STT_yes:778545433810173952>" + "**" + msgArgs + "**")
            msg.channel.send(embed);
            msg.delete();

            break;



    }
})

client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let author = msg.author
    let channel = msg.channel

    switch (args[0]) {
        case "devreport":
            const user = msg.mentions.users.first();
            const member = msg.guild.member(user);
            let msgArgs = args.slice(1).join(" ");
            const embed = new MessageEmbed()
                .setDescription(`<:STT_yes:778545433810173952> Your Report has been opened and is being worked on!`)
                .setFooter("Thank you for making STT Premium a better bot to use!")
                .setColor('RANDOM')
            msg.channel.send("Okay!");
            let report_embed = new MessageEmbed()
                .setDescription(`New Report from ${author} in ${channel} from ${msg.guild}:` + " " + msgArgs)
                .setColor("RANDOM")
            member.send(embed);
            console.log(`Answer has been sent to ${user.username}`);
            msg.delete();


            break;



    }
})



client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");


    switch (args[0]) {
        case "bug":
            const user = msg.mentions.users.first();

            let msgArgs = args.slice(1).join(" ");
            const embed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('<:STT_no:778545452218974209> Reported Problem')
                .setDescription("**" + msgArgs + "**")
            msg.channel.send(embed);
            msg.delete();

            break;



    }
})


client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");


    switch (args[0]) {
        case "devcommand":
            const user = msg.mentions.users.first();

            let msgArgs = args.slice(1).join(" ");
            const embed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('A command is temporarily unavailable')
                .setDescription("**" + msgArgs + "**")
                .setTimestamp();
            msg.channel.send(embed);
            msg.delete();

            break;



    }
})

client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");


    switch (args[0]) {
        case "shutdown":
            const user = msg.mentions.users.first();

            let msgArgs = args.slice(1).join(" ");
            const embed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('ERROR')
                .setDescription("**" + msgArgs + "**")
                .setTimestamp();
            msg.channel.send(embed);
            msg.delete();

            break;



    }
})

client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");


    switch (args[0]) {
        case "update":
            const user = msg.mentions.users.first();

            let msgArgs = args.slice(1).join(" ");
            const embed = new MessageEmbed()
                .setTitle('New Update!')
                .setColor('RANDOM')
                .setDescription("**" + "<:STT_yes:778545433810173952>" + msgArgs + "**")
            msg.channel.send(embed);
            msg.delete();

            break;



    }
})


client.on("message", msg => {
    if (msg.content === "^system") {
        let channel = msg.channel
        let author = msg.author
        var ping = client.ws.ping;
        const embed = new MessageEmbed()
            .setDescription("**Author**")
            .addField(`Message from:`, `${author}`)
            .addField(`Channel:`, `${channel}`)
            .addField(`Server:`, `${msg.guild}`)
        let botembed = new MessageEmbed()
            .setDescription("**Bot**")
            .addField('Ping:', `${ping} ms`)
            .addField(`Framework:`, `Node.js`)
            .addField(`Slug size:`, `26.1 MiB`)
            .addField(`Stack`, `heroku-20`)
        msg.channel.send(embed);
        msg.channel.send(botembed);

    }
})


client.on('message', msg => {
    if (msg.content === "^outage ping") {
        const embed = new MessageEmbed()
            .setColor('#ffd700')
            .setAuthor('Temporary outage')
            .setDescription('<:STT_no:778545452218974209> The bot is having latency problems!')
            .setFooter('Please be patient as I am working on it')
        msg.channel.send(embed);
        msg.delete()
    }
})


client.on("message", msg => {
    if (msg.content === "^outage gone") {
        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(':white_check_mark: All Systems operational')
            .setDescription('All errors have been resolved and the STT Bot is online again!')
            .setFooter('Thank you for your patience.')
        msg.channel.send(embed);
        msg.delete();
    }
})


client.on("message", msg => {
    if (msg.content === "^online") {
        var ping = client.ws.ping;
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription('<:STT_yes:778545433810173952> Syntax Terror Premium bot is online!')
            .addField("`My Status`", "[Click here](https://sttproductions.statuspage.io/)", true)
            .setFooter("Ping of STT Premium is " + `${ping}` + " ms")
        msg.channel.send(embed);
    }
})




client.on('message', msg => {
    if (msg.content === "^whypremium") {
        const embed = new MessageEmbed()
            .setColor('#EFEC26')
            .setThumbnail(msg.author.displayAvatarURL())
            .setDescription('You may ask yourself : **Why should I use the Premium Version?** Here are some perks you get:')
            .addField('Perks you get:', '`faster answers` `premium commands` `a Ban command`')
            .setFooter('Premium Commands: VC commands. The Suggestion command.')
        msg.reply(embed);
        msg.delete();

    }
})

client.on('message', msg => {
    if (msg.content === "^help suggest") {
        const embed = new MessageEmbed()
            .setColor('#F613A4')
            .setThumbnail('https://cdn.discordapp.com/attachments/681060754564448257/794509069867286528/stt-premium-logo.jpg')
            .setDescription('Here is how to use the `^suggest` command:')
            .addField('Type ^suggest [suggestion ]  to start a poll.', 'Example: ^suggest Is this cool?', true)
        msg.channel.send(embed);

    }
})

client.on('message', msg => {
    if (msg.content === "^help ban") {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail('https://cdn.discordapp.com/attachments/681060754564448257/794509069867286528/stt-premium-logo.jpg')
            .setDescription('Here is how to use the `^ban` command:')
            .addField('Type `^ban @[member] {reason}`', 'Example: `^ban @Marwin#8376 Dont use this word!`', true)
        msg.channel.send(embed);
    }
})

client.on('message', async message => {
    if (!message.guild) return;
    if (message.content === '^join') {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const embed = new MessageEmbed()
                .setDescription('<:STT_yes:778545433810173952> I joined your voice channel!')
                .setColor('#15DB1B')
            message.reply(embed);
            console.log(`I joined a Voice Channel`);
            message.react('👍')

        } else {
            const embed = new MessageEmbed()
                .setDescription('<:STT_no:778545452218974209> Please enter a voice channel and try `^join` again!')
                .setColor('#E8EE17')
            message.reply(embed);
            message.react('👎');
        }
    }
});


client.on('message', async message => {
    if (!message.guild) return;
    if (message.content === '^leave') {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.leave();
            const embed = new MessageEmbed()
                .setDescription('<:STT_yes:778545433810173952> I left your voice Channel!')
                .setColor('#15DB1B')
            message.channel.send(embed);
            console.log(`I left a Voice Channel`);
            message.react('👍')
        } else {
            const embed = new MessageEmbed()
                .setDescription('<:STT_no:778545452218974209> I could not leave this Voice Channel')
                .setColor('#E8EE17')
            message.reply(embed);
            message.react('👎')
        }
    }

});

client.on('message', msg => {
    if (msg.content.includes("^play")) {
        let user = msg.mentions.users.first();
        msg.channel.send("This doesn't work yet but we are working on it 🔨 🔧");




    }

})

client.on('message', msg => {
    if (msg.content === "^lite is live") {
        msg.channel.send("No longer supported!");
        msg.delete();

    }
})

client.on('message', msg => {
    if (msg.content === "^james is live") {
        msg.channel.send("No longer supported!");
        msg.delete();

    }
})

client.on('message', msg => {
    if (msg.content === "^sledgy is live") {
        msg.channel.send("No longer supported!");
        msg.delete();

    }
})



client.on("message", msg => {
    if (msg.content === "^twitter") {
        msg.channel.send('This is our twitter: https://twitter.com/SyntaxTerror_T');
    }
})

client.on('message', msg => {
    if (msg.content === "^website") {
        const embed = new MessageEmbed()
            .setTitle(':wrench: This our Battlefy Page :tools:')
            .setColor('#E42162')
            .setThumbnail('https://cdn.discordapp.com/attachments/681060754564448257/794509069867286528/stt-premium-logo.jpg')
            .setDescription('Sign up here if you want to be part of our Overwatch Tournaments! https://battlefy.com/syntax-terror-tournaments')
        msg.channel.send(embed);

    }
})

client.on('message', msg => {
    if (msg.content === "^twitter2") {
        const embed = new MessageEmbed()
            .setTitle('Our twitter Team')
            .setColor('#E42162')
            .setThumbnail('https://cdn.discordapp.com/attachments/681060754564448257/794509069867286528/stt-premium-logo.jpg')
            .setDescription('Twitter Accounts of Teams we partner with:')
            .addField('Willy Wonky Wankers', 'https://twitter.com/WWonkyW', true)
        msg.channel.send(embed);

    }
})

client.on('message', msg => {
    if (msg.content === "^announcement") {
        const embed = new MessageEmbed()
            .setTitle(':satellite: New Announcement :satellite: ')
            .setColor('#CE3CDF')
            .setDescription('Nothing new here... [silence]')
        msg.channel.send(embed);
        msg.delete();

    }
})


client.on("message", msg => {
    if (msg.content === "^maintenance") {
        const embed = new MessageEmbed()
            .setDescription("Be sure to be informed about the new Update today! [Click here](https://sttproductions.statuspage.io/)")
            .setImage("https://cdn.discordapp.com/attachments/681060754564448257/789115373998964777/unknown.png")
            .setColor("RANDOM")
        msg.channel.send(embed);
    }
})

client.on('message', msg => {
    if (msg.content === "^server") {
        const embed = new MessageEmbed()
            .setTitle(':boom: Click on me to get on our Server! :boom:')
            .setColor('#E81B63')
            .setURL('https://discord.gg/K6WVPb8')

        msg.channel.send(embed);

    }
})

//let owner = msg.author.id == '420277395036176405';
//const permsembed = new MessageEmbed()
//  .setDescription("This command is under Maintenance!")
// .setFooter("Owner only [1082]")
// .setColor("RANDOM")
//if (!owner) return msg.channel.send(permsembed);


client.on('message', msg => {
    if (msg.content.includes("Hello")) {
        let user = msg.mentions.users.first();
        msg.react('👋')


    }

})


client.on('message', msg => {
    if (msg.content.includes("hello")) {
        let user = msg.mentions.users.first();
        msg.react('👋')


    }

})

client.on('message', (message) => {
    if (message.content === "^staff") {
        let user = message.mentions.users.first();
        let author = message.author
        message.channel.send(`<@&770312766534975509>, ${author} needs your help!`);
    }
});

client.on('message', (message) => {
    if (message.content === "^cute") {
        if (!message.member.roles.cache.has('768952204509052979')) return message.reply("You dont have the CUTIE Role! <:pepehands:720340479576768552> ");
        let user = message.mentions.users.first();
        let author = message.author
        message.channel.send(`<@&768952204509052979>, ${author} wants some cuties in the chat!!`);
    }
});

client.on("message", msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let msgArgs = args.slice(1).join(" ");
    if (msg.content === "^welcome new") {
        const embed = new MessageEmbed()
            .setImage("https://cdn.discordapp.com/attachments/681060754564448257/778525893857378314/cdf09b00aea778cb509aafc4cccc4e77.png")
            .setTitle("Welcome to the Server!")
            .setDescription(`Welcome to ${msg.guild}! Thank you for being here!`)
            .addField('Owner', '<@!409080789435809802>', true)
            .addField('Admin', '<@!420277395036176405> and <@!334681592293490688>', true)
        msg.channel.send("@everyone")
            .then((msg) => {
                setTimeout(function () {
                    msg.edit(embed);
                }, 1000)
            });
    }
})


client.on("message", msg => {
    if (msg.content === "^serverba") {
        msg.reply(" join please!!!! :pleading_face: https://discord.gg/FbvCGrF");
    }
})


client.on('message', msg => {
    if (msg.content.includes("^nichtwarnLOL")) {
        let user = msg.mentions.users.first();
        let author = msg.author
        const embed = new MessageEmbed()
            .setDescription(`${author} Error **5482f4186**`)
            .setFooter('Type in your Error Code to see what is the Problem')
        msg.channel.send(embed);
        msg.delete();


    }

})

client.on('message', msg => {
    if (msg.content.includes("47516544sda")) {
        let user = msg.mentions.users.first();
        let author = msg.author
        const embed = new MessageEmbed()
            .setDescription(`${author} Error **5761fg5t**`)
            .setFooter('Type in your Error Code to see what is the Problem')
        msg.channel.send(embed);
        msg.delete();


    }

})


client.on('message', msg => {
    if (msg.content === "5482f4186") {
        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Error Code 5482f4186')
            .setDescription('This code occurs, when there is a problem with the embed')
            .setFooter('If this embed is green the developer knows about the issue, if not use ^report')
        msg.channel.send("Checking for Error Message _5482f4186_ . Please give us a second!")
            .then((msg) => {
                setTimeout(function () {
                    msg.edit(embed);
                }, 5000)
            });
    }
})

client.on('message', msg => {
    if (msg.content === "5761fg5t") {
        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Error Code 5761fg5t')
            .setDescription(`This code occurs, when the bot can't join the voice channel.`)
            .setFooter('If this embed is green the developer knows about the issue, if not use ^report')
        msg.channel.send("Checking for Error Message _5761fg5t_ . Please give us a second!")
            .then((msg) => {
                setTimeout(function () {
                    msg.edit(embed);
                }, 5000)
            });
    }
})
























client.login(process.env.token);