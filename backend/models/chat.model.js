const mongoose = require("mongoose");

const msgSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = mongoose.Schema({
  users: [
    {
      type: String,
      required: true,
    },
  ],
  msgs: [msgSchema],
});

const conversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = conversationModel;
