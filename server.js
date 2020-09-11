require('dotenv').config();
const Discord = require('discord.js');
const botCommands = require('./commands');

const TOKEN = process.env.TOKEN;
const botClient = new Discord.Client();
botClient.commands = new Discord.Collection();

Object.keys(botCommands).map(key => {
  botClient.commands.set(botCommands[key].name, botCommands[key]);
});

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
    msg.reply('Error executing command! (Check the player/team name spelling)');
  }
});