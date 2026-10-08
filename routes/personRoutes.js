const express = require('express');
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
router.post('/signup', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log('person saved successfully')
        const payload = {
            id: response.id,
            username: response.username,

        }
        const token = generateToken(payload)
        console.log("Token is : ", token);
        res.status(200).json({ response: response, token: token })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Person.findOne({ username: username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'invalid username or password' })
        }

        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        res.json({ token })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log('User Data: ', userData);

        const userId = userData.id;
        const user = await Person.findById(userId);
        return res.status(200).json(user);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });

    }
})
router.get("/", jwtAuthMiddleware, async (req, res) => {
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
