const express = require('express');
const router = express.Router();
const { getCleanObj } = require('../utils/objUtils');

router.get('/', async (req, res) => {
	try {
		const documents = await req.db.get('events').find({});
		res.json(documents);
	} catch (e) {
		res.status(500);
		res.send({ error });
	}
});

router.get('/meta', async (req, res) => {
	try {
		const documents = await req.db.get('eventData').find({});
		res.json(documents);
	} catch (e) {
		res.status(500);
		res	.send({ error });
	}
});

router.put('/event', async (req, res) => {
	try {
		await req.db.get('events').insert(getCleanObj(req.body));
		res.end();
	} catch (error) {
		res.status(500);
		res.send({ error });
	}
});

module.exports = router;
