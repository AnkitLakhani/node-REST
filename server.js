const  express = require("express")
const app = express()
const body_parser = require("body-parser")
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
const mongoose = require("./db.js")
const routers = require("./router")
app.use('/', routers);
app.listen(3000,()=>{
  console.log("serveris running on 3000")
})

module.exports = {app};
