require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
})

client.on('interactionCreate',(interaction)=>{
    if(!interaction.isChatInputCommand())return;
    
    if(interaction.commandName === 'ping'){
        interaction.reply('pong');
    }
    if(interaction.commandName === 'baubau'){
        interaction.reply('bau bau bau bau bau bau bau bau');
    }
})

// client.on('messageCreate', (msg) => {
//     if (msg.author.bot) return;

//     if (msg.content === "bau")
//         msg.reply("bau bau");

// })

client.login(process.env.TOKEN);