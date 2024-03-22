const { Client,
    AttachmentBuilder,
    ActionRowBuilder,
    IntentsBitField,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ComponentType,
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
const { execute, test } = require('./button');
const { makeEmbed } = require('./embed');
const { run: rpsInteractionHandle } = require('./rps.js');
const { chatBot } = require('./chatbot.js')


async function interactionHandle(interaction, player) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'baubau') {
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
        let intro = createAudioResource(join(__dirname, '..', 'audio', process.env.BAUBAUBAU));
        playSong(connection, player, intro);

        const buttons = new ButtonBuilder()
            .setCustomId('yes')
            .setLabel('bau bau bau ?')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('🐶');
        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(buttons, cancel);
        let reply = await interaction.reply({
            content: 'bau bau bau bau bau bau',
            components: [row],
        })

        const filter = i => (i.customId === 'yes' || i.customId === 'cancel');
        const collector = reply.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 3_600_000 });
        let isPlaying = true;
        let index = 1;
        collector.on('collect', async i => {
            if (isPlaying && i.customId === 'yes') {
                let intro = createAudioResource(join(__dirname, '..', 'audio', process.env.BAUBAUBAU));
                playSong(connection, player, intro)
                reply.edit({
                    content: `Has bau bau ${index} time`,
                    components: [row],
                });
                index++;
            } else if (isPlaying && i.customId === 'cancel') {
                i.reply('Stop bau bau !!!');
                isPlaying = false;
            }
        });

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
        const { embed, file } = makeEmbed(interaction.commandName);
        interaction.reply({ embeds: [embed], files: [file] });
    }
    if (interaction.commandName === 'talk') {

        let prompt = ''
        prompt = await chatBot(interaction.options.getString('prompt') ?? '')
        await interaction.reply(prompt);
    }
    if (interaction.commandName === 'rps') {
        rpsInteractionHandle({ interaction: interaction });
    }
}
module.exports = {
    interactionHandle: interactionHandle,
};