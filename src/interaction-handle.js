const { Client,
    AttachmentBuilder,
    ActionRowBuilder,
    IntentsBitField,
    EmbedBuilder,
    Colors } = require('discord.js');
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
require('dotenv').config();
const { path, join } = require('node:path');
const { playSong } = require('./audio-player');
const { execute } = require('./button');
const { makeEmbed } = require('./embed');

function interactionHandle(interaction, player) {
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
    if (interaction.commandName === 'help') {
        const {embed, file} = makeEmbed(interaction.commandName);
        interaction.reply({ embeds: [embed], files: [file] });
    }
    if (interaction.commandName === 'ban') {
        execute(interaction);
    }
}
module.exports = {
    interactionHandle: interactionHandle
};