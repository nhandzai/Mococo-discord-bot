const { error } = require('console');
const { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const choices = [
    { name: 'Rock', emoji: '🪨', beats: 'Scissor' },
    { name: 'Paper', emoji: '📄', beats: 'Rock' },
    { name: 'Scissor', emoji: '✂️', beats: 'Paper' },
]

module.exports = {
    run: async ({ interaction }) => {
        try {
            const targetUser = interaction.options.getUser('user');
            if (interaction.user.id === targetUser.id) {
                interaction.reply({
                    content: 'You cannot play with yourself.',
                    ephemeral: true,
                });
                return;
            }
            if (targetUser.bot) {
                interaction.reply({
                    content: 'You cannot play with a bot.',
                    ephemeral: true,
                });
                return;
            }
            let embed = new EmbedBuilder()
                .setTitle('Rock paper scissors')
                .setDescription(`It's currently ${targetUser}'s turn.`)
                .setColor('Yellow')
                .setTimestamp(new Date());

            const buttons = choices.map((choice) => {
                return new ButtonBuilder()
                    .setCustomId((choice.name))
                    .setLabel(choice.name)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(choice.emoji)
            });
            const row = new ActionRowBuilder().addComponents(buttons);

            let reply = await interaction.reply({
                content: `${targetUser}, would u want to play rock paper scissors with ${interaction.user}.
                 To play click the buttons below bau bau.`,
                embeds: [embed],
                components: [row],
            });

            const targetUI = await reply.awaitMessageComponent({
                filter: (i) => i.user.id === targetUser.id,
                time: 30_000,
            }).catch(async (error) => {
                embed.setDescription(`Game over ${targetUser} time out`),
                    await reply.edit({ embeds: [embed], components: [row] })
            });
            if (!targetUI) return;
            const targetUserChoice = choices.find(
                (choice) => choice.name === targetUI.customId,
            );
            await targetUI.reply({
                content: `You pick ${targetUserChoice.name + targetUserChoice.emoji}`,
                ephemeral: true,
            });


            embed.setDescription(`It's currently${interaction.user} turn.`)
            await reply.edit({
                content: `${interaction.user}'s turn now`,
                embeds: [embed],
            });
            const initialUI = await reply.awaitMessageComponent({
                filter: (i) => i.user.id === interaction.user.id,
                time: 30_000,
            })
                .catch(async (error) => {
                    embed.setDescription(`Game over ${interaction.user} time out`),
                        await reply.edit({ embeds: [embed], components: [] })
                });
            if (!initialUI) return;
            const initialUserChoice = choices.find(
                (choice) => choice.name === initialUI.customId,
            );
            await initialUI.reply({
                content: `You pick ${initialUserChoice.name + initialUserChoice.emoji}`,
                ephemeral: true,
            });

            let result;
            if (targetUserChoice.beats === initialUserChoice.name) {
                result = `${targetUser} won`;
            } else if (initialUserChoice.beats === targetUserChoice.name)
                result = `${interaction.user} won`;
            else
                result = 'It was a tie'

            embed.setDescription(
                `${targetUser} pick ${targetUserChoice.name + targetUserChoice.emoji}\n
                ${interaction.user} pick ${initialUserChoice.name + initialUserChoice.emoji}\n\n
                ${result}`);
            reply.edit({
                content: 'Bau bau bau bau bau bau bau bau',
                embeds: [embed],
                components: [],
            });

        } catch (error) {
            console.log(`Error with /rps`);
            console.error(error);
        }
    },

    data: {
        name: 'rps',
        description: 'Play rock paper scissors with another user.',
        dm_permission: false,
        option: [
            {
                name: 'user',
                description: "Who you want to play with.",
                type: ApplicationCommandOptionType.User,
                require: true,
            }
        ]
    }
}