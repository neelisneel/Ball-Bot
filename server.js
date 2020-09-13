require('dotenv').config();
const Discord = require('discord.js');
const Commands = require('./commands');

const TOKEN = process.env.TOKEN;
const CLIENT = new Discord.Client();

CLIENT.commands = new Discord.Collection();

Object.keys(Commands).map(key => {
  CLIENT.commands.set(Commands[key].name, Commands[key]);
});

CLIENT.login(TOKEN);

CLIENT.on('ready', () => {
  console.info(`Logged in as ${CLIENT.user.tag}!`);
});

CLIENT.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!CLIENT.commands.has(command)) return;

  try {
    CLIENT.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('Error executing command! (Check the player/team name spelling)');
  }
});