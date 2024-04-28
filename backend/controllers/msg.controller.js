const Conversation = require("../models/chat.model.js");

const addMsgToConversation = async (participants, msg) => {
  try {
    let conversation = await Conversation.findOne({
      users: { $all: participants },
    });
    if (!conversation) {
      conversation = await Conversation.create({ users: participants });
    }
    conversation.msgs.push(msg);
    await conversation.save();
  } catch (err) {
    console.log("Error adding msg to the conversation" + err.message);
  }
};

const getMsgsForConversation = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    const participants = [sender, receiver];
    const conversation = await Conversation.findOne({
      users: { $all: participants },
    });
    if (!conversation) {
      return res.status(200).json([]);
    }
    return res.status(200).json(conversation?.msgs);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!" + err.message,
    });
  }
};

module.exports = { getMsgsForConversation, addMsgToConversation };
