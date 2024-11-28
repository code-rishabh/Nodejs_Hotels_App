const mongoose = require("mongoose")

// Define the mongodb connection URL
const mongodbURL = "mongodb://localhost:27017/hotels"

// Set up the mongodb connection
mongoose.connect(mongodbURL)
  .then(() => {
    console.log(`connected to mongodb`)
  })
  .catch((err) => {
    console.log(`error connecting to mongodb : ${err}`)
  })

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection

// Define event listener for database connection
db.on("connected", () => {
  console.log(`Connected to MongoDB server !!!`)
})

db.on("disconnected", () => {
  console.log(`Disconnected !!!`)
})

module.exports = db