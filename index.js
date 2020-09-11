require('dotenv').config();
const Discord = require('discord.js');
const botClient = new Discord.Client();
const botCommands = require('./commands');

botClient.commands = new Discord.Collection();

Object.keys(botCommands).map(key => {
  botClient.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

botClient.login(TOKEN);

botClient.on('ready', () => {
  console.info(`Logged in as ${botClient.user.tag}!`);
});

botClient.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!botClient.commands.has(command)) return;

  try {
    botClient.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});