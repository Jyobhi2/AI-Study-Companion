
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

console.log("Mongo URI:");
console.log(process.env.MONGO_URI);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Auth Routes
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// Upload Routes
app.use(
  "/api/upload",
  require("./routes/uploadRoutes")
);

// Chat Routes
app.use(
  "/api/chat",
  require("./routes/chatRoutes")
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running on Port ${PORT}`
  );

});
