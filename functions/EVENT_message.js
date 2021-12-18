const { MessageEmbed } = require('discord.js');

function timeout(id, usedRecently, time) {
  usedRecently.add(id);
  setTimeout(() => usedRecently.delete(id), time);
}

function messageFail(message, body) {
  const client = message.client;
  client.functions.get('FUNC_MessageEmbedMessage')
    .run(client.user, message.author, body, '', 16449540, false);
}

module.exports.run = async (client, message, config, messageOwner, usedRecently) => {
  // return if unwanted
  if (message.author.bot) return;

  const prefix = await client.functions.get('FUNC_getPrefix').run(message);

  let text = message.content;
  if (
    message.channel.type !== 'dm'
    && message.mentions.members.first()
    && message.mentions.members.first().id === client.user.id
  ) {
    text = text.split('>')[1];
    if (text.charAt(0) === ' ') text = text.split(' ')[1];
    if (!text) return message.channel.send(`If you wish to see my commands, please type \`${prefix}help\` for a list of them^^!`);
    text = `${prefix}${text}`;
  }

  if (text.indexOf(prefix) !== 0) return;
  if (!await client.functions.get('FUNC_checkBotPermissions').run(message, 'SEND_MESSAGES')) {
    // FIXME: catch handler doesnt work
    // message.react('❌').catch();
    if (!config.permissionsServerBlacklist.includes(message.guild.id)) {
      messageFail(message, 'It appears that I lack the permissions required to send this here. I\'morry dear.');
    }
    return;
  }

  const messageArray = text.split(/\s+/g);
  const command = messageArray[0];
  const args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;

  const cmd = client.commands.get(command.slice(prefix.length).toLowerCase());

  if (cmd) {
    client.functions.get('FUNC_seenChangelog').run(client, message)
      .catch(console.log);
    if (!usedRecently.has(message.author.id)) {
      timeout(message.author.id, usedRecently, 1000);
      cmd.run(client, message, args, config, MessageEmbed, messageOwner, config.env.get('fa_cookie_a'), config.env.get('fa_cookie_b'))
        .catch(console.log);
    } else {
      message.reply('Snake brain overloaded. Please be slower with the commands, hun^^.');
    }
  }
};

module.exports.help = {
  name: 'EVENT_message',
};
