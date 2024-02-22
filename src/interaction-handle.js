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
    if(interaction.commandName === 'help'){ 
        const file = new AttachmentBuilder('./picture/icon.png');
        const embed = new EmbedBuilder()
        .setTitle("HELP COMMANDS")
        .setDescription('BAU BAU BAU BAU BAU')
        .setColor('Random')
        //.setImage('attachment://icon.png')
        .setThumbnail('attachment://icon.png')
        .addFields({
            name: 'Message command',
            value: '!join\n!dis\n!baubau\n!kys\n!pen\n!vang m to',
            inline: true,
        })
        .setFooter({ text: 'Make by AnNhiene', iconURL: 'attachment://icon.png' });
        ;
        interaction.reply({embeds: [embed],files: [file]});
    }
}
module.exports = {
    interactionHandle: interactionHandle
};