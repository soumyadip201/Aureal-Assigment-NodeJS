const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");

// GET all animals
router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new animal
router.post("/", async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    species: req.body.species,
    age: req.body.age,
  });
  try {
    const newAnimal = await animal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update an existing animal
router.put("/:id", async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });

    animal.name = req.body.name || animal.name;
    animal.species = req.body.species || animal.species;
    animal.age = req.body.age || animal.age;

    const updatedAnimal = await animal.save();
    res.json(updatedAnimal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an animal
router.delete("/:id", async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });

    await animal.remove();
    res.json({ message: "Animal deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
