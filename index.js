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
                            if (target.id === message.member.id) {
                                message.reply('Cannot kick self.');
                            } else if (target.roles.highest.position >= message.member.roles.highest.position) {
                                message.reply('Cannot kick users with a higher rank.');
                            } else {
                                if (!target.kickable) {
                                    message.reply('Cannot kick that user.');
                                } else {
                                    (await target.kick()) + message.reply('User successfully kicked.');
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                    message.reply('Error.');
                }
                break;

            case 'ban':
                try {
                    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                        message.reply('Insufficient Permissions.');
                    } else {
                        if (!msgArgs[1]) {
                            message.reply('Please specify a user to ban.');
                        } else {
                            const target = message.mentions.members.first();
                            if (target.id === message.member.id) {
                                message.reply('Cannot ban self.');
                            } else if (target.roles.highest.position >= message.member.roles.highest.position) {
                                message.reply('Cannot ban users with a higher rank.');
                            } else {
                                if (!target.bannable) {
                                    message.reply('Cannot ban that user.');
                                } else {
                                    (await target.ban()) + message.reply('User successfully banned.');
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                    message.reply('Error.');
                }
                break;

            case 'mute':
                try {
                    const mutedRole = message.guild.roles.cache.find((role) => role.name === 'Muted');
                    if (!mutedRole) {
                        message.reply('No Muted Role. Please contact an administrator.');
                    }
                    else if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
                        message.reply('Insufficient Permissions.');
                    } else {
                        if (!msgArgs[1]) {
                            message.reply('Please specify a user to mute.');
                        } else {
                            const target = message.mentions.members.first();
                            if (target.roles.highest.position >= message.member.roles.highest.position) {
                                message.reply('Cannot mute users with a higher rank.');
                            } else {
                                target.roles.add(mutedRole);
                                message.reply('User successfully muted.');
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                    message.reply('Error.');
                }
                break;

            case 'unmute':
                try {
                    const mutedRole = message.guild.roles.cache.find((role) => role.name === 'Muted');
                    if (!mutedRole) {
                        message.reply('No Muted Role. Please contact an administrator.');
                    }
                    else if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
                        message.reply('Insufficient Permissions.');
                    } else {
                        if (!msgArgs[1]) {
                            message.reply('Please specify a user to unmute.');
                        } else {
                            const target = message.mentions.members.first();
                            if (target.roles.highest.position >= message.member.roles.highest.position) {
                                message.reply('Cannot unmute users with a higher rank.');
                            } else {
                                target.roles.remove(mutedRole);
                                message.reply('User successfully unmuted.');
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
