const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js')
const channelIds = ['1224740234110173224', '1225138856098267267'];
const tokens = [process.env.token];

const client = new Discord.Client();
const reminderMessage = ' message here';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(() => {
    sendMessages();
  }, 500);
});

function sendMessages() {
  const promises = [];
  for (const token of tokens) {
    for (const channelId of channelIds) {
      promises.push(sendMessageWithTokenAndChannel(token, channelId));
    }
  }
  Promise.all(promises);
}

async function sendMessageWithTokenAndChannel(token, channelId) {
  const headers = { authorization: token };
  const data = { content: reminderMessage };

  try {
    await axios.post(`https://discord.com/api/v8/channels/${channelId}/messages`, data, { headers });
  } catch (error) {
    console.error(`Error sending message to channel ${channelId} with token ${token}: ${error}`);
  }
}

// Make sure to replace the channel IDs and the reminder message with your own
client.login(process.env.token);
