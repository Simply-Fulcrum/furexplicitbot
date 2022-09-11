// TODO: Eventually also offer a App>link inside of discord to look for the source

const { MessageEmbed } = require('discord.js');

const axios = require('axios');

function checkURL(orgURL, allowedFiletypes) {
  const url = new URL(orgURL);
  const filename = url.pathname.split('/').reverse()[0];
  const ext = filename.slice(filename.lastIndexOf('.') + 1, filename.length);
  const result = allowedFiletypes.includes(ext);
  return result;
}

<<<<<<< HEAD
module.exports.run = async (client, message, args, config, MessageEmbed) => {
  if (message.channel.type === 'dm') return messageFail(message, 'This command is - for now - server only.');
  if (!message.channel.nsfw) return messageFail(message, 'Sorry Hun, this channel is not marked as NSFW. I\'m afraid I can\'t post that here. Please try again in a more appropriate place~');
  const prefix = await client.functions.get('FUNC_getPrefix').run(message);
  let [link] = args;
  if (!link) {
    if (message.attachments.array()[0]) { link = message.attachments.array()[0].url; } else {
      return messageFail(message,
        `Command usage: 
      \`\`\`${prefix}${module.exports.help.name} (LINK/)attachment\`\`\``);
    }
  }
  if (!checkURL(link, config.imageFinder.allowedFiletypes)) return messageFail(message, `Sorry dear, I only support these file types: ${config.imageFinder.allowedFiletypes.join(', ')}`);
  const source = await client.functions.get('FUNC_getSource').run(link);
  if (!source) return messageFail(message, 'I cannot find this image, please try elsewhere.');
  const site = config[source.website];
=======
const api = axios.create({
  baseURL: config.commands.source.uri,
  timeout: 5000,
  headers: { 'User-Agent': `${config.package.name}/${config.package.version}` },
});

async function getSource(link, nsfw) {
  const params = config.commands.source.params;
  params.url = link;
  // Unfortunatly the api still posts nsfw content
  // params.hide = nsfw ? 0 : 3;
  params.hide = 0;
  params.api_key = process.env.token_sauceNao;

  // TODO: add catch for better error handling if website refuses service
  const awnser = await api.get('', { params });
  if (awnser.error) return null;
  const results = awnser.data.results;
  if (results.length === 0) return null;
  // sort above 85%
  const preSort = results.filter((res) => res.header.similarity <= config.commands.source.minSimilarity);
  // check for e621 post, because trusted
  const e6post = preSort.filter((res) => res.header.index_id === config.commands.source.e621Index);

  return e6post.length ? e6post[0] : preSort[0];
}

module.exports.run = async (interaction) => {
  // AWAIT: We are waiting for discord to implement a better way to send images alongside command or Discord.JS support for Apps
  // if (message.attachments.array()[0]) { link = message.attachments.array()[0].url; } else {
  //   return messageFail(
  //     interaction,
  //     `Command usage:
  //   \`\`\`${prefix}${module.exports.help.name} (LINK/)attachment\`\`\``);
  // }
  if (!interaction.channel.nsfw) return messageFail(interaction, uwu('Sorry, but this feature is only supported in NSFW marked rooms. ßßuwu'));
  const link = interaction.options.getString('url');

  const fileTypes = config.commands.source.allowedFiletypes;
  if (!checkURL(link, fileTypes)) return messageFail(interaction, uwu(`Sorry, I don't support this filetype. Only ßß${fileTypes.join(', ßß')}`));
  const source = await getSource(link, interaction.channel.nsfw);
  // put extern url into source, and if none is provided: set to text which cant pass the regex
  if (!source.data.source && source.data.ext_urls.length === 1) source.data.source = source.data.ext_urls[0];
  else source.data.source = 'noSource';
  if (!source || !source.data.source.startsWith('http')) return messageFail(interaction, uwu('Sorry, but i wasn\'t able to find your picture. ßßuwu'));
>>>>>>> 3aac6841bd18b8c97236824da98f0dca1cbbdd02
  const embed = new MessageEmbed()
    .setColor('ORANGE')
    // AWAIT: TODO: Remove this if feature is out of beta
    .setDescription(`${uwu('This feature is still in beta. Don\'t expect any exact results!')}`)
    .setAuthor({ name: `Artist: ${source.data.creator || 'Unknown'} [${Math.round(source.header.similarity)}% similarity]` })
    .setTitle('Image Link')
    .setURL(source.data.source)
    .setThumbnail(source.header.thumbnail)
    .setFooter({ text: 'Found with saucenao.com', iconURL: config.commands.source.searcherLogo });
  const msg = await reply(interaction, { embeds: [embed], fetchReply: true });
  msg.react('❌');
};

<<<<<<< HEAD
module.exports.help = {
  name: 'source',
  title: 'Find source',
  usage: 'LINK/attachment',
  desc: 'Finds the source to a image.',
};
=======
module.exports.data = new CmdBuilder()
  .setName('source')
  .setDescription('Finds the source of a picture.')
  .addStringOption((option) => option
    .setName('url')
    .setDescription('A URL to the picture.')
    .setRequired(true));
>>>>>>> 3aac6841bd18b8c97236824da98f0dca1cbbdd02
