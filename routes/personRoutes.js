const express = require('express');
const router = express.Router();
const Person = require('./../Models/person');

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body;      // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

// GET method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

// GET method to get the person as per work type parameter pass
router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;     // Extract the work type fro the URL parameter
        if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {
            const response = await Person.find({ work: worktype });
            console.log('response fetdhed');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

// Update the data by id
router.put('/:id', async (req, res) => {
    try {
        // Extract the id from the URL parameter
        const personId = req.params.id;
        // Updated data for the person
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,  // Return the updated document
            runValidators: true,   // Run Mongoose Validation
        })
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('Data updated');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        //Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('Data deleted');
        res.status(200).json({ message: 'person Deleted Successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})
module.exports = router;