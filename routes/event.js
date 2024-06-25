const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

// Add an event
router.post('/add', async (req, res) => {
    const {
        icon, time, eventId, title, rating, images, coupleFee, stagFee, eventTitle,
        eventSubtitle, specialOffer, capacity, parking, location, iframeLink
    } = req.body;

    try {
        const newEvent = new Event({
            icon, time, eventId, title, rating, images, coupleFee, stagFee, eventTitle,
            eventSubtitle, specialOffer, capacity, parking, location, iframeLink
        });

        await newEvent.save();
        res.json(newEvent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Get all events
router.post('/data', async (req, res) => {
    try {
        const events = await Event.insertMany([{
            "icon": "",
            "time": "Open until 1:30 am",
            "eventId": 1,
            "title": "DABO",
            "rating": 4.2,
            "images": [
                { "src": "./../../assets/background-Image.jpg", "alt": "Event 1" },
                { "src": "./../../assets/background-Image-2.jpg", "alt": "Event 2" },
                { "src": "./../../assets/background-Image.jpg", "alt": "Event 3" }
            ],
            "coupleFee": "$50 per couple",
            "stagFee": "$30 per person",
            "eventTitle": "Bollywood Night",
            "eventSubtitle": "Performing Artist - Nucleya",
            "specialOffer": "2+1 on IFML drinks",
            "capacity": "200 pax capacity",
            "parking": "Dedicated parking Space",
            "location": "6, New Manish Nagar, Somalwada, Nagpur 440025",
            "iframeLink": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119065.02905830946!2d78.9901080712679!3d21.161065901903683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717750853373!5m2!1sen!2sin"
        }
            , {
            "icon": "",
            "time": "Open until 1:30 am",
            "eventId": 2,
            "title": "DABO",
            "rating": 4.2,
            "images": [
                { "src": "./../../assets/background-Image.jpg", "alt": "Event 1" },
                { "src": "./../../assets/background-Image-2.jpg", "alt": "Event 2" },
                { "src": "./../../assets/background-Image.jpg", "alt": "Event 3" }
            ],
            "coupleFee": "$50 per couple",
            "stagFee": "$30 per person",
            "eventTitle": "Bollywood Night",
            "eventSubtitle": "Performing Artist - Nucleya",
            "specialOffer": "2+1 on IFML drinks",
            "capacity": "200 pax capacity",
            "parking": "Dedicated parking Space",
            "location": "6, New Manish Nagar, Somalwada, Nagpur 440025",
            "iframeLink": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119065.02905830946!2d78.9901080712679!3d21.161065901903683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717750853373!5m2!1sen!2sin"
        }
        ]);
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get specific details of all events
router.get('/details', async (req, res) => {
    try {
        const allEventDetails = await Event.find({}, 'eventId title location icon time');
        res.json(allEventDetails);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// Get details of specific event
router.get('/details/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
        let event = await Event.findOne({ eventId });
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// update details of specific event
router.put('/details/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const updates = req.body;
    try {
        // Fetch the existing event
        const event = await Event.findOne({ eventId });

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Update fields
        Object.keys(updates).forEach((key) => {
            if (key === 'images' && Array.isArray(updates[key])) {
                event.images = updates[key].map(image => ({
                    src: image.src,
                    alt: image.alt
                }));
            } else {
                event[key] = updates[key];
            }
        });

        await event.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/details', async (req, res) => {
    const { eventId, title, location, icon, closingTime } = req.body;

    try {

        const newEvent = new Event({
            eventId,
            title,
            location,
            icon,
            closingTime,
        });

        await newEvent.save();
        res.json(newEvent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;
