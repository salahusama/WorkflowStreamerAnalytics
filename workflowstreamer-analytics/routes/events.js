const express = require('express');
const router = express.Router();
const { getCleanObj } = require('../utils/objUtils');

router.get('/', async (req, res) => {
	try {
		const collection = await req.db.get('events').find({});
		res.json(collection);
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
		res	.send({ error });
	}
});

module.exports = router;
