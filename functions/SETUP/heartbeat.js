// Calls all the functions that are needed for a heartbeat
module.exports.run = async () => {
  if (DEBUG) return;
  LOG(`[${module.exports.data.name}] Start sending heartbeats...`);
  // autopost (e621)
  client.functions.get('HEARTBEAT_autopost').run();
};

module.exports.data = {
  name: 'heartbeat',
  callOn: '-',
};
