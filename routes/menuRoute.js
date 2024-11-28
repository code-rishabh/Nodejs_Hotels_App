const express = require("express")
const router = express.Router()

const MenuItem = require("../models/menu")

// GET route for menuItem
router.get("/", async (req, res) => {
  try {
    const MenuItemData = await MenuItem.find()
    console.log("fetched menu data")
    res.status(200).json(MenuItemData)


  } catch (error) {
    console.log("error occured while fetching menu data")
    res.status(500).json({ error: "internal server error !!!" })
  }
})

// POST route for adding menu items
router.post("/", async (req, res) => {
  try {
    const newMenuItem = req.body

    const newMenuItemData = new MenuItem(newMenuItem)
    const response = await newMenuItemData.save()
    console.log("new item added to the menu !!!")
    res.status(200).json(response)


  } catch (error) {
    console.log("erorr adding item to the menu")
    res.status(500).json({ error: "internal server error !!!" })

  }
})

// filtering itmes using URL params
router.get("/:taste", async (req, res) => {
  try {
    const data = req.params.taste
    if (data === "sweet" || data === "spicy" || data === "sour") {
      const response = await MenuItem.find({ taste: data })
      console.log(`Fetched data !!!`)
      res.status(200).json(response)
    } else {
      console.log("Invalid Selection")
      res.status(404).json({ error: "data not found with the proposed selection !!!" })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "internal server error !!!" })

  }

})

module.exports = router