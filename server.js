const express = require('express')
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.json())

const db = require("./db")
const PORT = 3000

app.get('/', (req, res) => {
  res.send('WELCOME TO MY HOTEL... WHAT CAN I HELP YOU WITH !!!')
})

app.get('/paneer', (req, res) => {
  res.send('Sure sir, we would love to serve you panner, anything else ?')
})

app.get("/idli", (req, res) => {
  let custom_idli = {
    name: "rawa idli",
    size: "large",
    is_sambhar_present: true,
    is_chutney_present: false
  }
  res.send(custom_idli)
})

// import the router files
const personRoutes = require("./routes/personRoute")
const menuRoutes = require("./routes/menuRoute")

// use the routes
app.use("/person", personRoutes)
app.use("/menu", menuRoutes)


app.listen(PORT || 3000, () => {
  console.log(`server running on port ${PORT}`)
})   