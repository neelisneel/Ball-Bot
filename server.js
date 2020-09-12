require('dotenv').config();
const DISCORD = require('discord.js');
const COMMANDS = require('./commands');
const TOKEN = process.env.TOKEN;
const CLIENT = new DISCORD.Client();

CLIENT.commands = new DISCORD.Collection();

Object.keys(COMMANDS).map(key => {
  CLIENT.commands.set(COMMANDS[key].name, COMMANDS[key]);
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