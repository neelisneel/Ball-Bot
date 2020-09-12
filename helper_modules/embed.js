const Discord = require("discord.js");

module.exports.createEmbed = () => {
    return new Discord.MessageEmbed()
    .setColor('#33a0ff')
    .attachFiles('./assets/github.png')
    .setAuthor('Author: Neel', 'attachment://github.png', 'https://github.com/neelisneel/')
}
