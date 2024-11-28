const express = require("express")
const router = express.Router()
const Person = require("../models/person")

// GET method to get the person
router.get("/", async (req, res) => {
  try {
    const personData = await Person.find()
    console.log("person data fetched")
    res.status(200).json(personData)
  } catch (error) {
    console.log("error fetching person data !!!", error)
    res.status(500).json({ error: "internal server error !!!" })
  }
})

// POST route to add person
router.post("/", async (req, res) => {

  try {
    const data = req.body //Assuming the request body contains the person data

    // Create a new Person document using the mongoose model
    const newPersonDoc = new Person(data)
    const response = await newPersonDoc.save()
    console.log("data saved success !!!")
    res.status(200).json(response)

  } catch (error) {
    console.log("error saving person data :", error)
    res.status(500).json({ error: "internal server error !!!" })

  }
})

// updating the data using PUT method
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id // get the id from the URL params
    const updatedPersonData = req.body // get the data of the person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, //run the updated document
      runValidators: true // run mongoose validation 
    })

    if (!response) {
      return res.status(404).json({ error: "person not found !!!" })
    }

    console.log("updated the person data !!!")
    res.status(200).json(response)


  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error !!!" })

  }
})

// deleting the person data
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id
    const response = await Person.findByIdAndDelete(personId)
    if (!response) {
      console.log("error getting record by id !!!")
      res.status(404).json({ error: "looking for invalid record !!!" })
    }

    console.log("Record deleted successfully !!!")
    res.status(200).json(response)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error !!!" })
  }
})

 
// Getting details using dynamic URL params
router.get("/:workType", async (req, res) => {
  try {

    const workType = req.params.workType;
    if (workType === "chef" || workType === "waiter" || workType === "manager") {
      const response = await Person.find({ work: workType })
      console.log("fetched data !!!")
      res.status(200).json(response)
    } else {
      console.log("invalid work type")
      res.status(404).json({ error: "Invalid work type !!!" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "internal server error !!!" })
  }
})

module.exports = router