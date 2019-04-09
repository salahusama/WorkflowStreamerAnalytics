const express = require('express')
const router = express.Router()

router.get('/:userId/options', async (req, res) => {
	const userId = parseInt(req.params.userId)
	try {
		const db = req.app.get('db');
		const result = await db.collection('options').findOne({ userId: parseInt(userId) }, { options: 1, _id: 0 });
		res.json(result.options)
	} catch (error) {
		res.status(500)
		res.send({ error })
	}
})

router.put('/:userId/options', async (req, res) => {
	const userId = parseInt(req.params.userId)
	try {
		const db = req.app.get('db');
		const options = await db.collection('options');
		await options.updateOne({ userId }, {
			userId,
			options: req.body,
		})
		const result = await options.findOne({ userId: parseInt(userId) }, { options: 1, _id: 0 })
		res.json(result.options)
	} catch (error) {
		res.status(500)
		res.send({ error })
	}
})

module.exports = router
