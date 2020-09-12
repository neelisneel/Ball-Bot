require('dotenv').config();
const NBA = require("nba");
const PLAYER_IMAGES = process.env.PLAYER_IMAGES;
const EMBED = require('../helper_modules/embed.js');

module.exports = {
    name: '!playerinfo',
    description: 'Provides NBA player profile',
    execute(msg, args) {
        if(args.length == 2){
            const playerName = args[0] + ' ' + args[1];
            const player = NBA.findPlayer(playerName);
            const embedMsg = EMBED.createEmbed();

            NBA.stats.playerInfo({PlayerID: player.playerId}).then(value => {
                const info = value.commonPlayerInfo.pop();
                const birthdate = new Date(info.birthdate).getFullYear();
                const age = Math.abs(new Date().getFullYear() - birthdate)
                const draftInfo = (info.draftYear === "Undrafted" ? "Undrafted" : 
                `${info.draftYear} round ${info.draftRound} pick ${info.draftNumber}`);

                embedMsg
                    .setThumbnail(`${PLAYER_IMAGES}${args[1]}/${args[0]}`)
                    .setTitle(`__🏀 ${info.displayFirstLast}'s NBA player profile 🏀__`)
                    .addField(
                        '__Info__',
                        `👊 Team: ***${info.teamCity} ${info.teamName}***\n
                        📅 Age: ***${age}***\n
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
