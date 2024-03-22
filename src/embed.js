const { Client,
    AttachmentBuilder,
    ActionRowBuilder,
    IntentsBitField,
    EmbedBuilder,
    Colors } = require('discord.js');

const { msgCommand } = require('./message-handle');
let prefix_Command = '';
for (let index = 0; index < msgCommand.length; index++) {
    prefix_Command += msgCommand[index] + '\n';
}


function makeEmbed(commandName) {
    if (commandName === 'help') {
        const file = new AttachmentBuilder(`./picture/${process.env.ICON}`);
        const embed = new EmbedBuilder()
            .setTitle("HELP COMMANDS")
            .setDescription('BAU BAU BAU BAU BAU')
            .setColor('Random')
            .setThumbnail(`attachment://${process.env.ICON}`)
            .addFields({
                name: 'Message command',
                value: prefix_Command,
                inline: true,
            })
            .setFooter({ text: 'Make by AnNhiene', iconURL: `attachment://${process.env.ICON}` });
        ;
        return { embed, file };
    }
    return {};
}

module.exports = {
    makeEmbed: makeEmbed
};
