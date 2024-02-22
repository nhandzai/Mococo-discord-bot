require('dotenv').config();
const { Client, IntentsBitField,EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
});
const { joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    StreamType,
    NoSubscriberBehavior,
    VoiceConnectionStatus } = require('@discordjs/voice');
const { path, join } = require('node:path');

const { playSong } = require('./audio-player');
const { interactionHandle } = require('./interaction-handle');
const { messageHandle } = require('./message-handle');

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
})
const player = createAudioPlayer();


client.on('interactionCreate', (interaction) => {
    interactionHandle(interaction, player)
});
client.on('messageCreate', (msg) => {
    messageHandle(msg, player)
});

client.login(process.env.TOKEN);