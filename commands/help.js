module.exports.run = async (client, message, args, config, MessageEmbed, messageOwner, fa_token_A, fa_token_B) => {
  const prefix = await client.functions.get('FUNC_getPrefix').run(message);
  const embed = new MessageEmbed()
    .setAuthor('How to use me:');
  if (message.channel.type !== 'dm') embed.setColor(message.member.displayColor);
  // creating embed fields for every command
  client.commands.forEach((CMD) => {
    if (!CMD.help.title) return;
    embed.addField(CMD.help.title,
      `\`${prefix}${CMD.help.name} ${CMD.help.usage || ''}\`
      ${CMD.help.desc}`, false);
  });
  embed.addField('Have an idea for me? 💡', `
      Don't let it die!
      Suggest it to Fulcrum#9999
      `)
    .addField('Need Help?', `
      Please contact Fulcrum#9999
      `)
    .setFooter(client.user.tag, client.user.displayAvatarURL)
    .setTimestamp();
  message.channel.send({ embed });
};

module.exports.help = {
  name: 'help',
};
