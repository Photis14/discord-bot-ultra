const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})
//bot is online
client.on('ready', ()=>{
    console.log('Bot is Online!')
})

//upon reading messages
client.on('messageCreate', async message => {
    if (message.content.toLowerCase().includes('stupid')) { //bad word
        message.reply('Please refrain from using inappropriate language!'); //bots warning
    }
    if (message.content.toLowerCase().includes('hello')) {//Greeting
        message.reply('Hi there!');//bot response
    }
    if (message.content.toLowerCase().includes ('!clear')) {//user command
        try {
            const fetched = await message.channel.messages.fetch({ limit: 100 });//bot clear
            message.channel.bulkDelete(fetched);
        } catch (error) {
            console.log(`Error while clearing messages: ${error}`);//catch error
            message.channel.send('Error while clearing messages!');
        }
    }
});



client.login(process.env.TOKEN)
