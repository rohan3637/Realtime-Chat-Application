const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./config/connectToMongoDB.js");

const authRouter = require("./routes/auth.route.js");
const useRouter = require("./routes/users.route.js");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hhld chat app !!");
});

app.use("/auth", authRouter);
app.use("/users", useRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening at http://localhost.com/${PORT}`);
});
