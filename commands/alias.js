module.exports.run = async (client, message, args, config, MessageEmbed, messageOwner, fa_token_A, fa_token_B) => {
  // post help text
  const embed = new MessageEmbed()
    .setAuthor('Command aliases:')
    .setColor(message.member.displayColor)
    .addField('e621', 'e, e6, e62, e621')
    .addField('InkBunny', 'ib, ibun, ibunny, inkb, inkbunny')
    .addField('Rule34', 'r, 34, r34, ru34, rule34');
  message.channel.send({ embed });
};

module.exports.help = {
  name: 'alias',
  title: 'Command aliases',
  desc: 'Showos the alteraniwe, shorter commands.',
};
