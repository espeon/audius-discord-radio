module.exports = {
  name: "queue",
  description: "Bot queue",
  execute(bot, msg, args, serverQueue) {
    console.log(args);
    let pg = 0;
    let max =
      Math.round(serverQueue.songs.length / 10) +
      (serverQueue.songs.length % 10 < 5 ? 1 : 0);
    if (!serverQueue) return msg.channel.send("There is nothing playing.");
    if (global.queue.get(msg.guild.id) == undefined) return;
    if (!isNaN(args[0])) {
      if(args[0] > max) return msg.channel.send(`There are not enough pages! Please choose a number from 1 to ${max}`)
      pg = (JSON.parse(args[0]) - 1) * 10;
    }
    return msg.channel.send({
      embed: {
        title: `Queue:`,
        description: `${serverQueue.songs
          .slice(1 + pg, 11 + pg)
          .map(song => `**-** [${song.title}](${song.link})`)
          .join("\n")}\n
          **Now playing: **[${serverQueue.songs[0].title}](${
          serverQueue.songs[0].link
        })`,
        footer: {
          text: `page ${pg / 10 + 1} / ${max} | ${
            serverQueue.songs.length
          } songs`
        }
      }
    });
  }
};
