const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js')
require('dotenv/config')

// these should be in a separate config file
var prefix = '!';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

client.on('ready', ()=>{
    console.log('Bot is Online!')
})


client.on('messageCreate', async message => {

    if (message.content.substring(0, (prefix.length)) == prefix) {
        var msgArgs = message.content.split(' ');
        switch (msgArgs[0].substring(prefix.length)) {
            case 'clear':
                try {
                    const fetched = await message.channel.messages.fetch({ limit: 100 });//bot clear
                    message.channel.bulkDelete(fetched);
                } catch (error) {
                    console.log(`Error while clearing messages: ${error}`);//catch error
                    message.channel.reply('Error while clearing messages!');
                }
                break;
            case 'kick':
                try {
                    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                        message.reply('Insufficient Permissions.');
                    } else {
                        if (!msgArgs[1]) {
                            message.reply('Please specify a user to kick.');
                        } else {
                            const target = message.mentions.members.first();
                            if (!target) {
                                message.reply('Please specify a user to kick.');
                            } else if (target.id === message.member.id) {
                                message.reply('Cannot kick self.');
                            } else if (target.roles.highest.position >= message.member.roles.highest.position) {
                                message.reply('Cannot kick users with a higher rank.');
                            } else {
                                if (!target.kickable) {
                                    message.reply('Cannot kick users with a higher rank.');
                                } else {
                                    (await target.ban()) + message.reply('User successfully kicked.');
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                    message.reply('Error.');
                }
                break;

            default:
                message.reply('Unrecognized command.');

        }
    }
    else {
        if (message.content.toLowerCase().includes('stupid')) { //bad word
            message.reply('Please refrain from using inappropriate language!'); //bots warning
        }
        if (message.content.toLowerCase().includes('hello')) {//Greeting
            message.reply('Hi there!');//bot response
        }
    }
});





client.login(process.env.TOKEN)
