// creates a embed messagetemplate for failed actions
function messageFail(message, body) {
  const client = message.client;
  client.functions.get('FUNC_MessageEmbedMessage')
    .run(client.user, message.channel, body, '', 16449540, false)
    .then((msg) => msg.delete({ timeout: 10000 }));
}

module.exports.run = async (client, message, args, config, MessageEmbed, messageOwner, fa_token_A, fa_token_B) => {
  // check if user can manage nicknames
  if (!message.member.hasPermission('MANAGE_NICKNAMES')) return messageFail(message, 'You dwon\'t hawe access to thwis command òwó');
  // post help text
  const embed = new MessageEmbed()
    .setAuthor('Howo two change the prefix:')
    .setColor(message.member.displayColor)
    // .setDescription(description)
    .addField('Desktop', desktop)
    .addField('Mobile', mobile)
    .addField('Hawing trowble?', `
      I've got you cowered.
      Join the halp serwer here: https://discord.gg/fMYD6XR
      `)
    .addField('Why thwis complicated!?', expain);
  message.channel.send({ embed });
};

module.exports.help = {
  name: 'prefix',
  title: 'Change prefix',
  desc: 'Howo two change the prefix.',
};
