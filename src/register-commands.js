require('dotenv').config();
const guildId = process.env.GUILD_ID1;

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const rpsCommand = require('./rps.js');
const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'baubau',
        description: 'bau bau bau bau🐶?',
    },
    {
        name: 'join',
        description: 'Join a choice voice channel',
        options: [
            {
                name: 'channel',
                description: 'channel want to join',
                type: ApplicationCommandOptionType.Channel,
                require: true,
            }
        ]
    },
    {
        name: 'fjoin',
        description: 'Join a user voice channel',
    },
    {
        name: 'help',
        description: 'send list of commands'
    },
    {
        name: 'talk',
        description: 'talk to mococo',
        options: [
            {
                name: 'prompt',
                description: 'talk to me anything',
                type: ApplicationCommandOptionType.String,
                require: true,
            }
        ]
    },
    {
        name: 'rps',
        description: 'Play rock paper scissors with another user.',
        options: [
            {
                name: 'user',
                description: 'Who you want to play with.',
                type: ApplicationCommandOptionType.User,
                required: true,
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
            { body: commands }
        )
        console.log('Registering slash commands successfully');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();