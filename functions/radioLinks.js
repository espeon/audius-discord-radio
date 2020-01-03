module.exports = radioLinks;
const handleVideo = require("../functions/handleVideo");
const discord = require("discord.js");
const axios = require("axios");
const request = require("request");

async function e(options) {
  return new Promise(resolve => {
    request(options, async function(error, response, body) {
      let q = await JSON.parse(body);
      resolve(JSON.parse(body).data[0]);
    });
  });
}
async function b(list, msg, voiceChannel) {
  for (const id of list) {
    let options = {
      url: "https://discoveryprovider3.audius.co/tracks",
      qs: { id: id.track },
      headers: {
        Host: "discoveryprovider3.audius.co",
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
        json: true
      }
    };
    let q = await e(options);
    let info = [];
    info.id = id;
    info.title = q.title;
    info.murl = `https://kanbot-api.glitch.me/api/audius/generate.m3u8?id=${
      q.track_id
    }&title=${q.route_id.split("/")[1]}&handle=${q.route_id.split("/")[0]}`;
    info.streamlink = info.streamlink = `https://audius.co/${q.route_id}-${q.track_id}`;
    await handleVideo(info, msg, voiceChannel, true);
  }
}
async function radioLinks(msg, argu, voiceChannel, youtube){
  let id = argu
    .replace("https://audius.co/", "")
    .split("-")
    .pop();
  let options = {
    url: "https://discoveryprovider3.audius.co/playlists",
    qs: { playlist_id: id },
    headers: {
      Host: "discoveryprovider3.audius.co",
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
      json: true
    }
  };
  return new Promise(resolve => {
    request(options, async function(error, response, body) {
      let optionsarray = [];
      let list = JSON.parse(body).data[0].playlist_contents.track_ids;
      let res = await b(list, msg, voiceChannel);
      resolve(JSON.parse(body).data[0].playlist_name)
    });
  });
};
