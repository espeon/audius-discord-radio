const findInMap = (map, val) => {
  for (let [k, v] of map) {
    if (v === val) { 
      return true; 
    }
  }  
  return false;
}

module.exports = {
    name: 'switch',
    description: 'switches radio stations',
    aliases: "station",
    execute(bot, msg, args, serverQueue) {
        const radioLinks = require("../functions/radioLinks");
        if (!msg.member.voice.channel) {
            return msg.channel.send(`You are not in a voice channel!`)
        }
        if (!global.queue.get(msg.guild.id)) {
            return msg.channel.send(`There is nothing playing.`)
        }
        if (!args[0]) {
          return msg.channel.send(`The current volume is **${serverQueue.volume}%**`)  
        }
        if(global.radio.get(parseInt(args[0])) == undefined){
          return msg.channel.send('This station doesn\'t exist.')
        }
        global.radioSelect = parseInt(args[0])
        let voiceChannel = global.queue.get(serverQueue.textChannel.guild.id).voiceChannel
        global.queue.delete(serverQueue.textChannel.guild.id);
      
        function playPlaylist(links) {
      return new Promise(resolve => {
          func(0);
          async function func(num){
            let res = await radioLinks(global.message, links[num], voiceChannel, global.youtube)//audius(links[num])
            console.log(res + " res");
            console.log(links.length + " " + num)
            if(links.length - 1 <= num){
              return console.log('ou f links')
            } else {
              func(num + 1)
              console.log(num + 1)
            }
          };
          resolve("done");
          //let res = await radioLinks(global.message, global.radio.get(global.radioSelect).links[index], voiceChannel, global.youtube)
      });
    }
    playPlaylist(global.radio.get(global.radioSelect).links);
    },
}
