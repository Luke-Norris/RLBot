const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, ActivityType } = require(`discord.js`);
const spawn = require("child_process").spawn;
const prefix = '?';
const platforms = ['epic','steam']
const playlists = ['1s','2s','3s']
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const activities = ['placeholder','butters lose 0-3', 'gooey in his sleep', 'lucas lose out','gooeys win streak','jus10 in the shower']
// client.on("ready", () => {
//     console.log("Bot is online");

//     client.user.setPresence({
//         activities: [{ name: 'Gooey be cool', type: ActivityType.Watching}]
//     })
// })

client.on("ready", () => {
    console.log("Bot is online");
    // run every 10 seconds
    setInterval(() => {
      // generate random number between 1 and list length.
      const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
      const newActivity = activities[randomIndex];

      client.user.setPresence({
        activities: [{ name: newActivity, type: ActivityType.Watching}]
    })
    }, 2000);
  });

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    // EXAMPLE:
    // ?rank Godgooey epic 2s

// HELP COMMAND
// IMPORTANT
if (command === 'help') {
    message.channel.send('**COMMANDS:**\n**?rank**: Will return your rank back to you based on your arguments...\n          **FORMAT**: ?rank  [Username/ID]  [Platform]  [Playlist]\n          **EXAMPLE**:?rank GodGooey epic 2s\n          *Make sure your playlist is named by 1s, 2s, or 3s*')
}
if (messageArray[0] === '?rank') {
    if (platforms.includes(messageArray[2]) && playlists.includes(messageArray[3])) {
        const pythonProcess = spawn('/usr/bin/python3',["./getRankScraper.py", messageArray[1], messageArray[2], messageArray[3]]);
        console.log('made it here')

        pythonProcess.stdout.on('data', (data) => {
            let info = data.toString('utf8')
            console.log(info)
            message.channel.send(info)
        });
    } 
}

})



client.login("MTAyOTQzMDMwODc0OTE4OTE2MQ.GwuSif.81k-E-POy0gNE9M0QBEhiAE4H0Q979yBBDTMHE")