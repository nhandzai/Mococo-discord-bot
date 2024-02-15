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


const prefix = '!';

function messageHandle(msg, player) {
    if (msg.content.startsWith(prefix)) {
        const msgCommand = msg.content.slice(prefix.length);

        if (msg.author.bot) return;

        if (msgCommand === "bau")
            msg.reply("Bau bau");

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

        if (msgCommand === "dis") {
            if (!msg.member.voice.channel) {
                msg.reply('You are not in a voice channel!')
                return;
            }
            const connection = joinVoiceChannel({
                channelId: msg.member.voice.channel.id,
                guildId: msg.guildId,
                adapterCreator: msg.guild.voiceAdapterCreator,
            })
            if (connection.disconnect())
                msg.reply('Successfully disconnected');
        }
    }

}

module.exports = {
    messageHandle: messageHandle
}