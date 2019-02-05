var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
	try {
		const collection = await req.db.get('events').find({});
		res.json(collection);
	} catch (e) {
		res.render('error', { error: { status: 500, stack: e } });
	}
});

module.exports = router;
