const express = require("express");
const app = express();
const env = require("dotenv");
const path = require("path");
env.config();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const userRoutes = require("./user-routes");
const auth = require("./auth");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
const sequelize = require("./database");
const User = require("./user-model");
const Message = require("./user-messages");
const corsOptions = {
  origin: "*",
  methods: "POST,GET",
};
app.use(cors(corsOptions));
// app.use(auth)
app.use(userRoutes);
const PORT = 3001 || process.env.PORT;
app.use((req, res) => {
  res.sendFile(path.join(__dirname, `/${req.url}`));
});

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
// app.listen(PORT, () => console.log(`server started at port ${PORT}`));
User.hasMany(Message);
Message.belongsTo(User);
sequelize
  //   .sync({force:true})
  //  .sync({alter:true})
  .sync()
  .then((result) => {
    app.listen(PORT);
    console.log("server started on " + PORT);
  })
  .catch((err) => console.log(err));
