const NBA = require("nba");


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

            NBA.stats.playerSplits({PlayerID: player.playerId, Season: season})
                .then(value => console.log(value.overallPlayerDashboard));

            NBA.stats.playerInfo({PlayerID: player.playerId, Season: season})
                .then(value => console.log(value.commonPlayerInfo));

            msg.channel.send(player.playerId);
        }
        else{
            console.error("Illegal number of arguments - requires 3");
            msg.reply('Command requires first and last name of player, and season year'); 
        }
    },
  };