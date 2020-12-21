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

client.on('ready', () => {
    console.log("Bot is online!");
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 40000);
})


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
        .setTitle('Thanks for inviting me!')
        .setDescription('<:STT_yes:778545433810173952> These are your options:')
        .setThumbnail('https://cdn.discordapp.com/attachments/685794100112392212/750020815034122350/STT_BOT_PREMIUM_2.png')

        .addField('`^help fun`', 'Fun commands')

        .addField('`^help mod`', 'Commands for staff')

        .addField('`^help dev`', 'Developer options')

        .addField('`Ping:`', `${ping} ms`, true)

        .addField("`My Website`", "[Click here](https://sad-spence-0be9ad.netlify.app)", true)

        .addField("`My Status`", "[Click here](https://sttproductions.statuspage.io/)", true)
    channel.send(embed);
    channel.send(helpembed);
});


client.on("message", msg => {
    if (msg.content === "^help fun") {
        const embed = new MessageEmbed()
            .setColor('#E16210')
            .setTitle('**Fun Commands**')
            .setDescription('`^avatar`, `^meme`, `^memeoftheday`,  `^hug`,  `^twitter`, `^website`, `^announcement`, `^server`, `^suggest`, `^join`, `^play`, `^leave`, `^report`')
            .addField('Suggestion Command:', '^suggest {suggestion} <-- try ^help suggest for more info!', true)
        message.channel.send(embed);
    }
})


client.on('message', msg => {
    if (msg.content === "^help mod") {
        const embed = new MessageEmbed()
            .setColor('#2E0E81')
            .setTitle('**^help Moderator**')
            .setDescription('This is only ment for Staff Members!')
            .addField('kick/ban command:', '`^kick/^ban [@member]`', true)
            .addField('General Chat Commands:', '`^warn`,`^topic`, `^ID`, `^ping`, `^uptime`', true)
            .setFooter('^help ban to get more info on how to ban people')
        msg.channel.send(embed);

    }
})

client.on('message', msg => {
    if (msg.content === "^help dev") {
        const embed = new MessageEmbed()
            .setColor('#56E448')
            .setTitle('^help Developer')
            .setDescription('Everybody can use these commands, they are only here to give the Developer Info about certain things!')
            .addField('Basic commands:', '`^ping`, `^ID`, `^update`, `^talk`', true)
            .addField('Coding commands:', '`^info help`, `^info ping`, `^info join`, `^info kick`, `^info suggest`, `^info warn`', true)
            .setFooter('All info commands are pictures from the STT Bot, not from the STT Premium Bot!')
        msg.channel.send(embed);
    }
})

client.on("message", msg => {
    if (msg.content === "^commands") {
        const embed = new MessageEmbed()
            .setTitle("STT Premium")
            .setColor("#e2b007")
            .setThumbnail("https://cdn.discordapp.com/attachments/681060754564448257/784713060552146995/STT_BOT_PREMIUM_2.png")
            .setDescription("All Commands :")
            .addField("General commands ", "`^help` , `^help fun` , `^help mod` , `^help dev`")
            .addField("Test commands", "`^delay 10` , `^delay 20`")
            .addField("Info commands", "`^info help` , `^info ping` , `^help join` ,`^info kick` , `^info suggest` , `^info warn`")
            .addField("Chat commands", "`^suggest [suggestion]` , `^pred [team vs team ] ` , `^hug [person you want to hug`")
            .addField("Chat commands", "`^speak [your message ] ` ")
            .addField("Staff commands", "`^warn [@member] [reason] ` , `^topic`")
            .addField("Staff commands", "`^kick [@member] [reason] `  `^ban [@member] [reason] `")
            .addField("Bug command", "`^report [your report ] `")
            .addField("Fun commands", "`^ping` , `^online` , `^avatar`, `^memeoftheday`")
            .addField("Help staff", "`^help suggest` , `^help ban`")
            .addField("Voice Channel commands", "`^join` , `^leave` , `^play`")
            .addField("Socials", "`^twitter` , `^twitter2` ,  `^website`")
            .addField("ID Command", "`^ID [@member]`")
            .addField("Thanks for using my Bot", "Marwin")
            .setFooter("Last edit : 05.12.2020")
        msg.channel.send(embed);
    }
})

client.on("message", msg => {
    if (msg.content === "^list") {
        let author = msg.author
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(activities_list)
            .setFooter("Status updates every 40 seconds!")
        msg.channel.send(embed);
    }
})

client.on('message', msg => {
    if (msg.content === "^delay 10") {
        const embed = new MessageEmbed()
            .setDescription(':white_check_mark: Successfully edited!')
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
            .setDescription(':white_check_mark: Successfully edited!')
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
    if (msg.content === "^info help") {
        msg.channel.send('https://cdn.discordapp.com/attachments/743816369706893454/743851801878462504/Help_command.PNG');
    }
})

client.on('message', msg => {
    if (msg.content === "^info ping") {
        msg.channel.send('https://cdn.discordapp.com/attachments/743816369706893454/743852094406000720/Ping_Command.PNG');
    }
})

client.on('message', msg => {
    if (msg.content === "^info join") {
        msg.channel.send('https://cdn.discordapp.com/attachments/743816369706893454/743852712621375548/Join_Command.PNG');
    }
})

client.on('message', msg => {
    if (msg.content === "^info kick") {
        msg.channel.send('https://cdn.discordapp.com/attachments/713356214536503402/743862200812437514/kick_command.PNG');
    }
})

client.on('message', msg => {
    if (msg.content === "^info suggest") {
        msg.channel.send('https://cdn.discordapp.com/attachments/681060754564448257/761915127082516500/unknown.png');
    }
})

client.on('message', msg => {
    if (msg.content === "^info warn") {
        msg.channel.send('https://cdn.discordapp.com/attachments/681060754564448257/761915361200177152/unknown.png');
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
    let author = msg.author

    switch (args[0]) {
        case "permskick":
            const user = msg.mentions.users.first();
            const member = msg.guild.member(user);
            let author = msg.author
            if (!args[1]) return msg.reply("Please mention someone!")
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
            const user = msg.mentions.users.first();
            const member = msg.guild.member(user);
            let author = msg.author
            if (!args[1]) return msg.reply("Please mention someone!");
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
            const user = msg.mentions.users.first();
            const member = msg.guild.member(user);
            let author = msg.author
            if (!args[1]) return msg.reply("Please Mention someone!")
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



//suggest command: ^suggest {tag} (suggestion)

client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let author = msg.author

    switch (args[0]) {
        case "suggest":
            const user = msg.mentions.users.first();
            let msgArgs = args.slice(1).join(" ");
            let argsembed = new MessageEmbed()
                .setDescription(`<:STT_no:778545452218974209> ${author} You need to use a second argument. Example **^suggest [suggestion]**`)
                .setColor("RANDOM")
            if (!args[1]) return msg.channel.send(argsembed);
            const embed = new MessageEmbed()
                .setDescription("📃 " + `New Suggestion from ${author}:` + " " + "**" + msgArgs + "**")
                .setColor("RANDOM")



            if (!args[1]) {
                msg.channel.send("No!");
            }

            msg.channel.send(embed).then(messagereaction => {
                messagereaction.react("👍");
                messagereaction.react("👎");
                messagereaction.react("😐");
                msg.delete();
            })

            break;



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




//predict command (just the talk command with reactions)
client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let author = msg.author

    switch (args[0]) {
        case "hug":
            if (!args[1]) return msg.channel.send(`<:STT_no:778545452218974209> ${author} You need to use a second argument. Example **^hug @someone**`);
            const user = msg.mentions.users.first();
            const member = msg.guild.member(user);


            if (!args[1]) {
                msg.channel.send('Use ^hug {@person you want to hug} ');
                msg.delete();
            }

            let msgArgs = args.slice(1).join(" ");
            const embed = new MessageEmbed()
                .setDescription(`${author} hugs ${member}!`)
                .setImage('https://acegif.com/wp-content/gif/anime-hug-38.gif')
            msg.channel.send(embed);




            break;



    }
})

client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let author = msg.author

    switch (args[0]) {
        case "speak":
            if (!args[1]) return msg.channel.send(`<:STT_no:778545452218974209> ${author} You need to use a second Argument! Example **^speak [your message]**`);
            //if (!msg.member.roles.cache.has('714096868178788414')) return msg.reply(`<:STT_no:778545452218974209> ${author} You can't use that!`);
            if (msg.channel instanceof Discord.DMChannel) return;
            if (msg.author.bot) return;

            const user = msg.mentions.users.first();
            const member = msg.guild.member(user);


            if (!args[1]) {
                msg.channel.send('Use ^speak {your message} and the bot will re-send your message in en embed ');
                msg.delete();
            }

            let msgArgs = args.slice(1).join(" ");
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription("**" + msgArgs + "**")
                .setTimestamp()
            msg.channel.send(embed);
            msg.delete();



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
            msg.channel.send(embed);
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



client.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let author = msg.author

    switch (args[0]) {
        case "staffwarn":
            const user = msg.mentions.users.first();
            const member = msg.guild.member(user);


            if (!args[1]) {
                msg.channel.send('<:STT_no:778545452218974209> Use ^warn {@person} (reason) and `STT Premium` will warn the Person you mentioned.  ');
                msg.delete();
            }

            let msgArgs = args.slice(2).join(" ");
            const embed = new MessageEmbed()
                .setDescription(`<:STT_yes:778545433810173952> ${member} has been warned! `)
                .addField(`Reason`, msgArgs, true)
                .addField(`Moderator`, `${author}`)
                .setColor('RANDOM')
                .setFooter(`${user.tag} has been warned`)
            msg.channel.send(`Preparing warning for _${user.tag}_ `)
                .then((msg) => {
                    setTimeout(function () {
                        msg.edit(embed);
                    }, 2000)
                });

            msg.delete();
            console.log(`${user.tag} has been warned! Mod ID : ${author}. (developer warning)     Provided Reason:` + " " + msgArgs);


            break;



    }
})

//warn command: ^warn (@member) {reason}


client.on("message", msg => {
    if (msg.content === "^uptime") {
        if (msg.channel instanceof Discord.DMChannel) return;
        if (msg.author.bot) return;
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        const embed = new MessageEmbed()
            .setDescription(`The bot has been online for ${uptime}`)
            .setColor('RANDOM')
            .setFooter('Powered by STT Productions')
            .setTimestamp()
        msg.channel.send(embed);

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
            .addField(`Slug size:`, `25.8 MiB`)
            .addField(`Stack`, `heroku-18`)
            .setFooter("Heroku-18 is updateable")
        msg.channel.send(embed);
        msg.channel.send(botembed);

    }
})



client.on("message", msg => {
    if (msg.content === "^outage") {
        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Bot Outage!')
            .setDescription('<:STT_no:778545452218974209> STT Bot is offline! Please be patient as the Developer is trying to fix it!')
            .setFooter('Please take note that this may take some time.')
        msg.channel.send(embed);
        msg.delete();

    }
})

client.on('message', msg => {
    if (msg.content === "^outage commands") {
        const embed = new MessageEmbed()
            .setColor('#ffd700')
            .setAuthor('Temporary outage')
            .setDescription('<:STT_no:778545452218974209> Commands dont seem to work!')
            .setFooter('Please be patient as I am working on it')
        msg.channel.send(embed);
        msg.delete()
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



client.on('message', msg => {
    if (msg.content === "^ping") {
        var ping = client.ws.ping;
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(":ping_pong: Ping of STT Premium is `" + `${ping}` + " ms`")
            .addField("`My Status`", "[Click here](https://sttproductions.statuspage.io/)", true)
            .setFooter("TEST")
        msg.channel.send(embed);
        msg.delete();
    }
})


client.on("message", msg => {
    if (msg.content === "^memeoftheday") {
        let author = msg.author.send
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage("https://i.redd.it/7fv7uf0dfc561.jpg")
            .setFooter("Meme of the Day!")
        msg.channel.send(embed);
    }
})


client.on("message", message => {
    if (message.content === "^meme") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
            message.channel.send(embed);
        })
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
    if (msg.content === "^avatar") {
        let owner = msg.author.id == '420277395036176405';
        const permsembed = new MessageEmbed()
            .setDescription("This command is under Maintenance!")
            .setFooter("Owner only [848]")
            .setColor("RANDOM")
        if (!owner) return msg.channel.send(permsembed);
        let member = msg.mentions.members.first() || msg.author;
        let avatar = member.user.displayAvatarURL({
            format: 'jpg',
            dynamic: true,
            size: 1024
        });

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(avatar)
            .setFooter(`Requested by ${msg.author.username}`)

        msg.channel.send(embed)
        msg.delete();

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
            .setThumbnail('https://cdn.discordapp.com/attachments/685794100112392212/750020815034122350/STT_BOT_PREMIUM_2.png')
            .setDescription('Here is how to use the `^suggest` command:')
            .addField('Type ^suggest [suggestion ]  to start a poll.', 'Example: ^suggest Is this cool?', true)
        msg.channel.send(embed);

    }
})

client.on('message', msg => {
    if (msg.content === "^help ban") {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail('https://cdn.discordapp.com/attachments/685794100112392212/750020815034122350/STT_BOT_PREMIUM_2.png')
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


client.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");
    let msgArgs = args.slice(2).join(" ");
    let author = message.author

    switch (args[0]) {
        case 'no':
            let argsembed = new MessageEmbed()
                .setDescription(`<:STT_no:778545452218974209> ${author} You need to use 3 Arguments! Example **^kick @person [reason]**`)
            let channel = message.channel
            let permsembed = new MessageEmbed()
                .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
                .addField("Error", 'Missing `KICK_MEMBERS`')
                .setColor("RANDOM")
            let log_channel = message.guild.channels.cache.get('780815502997454848');
            if (!args[1]) return message.channel.send(argsembed);
            if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(permsembed);
            if (message.channel instanceof Discord.DMChannel) return;
            if (message.author.bot) return;



            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.kick(msgArgs).then(() => {
                        const embed = new MessageEmbed()
                            .setColor('#229954')
                            .setDescription(`<:STT_yes:778545433810173952> STT Premium kicked ${member} Reason:` + " " + "**" + msgArgs + "**")
                            .setTimestamp()
                        message.reply(embed);
                        //let logembed = new MessageEmbed()
                        // .setColor("RANDOM")
                        //.setDescription(`**KICK** | ${member}`)
                        //.addField(`Moderator:`, `${author}`)
                        //.addField(`Channel: `, `${channel}`)
                        //.addField(`Reason:`, msgArgs)
                        //.setThumbnail(message.author.displayAvatarURL())
                        //.setTimestamp()
                        //log_channel.send(logembed);
                        console.log(`I kicked ${user.tag}. Provided Reason:` + msgArgs);
                        message.delete();







                    }).catch(err => {
                            const embed = new MessageEmbed()
                                .setColor('#F1C40F')
                                .setDescription('<:STT_no:778545452218974209> The bot was unable to kick this Person.It is missing Permissions:`ADMINISTRATOR,KICK_MEMBERS` ')
                                .addField('Error:', 'The bot is missing Permissions')
                            message.reply(embed);
                            message.delete();

                            console.log(err);



                        }

                    )



                } else {
                    message.reply("That user isnt  on the Server")

                }
            } else {
                const embed = new MessageEmbed()
                    .setColor('#3F2DD2 ')
                    .setDescription('You need to specify a Person! You need to use ^kick @[member]. Make sure I have the right Permissions to kick someone!')
                message.channel.send(embed);
                message.delete();


            }




            break;



    }

})


client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    let msgArgs = args.slice(2).join(" ");
    let author = message.author

    switch (args[0]) {
        case 'ban':
            let argsembed = new MessageEmbed()
                .setDescription(`<:STT_no:778545452218974209> ${author} You need to use 3 Arguments! Example **^ban @person [reason]**`)
                .setColor("RANDOM")
            let channel = message.channel
            let permsembed = new MessageEmbed()
                .setDescription(`<:STT_no:778545452218974209> You can't use that ${message.author.username}!`)
                .addField("Error", 'Missing `BAN_MEMBERS`')
                .setColor("RANDOM")
            let log_channel = message.guild.channels.cache.get('780815502997454848');
            if (!args[1]) return message.channel.send(argsembed);
            if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(permsembed);
            if (message.channel instanceof Discord.DMChannel) return;
            if (message.author.bot) return;



            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.ban({
                        ression: msgArgs
                    }).then(() => {
                        const embed = new MessageEmbed()
                            .setDescription(`<:STT_yes:778545433810173952> STT Premium banned  ${member} Reason:**` + " " + msgArgs + "**")
                            .setColor('#229954')
                            .setTimestamp()
                            .setFooter(`Mod ID: ${author}`)
                        message.channel.send(embed);
                        //let logembed = new MessageEmbed()
                        //    .setColor("RANDOM")
                        //   .setDescription(`**BAN** | ${member}`)
                        //    .addField(`Moderator:`, `${author}`)
                        //   .addField(`Channel: `, `${channel}`)
                        //   .addField(`Reason:`, msgArgs)
                        //    .addField(`Server:`, `${message.guild}`)
                        //    .setThumbnail(message.author.displayAvatarURL())
                        //    .setTimestamp()
                        //log_channel.send(logembed);
                        console.log(`I banned ${user.tag}. Provided Reason:` + msgArgs);
                        message.delete();






                    }).catch(err => {
                            const embed = new MessageEmbed()
                                .setColor('#F1C40F')
                                .setDescription('<:STT_no:778545452218974209> The bot was unable to ban this Person.It is missing Permissions:`ADMINISTRATOR,BAN_MEMBERS` ')
                                .addField('Error:', 'The bot is missing Permissions')
                            message.reply(embed);
                            //log_channel.send(`Bot was unable to ban after request from ${author}. For more information type "^help ban err". _returned_`)
                            message.delete();
                            console.log(`${author} tried to ban ${member}`);

                            console.log(err);



                        }

                    )










                } else {
                    message.reply("That user isnt  on the Server")

                }
            } else {
                const embed = new MessageEmbed()
                    .setColor('#3F2DD2 ')
                    .setDescription('You need to specify a Person! You need to use ^ban @[member] {reason}.')
                    .addField('Error:', 'Didnt find mention (684sd68)')
                message.channel.send(embed);
                //log_channel.send(`${author} used ^ban but didnt mention a person that is on this server! _returned_`)
                message.delete();
                console.log(`${author} used the "^ban"`);


            }




            break;



    }

})

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');

    if (!channel) return;

    channel.send(`Welcome to the server, ${member}. Make sure you read the rules. We hope you enjoy your stay on our Server! `);
});


client.on('message', msg => {
    if (msg.content === "^marwin is live") {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription('Marwin just went live on Twitch!')
            .setImage('https://acegif.com/wp-content/gif/outerspace-43.gif')
            .setFooter('Make sure you leave a follow!')
        msg.channel.send(embed);
        msg.delete();

    }
})

client.on('message', msg => {
    if (msg.content === "^lite is live") {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription('LiteisCool just went live on Twitch!')
            .addField("Link:", "[Click here](https://www.twitch.tv/liteiscool)")
            .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/0bf1e4ab-665c-4004-bbd4-fc9861ecab60-profile_image-70x70.png')
            .setImage('https://i.pinimg.com/originals/09/ee/92/09ee92cc5ef0ed68bd4287c1b350f255.jpg')
            .setFooter('Make sure you leave a follow and stay there for a bit!')
        msg.channel.send(embed);
        msg.delete();

    }
})

client.on('message', msg => {
    if (msg.content === "^james is live") {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription('NotGhol just went live on Twitch!')
            .addField("Link:", "[Click here](https://www.twitch.tv/notghol)")
            .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/9149c745-ecb9-4272-b1ca-83023023e593-profile_image-70x70.png')
            .setImage('https://cdn.discordapp.com/attachments/676043311659614228/735611183205318656/unknown.png')
            .setFooter('Make sure you leave a follow and share some love ♥')
        msg.channel.send(embed);
        msg.delete();

    }
})

client.on('message', msg => {
    if (msg.content === "^sledgy is live") {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription('sledgy420 just went live on Twitch! https://www.twitch.tv/sledgy420')
            .setThumbnail('https://static-cdn.jtvnw.net/user-default-pictures-uv/ebb84563-db81-4b9c-8940-64ed33ccfc7b-profile_image-70x70.png')
            .setImage('https://acegif.com/wp-content/gifs/happy-cat-27.gif')
            .setFooter('Make sure you leave a follow and watch him play epic games!')
        msg.channel.send(embed);
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
            .setThumbnail('https://cdn.discordapp.com/attachments/685794100112392212/750020815034122350/STT_BOT_PREMIUM_2.png')
            .setDescription('Sign up here if you want to be part of our Overwatch Tournaments! https://battlefy.com/syntax-terror-tournaments')
        msg.channel.send(embed);

    }
})

client.on('message', msg => {
    if (msg.content === "^twitter2") {
        const embed = new MessageEmbed()
            .setTitle('Our twitter Team')
            .setColor('#E42162')
            .setThumbnail('https://cdn.discordapp.com/attachments/685794100112392212/750020815034122350/STT_BOT_PREMIUM_2.png')
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

client.on('message', msg => {
        if (msg.content === "^topic") {
            let author = msg.author
            let channel = msg.channel
            let permsembed = new MessageEmbed()
                .setDescription(`<:STT_no:778545452218974209> ${author} You can't use that!`)
                .addField("Error", 'Missing Permissions!')
                .setColor("RANDOM")
            if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply(permsembed);
            if (msg.channel instanceof Discord.DMChannel) return;
            if (msg.author.bot) return;
            let log_channel = msg.guild.channels.cache.get('780815502997454848');
            //let logembed = new MessageEmbed()
            //  .setDescription("**TOPIC**")
            // .addField('Moderator', `${author}`)
            //.addField('Channel', `${channel}`)
            //.setThumbnail(msg.author.displayAvatarURL())
            //.setColor("RANDOM")
            //.setTimestamp()
            //log_channel.send(logembed);   
            const embed = new MessageEmbed()
                .setTitle('Watch out!')
                .setColor('#EC0808')
                .setDescription('Please change the topic or make sure your conversation is relevant to the current channel!')
            msg.channel.send(embed);
            msg.delete();


        }
    }



)

client.on('message', msg => {
    if (msg.content === "^support") {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription('Please support me ( test ) ')

        msg.channel.send(embed);

    }
})


client.on('message', msg => {
    if (msg.content.includes("^ID")) {
        let args = msg.content.substring(PREFIX.length).split(" ");
        let user = msg.mentions.users.first();
        let author = msg.author
        let owner = msg.author.id == '420277395036176405';
        const permsembed = new MessageEmbed()
            .setDescription("This command is under Maintenance!")
            .setFooter("Owner only [1324]")
            .setColor("RANDOM")
        if (!owner) return msg.channel.send(permsembed);
        if (!args[1]) return msg.channel.send(`<:STT_no:778545452218974209> ${author} You need to use a second Argument! Example **^ID [Person]**`);
        msg.channel.send(`This is the Discord ID form ${user.tag}: ` + user);





    }

})


client.on('message', msg => {
    if (msg.content.includes("^talk")) {
        let user = msg.mentions.users.first();
        msg.channel.send("This command doesnt exist anymore. It has been changed to ^speak!");
        msg.delete();




    }

})

client.on('message', msg => {
    if (msg.content.includes("ahhhhh")) {
        let user = msg.mentions.users.first();
        msg.react('👋')


    }

})


client.on('message', msg => {
    if (msg.content.includes("aiudadn uwudgi")) {
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