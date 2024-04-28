const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectToMongoDB = require("./config/connectToMongoDB");
const { addMsgToConversation } = require("./controllers/msg.controller.js");
const { subscribe, publish } = require("./redis/msgsPubSub.js");

const msgsRouter = require("./routes/msgs.route.js");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/msgs", msgsRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    allowedHeaders: ["*"],
    origin: "*",
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  userSocketMap[username] = socket;
  const channelName = `chat_${username}`;
  subscribe(channelName, (msg) => {
    socket.emit("chat msg", JSON.parse(msg));
  });

  socket.on("chat msg", (msg) => {
    const receiverSocket = userSocketMap[msg.receiver];
    if (receiverSocket) {
      receiverSocket.emit("chat msg", msg);
    } else {
      const channelName = `chat_${msg.receiver}`;
      publish(channelName, JSON.stringify(msg));
    }

    addMsgToConversation([msg.sender, msg.receiver], {
      text: msg.text,
      sender: msg.sender,
      receiver: msg.receiver,
    });
  });
});

// define a route
app.get("/", (req, res) => {
  res.send("hhld chat app !!");
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening at http://localhost.com/${PORT}`);
});
