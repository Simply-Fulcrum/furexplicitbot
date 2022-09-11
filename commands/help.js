const { MessageEmbed } = require('discord.js');

module.exports.run = async (interaction) => {
  const embed = new MessageEmbed()
<<<<<<< HEAD
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
=======
    .setTitle('Halp')
    .setColor('ORANGE')
    .setDescription(uwu('This command is ßßdeprecated, please use discord embedded slash-commands feature for help instead. ßß(/)'))
    .addField(uwu('Still need help?'), uwu('Join our server here: ßßhttps://discord.gg/fMYD6XR'));
  return reply(interaction, { embeds: [embed] });
>>>>>>> 3aac6841bd18b8c97236824da98f0dca1cbbdd02
};

module.exports.data = new CmdBuilder()
  .setName('help')
  .setDescription('Shows a list of commands. [Deprecated]');
