const clean = (text) => {
  if (typeof (text) === 'string') {
    Object.values(process.env).forEach((env) => {
      if (env.length <= 3) return;
      // eslint-disable-next-line no-param-reassign
      text = text.replaceAll(env, '****NOPE****');
    });
    return text.replaceAll(/`/g, `\`${String.fromCharCode(8203)}`)
      .replaceAll(/@/g, `@${String.fromCharCode(8203)}`);
  }
  return text;
};
<<<<<<< HEAD

module.exports.run = async (client, message, args, config, MessageEmbed, messageOwner, fa_token_A, fa_token_B) => {
  const args_eval = message.content.split(' ').slice(1);
  if (message.author.id !== config.owner) return message.channel.send(`Do I know you **${message.author.tag}**? Only the Devs can use this~`).then(message.react('❌'));
  if (message.content.indexOf('token.token' || 'process.env.BOT_TOKEN' || 'token') !== -1) return message.channel.send('Do you think its that easy?\nSorry hun, but cant give you my key...');
=======
module.exports.run = async (interaction) => {
  // check owner permissions
  if (interaction.user.id !== '172031697355800577') return messageFail(interaction, `You are not authorized to use \`/${module.exports.data.name}\``, null, false);
  const code = interaction.options.getString('codeline', true);
>>>>>>> 3aac6841bd18b8c97236824da98f0dca1cbbdd02
  try {
    let evaled = eval(code);

    if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled); }

    messageSuccess(interaction, `\`\`\`xl\n${clean(evaled)}\n\`\`\``, null, true);
  } catch (err) { messageFail(interaction, `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``); }
};

module.exports.data = new CmdBuilder()
  .setName('eval')
  .setDescription('Command used to run snippets of code. [OWNER ONLY].')
  .addStringOption((option) => option.setName('codeline').setDescription('Commandline to execute').setRequired(true));
