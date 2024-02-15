require('dotenv').config();
const {REST,Routes,ApplicationCommandOptionType}=require('discord.js');

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
    }   
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async()=>{
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),
            {body:commands}
        )
        console.log('Registering slash commands successfully');
    } catch (error) {
        console.log(`There was an error: ${error}`);        
    }
})();