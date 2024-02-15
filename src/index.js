require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
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
const { path,join } = require('node:path');
const { playSong } = require('./audio-player')


client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
})
const player = createAudioPlayer();


client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        interaction.reply('pong');
    }
    if (interaction.commandName === 'baubau') {
        interaction.reply('bau bau bau bau bau bau bau bau')
    }

    if (interaction.commandName === 'join') {
        const voiceChannel = interaction.options.getChannel('channel');

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        })
        interaction.reply('Bau bau')
    }

    if (interaction.commandName === 'fjoin') {
        if (!interaction.member.voice.channel) {
            interaction.reply('You are not in a voice channel!');
            return;
        }
        const voiceChannel = interaction.member.voice.channel;

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        interaction.reply('Bau bau')
    }
})

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;

    if (msg.content === "bau")
        msg.reply("Bau bau");

    if (msg.content === "join") {
        if(!msg.member.voice.channel){
            msg.reply('You are not in a voice channel!')
            return;
        }

        const connection = joinVoiceChannel({
            channelId: msg.member.voice.channel.id,
            guildId: msg.guildId,
            adapterCreator: msg.guild.voiceAdapterCreator,
        })
        let intro = createAudioResource(join(__dirname, '..', 'audio', process.env.INTRO));

        playSong(connection,player,intro);
        // player.play(intro);
        // connection.subscribe(player);
        // connection.on(VoiceConnectionStatus.Ready, () => {
        //     console.log('The connection has entered the Ready state - ready to play audio!');
        // });
    }
})

client.login(process.env.TOKEN);