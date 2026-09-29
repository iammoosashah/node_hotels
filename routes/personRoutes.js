const express = require('express');
const router = express.Router();
const Person = require("./../models/Person");
router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log('person saved successfully')
        res.status(200).json(response)

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})
router.get("/", async (req, res) => {
    try {
        const response = await Person.find();
        console.log('person fetched successfully')
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'teacher' || workType == 'student' || workType == 'labourer') {
            const response = await Person.find({ work: workType });
            res.status(200).json(response);

        }
        else {
            res.status(404).json({ error: "invalid work type" })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})
router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        })
        if (!response) {
            return res.status(404).json({ error: "no such id found" })

        }
        console.log("updated")
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "person not found" })
        }
        console.log("deletes")
        res.status(200).json({ message: "person deleted successfully" })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });

    }
})
module.exports = router;
