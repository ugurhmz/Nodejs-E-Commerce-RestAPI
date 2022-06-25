
const express = require("express");
const app = express();
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://ugurhmz:1994ugur@ecommerce-db.sxqvm.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("Db Connection success!"))
.catch( (err) => {console.log(err)})

app.listen(3000, () => {
    console.log('App server start..');
});