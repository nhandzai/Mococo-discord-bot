const { joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    StreamType,
    NoSubscriberBehavior,
    VoiceConnectionStatus, 
    VoiceConnection} = require('@discordjs/voice');

/**
 * Plays an audio source in a voice connection.
 * @param {VoiceConnection} connection - The voice connection.
 * @param {AudioPlayer} player - The audio player.
 * @param {string} source - Source mp3
 */

function playSong(Connection,Player,source) {
    Player.play(source);
    Connection.subscribe(Player);
    Connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('The connection has entered the Ready state - ready to play audio!');
    });
}

module.exports = {
    playSong: playSong
};