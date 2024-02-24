const { Client,
    AttachmentBuilder,
    ActionRowBuilder,
    IntentsBitField,
    EmbedBuilder,
    Colors } = require('discord.js');

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
                value: '!join\n!dis\n!baubau\n!kys\n!pen\n!vang m to',
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
