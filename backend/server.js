const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// Routes
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const medias = require("./routes/api/medias");
const daos = require("./routes/api/daos");

const app = express();

// Bodyparser middleware
app.use(bodyParser.json({limit: "5mb"}));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
    parameterLimit:5000
  })
);

// Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/medias", medias);
app.use("/api/daos", daos);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

const hostname = 'localhost';
const port = 5000;

app.listen(port, hostname, () => {
  console.log(`Server up and running at ${hostname}:${port} !`);
});