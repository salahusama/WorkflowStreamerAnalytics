const express = require('express');
const router = express.Router();
const { getCleanObj } = require('../utils/objUtils');

router.get('/', async (req, res) => {
	try {
		const db = req.app.get('db');
		const events = await db.collection('events').find({}).toArray();
		res.json(events);
	} catch (e) {
		res.status(500);
		res.send({ error });
	}
});

router.put('/event', async (req, res) => {
	try {
		const db = req.app.get('db');
		const eventsCollection = await db.collection('events');
		await eventsCollection.insertOne(getCleanObj(req.body));
		res.end();
	} catch (error) {
		res.status(500);
		res.send({ error });
	}
});

module.exports = router;
