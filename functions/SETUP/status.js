const { ActivityType } = require('discord.js');

module.exports.run = async () => {
  if (DEBUG) return;
  LOG(`[${module.exports.data.name}] Setting status...`);
  const membercount = await client.guilds.cache.reduce((previousCount, currentGuild) => previousCount + currentGuild.memberCount, 0);
  await client.user.setActivity(`${membercount} members in Devoravore`, { type: 'WATCHING' });
  LOG(`[${module.exports.data.name}] Status set!`);
};

module.exports.data = {
  name: 'status',
  callOn: '-',
};
