const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")

dotenv.config()

// CONNECTION
mongoose.connect(process.env.DB_URL)
.then(() => console.log("Db Connection success!"))
.catch( (err) => {console.log(err)})

// ROUTE
app.use(express.json()) // JSON Kabul
app.use("/ugurapi/users", userRoute)
app.use("/ugurapi/auth", authRoute)

app.listen(3000, () => {
    console.log('App server start..');
});