const NBA = require("nba");
const Discord = require("discord.js");

module.exports = {
    name: '!player',
    description: 'Provides NBA player stats - Requires first and last name',
    execute(msg, args) {
        if(args.length == 3){
            const playerName = args[0] + ' ' + args[1];
            const season = args[2]
            const player = NBA.findPlayer(playerName)
            const regex = /\d{4}-\d{2}/
            
            if(!regex.test(args[2]) || !(args[2].length == 7)){
                console.error("Illegal season input, must be in format XXXX-XX")
                msg.reply('Illegal season argument. Example input season: 2015-16')
            }
            
            const embedMsg = new Discord.MessageEmbed()
                .setColor('#33a0ff')
            
            NBA.stats.playerSplits({PlayerID: player.playerId, Season: season})
                .then(value => {
                    let splits = value.overallPlayerDashboard.pop();
                });

            NBA.stats.playerInfo({PlayerID: player.playerId, Season: season})
                .then(value => {
                    let info = value.commonPlayerInfo.pop();
                    embedMsg.setTitle(`${info.displayFirstLast}'s ${args[2]} season profile`)
                    msg.channel.send(embedMsg)
                });
            
            

        }
        else{
            console.error("Illegal number of arguments - requires 3");
            msg.reply('Command requires first and last name of player, and season year'); 
        }
    },
  };