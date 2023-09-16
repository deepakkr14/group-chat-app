const express = require("express");
const app = express();
const env = require("dotenv");
env.config();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const userRoutes = require("./user-routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
const sequelize = require("./database");
app.use(cors());
app.use(userRoutes);
const PORT = 3001 || process.env.PORT;
// app.use('*',(req,res)=>{
//     res.sendFile(__dirname+'/signup.html')

// })
// app.listen(PORT, () => console.log(`server started at port ${PORT}`));
sequelize
//   .sync({force:true})
  //  .sync({alter:true})
  .sync()
  .then((result) => {
    console.log("server started on " + PORT);

    app.listen(PORT);
  })
  .catch((err) => console.log(err));
