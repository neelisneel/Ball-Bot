const NBA = require("nba");
const Discord = require("discord.js");

module.exports = {
    name: '!playerinfo',
    description: 'Provides NBA player profile',
    execute(msg, args) {
        if(args.length == 2){
            const playerName = args[0] + ' ' + args[1];
            const player = NBA.findPlayer(playerName);
            
            const embedMsg = new Discord.MessageEmbed()
                .setColor('#33a0ff')
                .attachFiles('./assets/github.png')
                .setAuthor('Author: Neel', 'attachment://github.png', 'https://github.com/neelisneel/');

            NBA.stats.playerInfo({PlayerID: player.playerId})
                .then(value => {
                    const info = value.commonPlayerInfo.pop();
        
                    let draftInfo = (info.draftYear === "Undrafted" ? "Undrafted" : 
                    `${info.draftYear} round ${info.draftRound} pick ${info.draftNumber}`);

                    embedMsg
                        .setTitle(`🏀 ${info.displayFirstLast}'s NBA player profile 🏀`)
                        .addField(
                            '__Info__',
                            `👊 Team: ***${info.teamCity} ${info.teamName}***\n
                            🌎 Country: ***${info.country}***\n
                            🎓 School: ***${info.school}***\n
                            🚶‍♂️ Height/Weight: ***${info.height} feet/${info.weight} lbs***\n
                            🗒️ Draft Selection: ***${draftInfo}***\n
                            👕 Jersey Number: ***${info.jersey}***`
                        );
                    
                    msg.channel.send(embedMsg);
                });
        }
        else{
            console.error("Illegal number of arguments - requires 2");
            msg.reply('Command requires first and last name of player'); 
        }
    },
  }
