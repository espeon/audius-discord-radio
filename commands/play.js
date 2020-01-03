Array.prototype.forEachAsync = async function (callback) {
  for (let index = 0; index < this.length; index++) {
    await callback(this[index], index, this);
  }
};

module.exports = {
  name: "play",
  description: "Play a song in VC!",
  async execute(bot, msg, args, serverQueue, youtube) {
    args = JSON.stringify(args);
    const radioLinks = require("../functions/radioLinks");
    const discord = require("discord.js");
    const axios = require("axios");
    const request = require("request");
    const handleVideo = require("../functions/handleVideo");
    const voiceChannel = msg.member.voice.channel;

    if (!voiceChannel) {
      return msg.channel.send(`It seems you aren't in a voice channel.`);
    }

    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        `I may not have permissions to connect to vc... could someone please check?`
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        `i may not have permissions to speak in vc... could someone please check?`
      );
    }

    function playPlaylist(links) {
      return new Promise(resolve => {
          func(0);
          async function func(num){
            let res = await radioLinks(global.message, links[num], voiceChannel, global.youtube)//audius(links[num])
            if(links.length - 1 <= num){
              return
            } else {
              func(num + 1)
            }
          };
          resolve("done");
          //let res = await radioLinks(global.message, global.radio.get(global.radioSelect).links[index], voiceChannel, global.youtube)
      });
    }
    playPlaylist(global.radio.get(global.radioSelect).links);
    let skip = true;
  }
};
