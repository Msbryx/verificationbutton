const { Collection, Client, Discord, MessageEmbed, Message } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
require('discord-buttons')(client);
const path = require('path')
const fs = require('fs')
const discordbuttons = require('discord-buttons')
const { MessageButton, MessageActionRow } = require("discord-buttons")
const keepAlive = require("./server");
const config = require('./config.json');
client.prefix = config.prefix;

client.on('clickButton', async (button) => {
    if (button.id == 'AddVerifiedRole') {
        button.reply.send(`เราให้ยศคุณแล้ว!`, true)//ตอนกดยืนยันข้อความจะขึ้น
        const role = button.guild.roles.cache.get(config.roleid)
        const member = button.clicker.member
        await member.roles.add(role)
    }{}
})

client.on('ready', () => {
    console.log('The bot is online!')
})

client.on('message', async (message) => {
    if (message.content.startsWith('.verify')) {
        const embed = new MessageEmbed()
            .setTitle('ยืนยัน')//หัวข้อกล่องข้อความ
            .setColor("GREEN")
            .setDescription('กดเพื่อยืนยันตัวตนรับยศเข้าดิส!')//ข้อมความในกล่อง

        const add = new MessageButton()
            .setStyle("green")
            .setLabel("ยืนยัน!")//คำตรงปุ่มกด
            .setID("AddVerifiedRole")

        const row = new MessageActionRow()
            .addComponent([add])


        message.channel.send({ component: row, embed: embed })
    }
})
keepAlive();
client.login(process.env.TOKEN);
