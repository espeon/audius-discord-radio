module.exports = play
const handleVideo = require("../functions/handleVideo");
async function play(guild, songe) {
  const ytdl = require("ytdl-core")
  const leaveVC = require("../functions/leaveVC")
  const radioLinks = require("../functions/radioLinks");
  const serverQueue = global.queue.get(guild.id)

  if (!songe) {
    let voiceChannel = global.queue.get(guild.id).voiceChannel
    global.queue.delete(guild.id);
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
  }
  let song = serverQueue.songs[0]
  if (song.url.includes("youtube")) {
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url), {
        volume: 0.5,
        bitrate: serverQueue.bitrate,
        passes: 10
      })
      .on("end", reason => {
        if (reason === "Stream is not generating quickly enough.")
          console.log("Song ended.")
        else console.log(reason)
        serverQueue.songs.shift()
        play(guild, serverQueue.songs[0])
      })
      .on("error", error => console.error(error))
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100)
  } else if (song.url.includes("sndcdn")) {
    const dispatcher = serverQueue.connection
      .play(song.url, {
        volume: 0.5,
        bitrate: serverQueue.bitrate,
        passes: 10
      })
      .on("end", reason => {
        if (reason === "Stream is not generating quickly enough.")
          console.log("Song ended.")
        else console.log(reason)
        serverQueue.songs.shift()
        play(guild, serverQueue.songs[0])
      })
      .on("error", error => console.error(error))
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100)
  } else if (song.url.includes("audius")) {
    const dispatcher = serverQueue.connection
      .play(song.url, {
        volume: 0.5,
        bitrate: serverQueue.bitrate,
        passes: 50
      })
      .on("end", reason => {
        if (reason === "Stream is not generating quickly enough.")
          console.log("Song ended.")
        else console.log(reason)
        serverQueue.songs.shift()
        play(guild, serverQueue.songs[0])
      })
      .on("error", error => console.error(error))
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100)
  }
}