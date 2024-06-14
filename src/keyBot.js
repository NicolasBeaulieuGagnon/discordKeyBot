const fs = require("fs");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],

  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

const messageToMatch = "React 👍 to this message to receive your key!";

let availableKeys = [];
let usedKeys = [];
let usersSentMessage = [];

function saveUsersToJson(usersSet) {
  fs.writeFileSync("users.json", JSON.stringify(usersSet));
}

const removeUsedKey = (key) => {
  usedKeys.push(key);
  availableKeys = availableKeys.filter((availableKey) => availableKey !== key);
  fs.writeFileSync("keys.json", JSON.stringify(availableKeys));
  fs.writeFileSync("usedKeys.json", JSON.stringify(usedKeys));
};

fs.readFile("users.json", (err, data) => {
  if (err) return;
  usersSentMessage = JSON.parse(data);
});
fs.readFile("keys.json", (err, data) => {
  if (err) return;
  availableKeys = JSON.parse(data);
});
fs.readFile("usedKeys.json", (err, data) => {
  if (err) return;
  usedKeys = JSON.parse(data);
});

client.once("ready", () => {
  console.log("Bot is ready");
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (
    reaction.emoji.name === "👍" &&
    reaction.message.content === messageToMatch &&
    reaction.message.author.id === AUTHOR_ID &&
    !usersSentMessage.includes(user.id)
  ) {
    const randomIndex = Math.floor(Math.random() * availableKeys.length);
    const foundKey = availableKeys[randomIndex];
    if (!foundKey) {
      console.warn(getKeyErrorMessage(randomIndex, availableKeys));
      process.exit();
    }

    const messageToSend = `Here is your steam key! Happy play test. ${foundKey}`;

    user
      .send(messageToSend)
      .then(() => {
        console.log(`Sent message to ${user.username}`);
        removeUsedKey(foundKey);
        saveUsersToJson([...usersSentMessage, user.id]);
      })
      .catch(console.error);

    if (availableKeys.length === 1) {
      const guildMember = reaction.message.guild.members.cache.get(user.id);
      const nickname = guildMember
        ? guildMember.nickname || user.username
        : user.username;
      reaction.message.channel.send(
        `Out of stock! **${nickname}** has claimed the last key! Shutting down for now...`
      );
      process.exit();
    }
  }
});

client.login(LOGIN_KEY);

const getKeyErrorMessage = (keyIndex, currentKeys) => {
  if (!currentKeys.length) {
    return `ERROR: No more available keys. Shutting down...`;
  }
  return `ERROR: No key found at index ${keyIndex}. AvailableKeys: ${currentKeys.length}. Shutting down...`;
};
