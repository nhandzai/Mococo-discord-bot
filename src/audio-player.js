const { joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    StreamType,
    NoSubscriberBehavior,
    VoiceConnectionStatus } = require('@discordjs/voice');

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