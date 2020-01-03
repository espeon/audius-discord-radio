require('dotenv').config()
const { token, token1, token2 } = process.env;
const { ShardingManager } = require('discord.js');
process.env.pm_id = 0
const manager = new ShardingManager('./client.js', { token: token1 });

console.log(process.env.pm_id)

manager.spawn();
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));
