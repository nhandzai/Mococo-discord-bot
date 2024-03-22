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
const { Colors } = require('discord.js')
const { chatBot } = require('./chatbot.js')
const prefix = '!';

const msgCommand = [
    'join',
    'pen',
    'kys',
    'baubau',
    'vang m to',
    'bruh',
    'dis',
]


async function messageHandle(msg, player) {
    if (msg.content.startsWith(prefix)) {
        const msgCommand = msg.content.slice(prefix.length);

        if (msg.author.bot) return;

        if (msgCommand === "join") {
            if (!msg.member.voice.channel) {
                msg.reply('You are not in a voice channel!')
                return;
            }
            const connection = joinVoiceChannel({
                channelId: msg.member.voice.channel.id,
                guildId: msg.guildId,
                adapterCreator: msg.guild.voiceAdapterCreator,
            })
            let intro = createAudioResource(join(__dirname, '..', 'audio', process.env.INTRO));
            playSong(connection, player, intro);
        }
        if (msgCommand === "pen") {
            if (!msg.member.voice.channel) {
                msg.reply('You are not in a voice channel!')
                return;
            }
            const connection = joinVoiceChannel({
                channelId: msg.member.voice.channel.id,
                guildId: msg.guildId,
                adapterCreator: msg.guild.voiceAdapterCreator,
            })
            let intro = createAudioResource(join(__dirname, '..', 'audio', process.env.PEN));
            playSong(connection, player, intro);
        }
        if (msgCommand === "kys") {
            if (!msg.member.voice.channel) {
                msg.reply('You are not in a voice channel!')
                return;
            }
            const connection = joinVoiceChannel({
                channelId: msg.member.voice.channel.id,
                guildId: msg.guildId,
                adapterCreator: msg.guild.voiceAdapterCreator,
            })
            let intro = createAudioResource(join(__dirname, '..', 'audio', process.env.KYS));
            playSong(connection, player, intro);
        }
        if (msgCommand === "baubau") {
            if (!msg.member.voice.channel) {
                msg.reply('You are not in a voice channel!')
                return;
            }
            const connection = joinVoiceChannel({
                channelId: msg.member.voice.channel.id,
                guildId: msg.guildId,
                adapterCreator: msg.guild.voiceAdapterCreator,
            })
            let intro = createAudioResource(join(__dirname, '..', 'audio', process.env.BAUBAUBAU));
            playSong(connection, player, intro);



        }
        if (msgCommand === "vang m to") {
            if (!msg.member.voice.channel) {
                msg.reply('You are not in a voice channel!')
                return;
            }
            const connection = joinVoiceChannel({
                channelId: msg.member.voice.channel.id,
                guildId: msg.guildId,
                adapterCreator: msg.guild.voiceAdapterCreator,
            })
            let intro = createAudioResource(join(__dirname, '..', 'audio', process.env.VANGMTO));
            playSong(connection, player, intro);
        }
        if (msgCommand === "bruh") {
            if (!msg.member.voice.channel) {
                msg.reply('You are not in a voice channel!')
                return;
            }
            const connection = joinVoiceChannel({
                channelId: msg.member.voice.channel.id,
                guildId: msg.guildId,
                adapterCreator: msg.guild.voiceAdapterCreator,
            })
            let intro = createAudioResource(join(__dirname, '..', 'audio', process.env.BRUH));
            playSong(connection, player, intro);
        }
        if (msgCommand === "dis") {
            if (!msg.member.voice.channel) {
                msg.reply('You are not in a voice channel!')
                return;
            }
            const voiceChannel = msg.member.voice.channel;
            const memberIDs = voiceChannel.members.map(member => member.id);
            if (memberIDs.includes(process.env.CLIENT_ID)) {
                const connection = joinVoiceChannel({
                    channelId: msg.member.voice.channel.id,
                    guildId: msg.guildId,
                    adapterCreator: msg.guild.voiceAdapterCreator,
                })
                connection.disconnect();
                msg.reply('Successfully disconnected');
                return;

            } else {
                msg.reply('I must in a voice channel');

            }
        }
    } else if (msg.content.startsWith('@')) {
        const msgcontent = msg.content.slice('@');
        let prompt = ''
        prompt = await chatBot(msgcontent)
        await msg.reply(prompt);
    }
}
module.exports = {
    messageHandle: messageHandle,
    msgCommand: msgCommand
}