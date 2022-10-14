const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, ActivityType } = require(`discord.js`);

const prefix = '?';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("ready", () => {
    console.log("Bot is online");

    client.user.setPresence({
        activities: [{ name: 'Gooey be cool', type: ActivityType.Watching}]
    })



})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    // commands

if (command === 'test') {
    message.channel.send("Bot is working!")
}

})



client.login("MTAyOTQzMDMwODc0OTE4OTE2MQ.GwuSif.81k-E-POy0gNE9M0QBEhiAE4H0Q979yBBDTMHE")