const { ActionRowBuilder, ButtonBuilder, ComponentType,ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	// data: new SlashCommandBuilder()...
	async execute(interaction) {
		const target = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Ban')
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(cancel, confirm);

		const response = await interaction.reply({
			content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
			components: [row],
		});

	},

	async test(interaction) {
		const target = interaction.options.getUser('user');
		const select = new StringSelectMenuBuilder()
			.setCustomId('setRole')
			.setPlaceholder('What are you')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Man')
					.setValue('Man'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Women')
					.setValue('Women'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Gay')
					.setValue('Gay'),
			)
		const row = new ActionRowBuilder()
			.addComponents(select);

		const response = await interaction.reply({
			components: [row],
		})

		const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

		collector.on('collect', async i => {
			const selection = i.values[0];
			await i.reply(`${i.user} is ${selection}!`);
			interaction.guild.members.addRole(i.user)
			return;
		});

	}
};