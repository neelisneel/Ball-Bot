const NBA = require("nba");
const Discord = require("discord.js");
const embed = require('../helper_modules/embed.js')

module.exports = {
    name: '!playerstats',
    description: 'Provides NBA player statistics',
    execute(msg, args) {
        if(args.length == 3){
            const playerName = args[0] + ' ' + args[1];
            const season = args[2];
            const player = NBA.findPlayer(playerName);
            const regex = /\d{4}-\d{2}/;
      
            if(!regex.test(season) ||
            !season.length == 7 ||
            !(Number(season[5]+season[6]) - Number(season[2]+season[3]) === 1))
            {
                console.error("Illegal season input, must be in format XXXX-XX");
                msg.reply('Illegal season argument. Example input season: 2015-16');
                return;
            }
            
            const embedMsg = new Discord.MessageEmbed()
                .setColor('#33a0ff')
                .attachFiles('./assets/github.png')
                .setAuthor('Author: Neel', 'attachment://github.png', 'https://github.com/neelisneel/')
                
            NBA.stats.playerSplits({PlayerID: player.playerId, Season: season})
                .then(value => {
                    console.log(value.overallPlayerDashboard.pop());
                });
        }
        else{
            console.error("Illegal number of arguments - requires 3");
            msg.reply('Command requires first/last name of player, and season year'); 
        }
    },
  };