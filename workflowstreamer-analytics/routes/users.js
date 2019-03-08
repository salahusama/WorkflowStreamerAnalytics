const express = require('express')
const router = express.Router()

router.get('/:userId/options', async (req, res) => {
	const userId = parseInt(req.params.userId)
	try {
		const result = await req.db.get('options').findOne({ userId: parseInt(userId) }, { options: 1, _id: 0 })
		res.json(result.options)
	} catch (error) {
		res.status(500)
		res.send({ error })
	}
})

router.put('/:userId/options', async (req, res) => {
	const userId = parseInt(req.params.userId)
	try {
		await req.db.get('options').update({ userId }, {
			userId,
			options: req.body,
		})
		const result = await req.db.get('options').findOne({ userId: parseInt(userId) }, { options: 1, _id: 0 })
		res.json(result.options)
	} catch (error) {
		res.status(500)
		res.send({ error })
	}
})

module.exports = router
