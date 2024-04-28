const dotenv = require("dotenv");
dotenv.config();

const Redis = require("ioredis");

const subscriber = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PWD,
  username: process.env.REDIS_USER,
  tls: {},
});

const publisher = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PWD,
  username: process.env.REDIS_USER,
  tls: {},
});

const subscribe = (channel, callback) => {
  subscriber.subscribe(channel, (err, count) => {
    if (err) {
      console.error("Error subscribing to channel:", err);
      return;
    }
    console.log(`Subscribed to ${channel}`);
  });
};

subscriber.on("message", (subscribedChannel, message) => {
  console.log("Subscriber ", subscribedChannel, " has received msg ", message);
  if (subscribedChannel === channel) {
    callback(message);
  }
});

const unsubscribe = (channel) => {
  subscriber.unsubscribe(channel, (err, count) => {
    console.error("Error unsubscribing from channel:", err);
    return;
  });
  console.log(`Unsubscribed from ${channel}`);
};

const publish = async (channel, message) => {
  try {
    await publisher.publish(channel, message);
    console.log(`Published message to ${channel}: ${message}`);
  } catch (err) {
    console.error("Error publishing message:", error);
  }
};

module.exports = { subscribe, unsubscribe, publish };
