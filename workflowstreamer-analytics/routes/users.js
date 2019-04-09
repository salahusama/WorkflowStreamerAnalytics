const express = require('express')
const router = express.Router()

const defaultChartOptions = [{
	id: 1,
	details : {
		eventName: 'task-interaction',
		eventType: 'created',
		startDate: '2018-10-09T23:00:00.000Z',
		endDate: '2019-04-29T23:00:00.000Z',
	},
}]

router.get('/:userId/options', async (req, res) => {
	const userId = parseInt(req.params.userId)
	try {
		const db = req.app.get('db')
		const result = await db.collection('options').findOne({ userId: parseInt(userId) }, { options: 1, _id: 0 })
		res.json(result ? result.options : defaultChartOptions)
	} catch (error) {
		console.log(error)
		res.status(500)
		res.send({ error })
	}
})

router.put('/:userId/options', async (req, res) => {
	const userId = parseInt(req.params.userId)
	try {
		const db = req.app.get('db')
		const options = await db.collection('options')
		await options.replaceOne(
			{ userId },
			{ userId, options: req.body },
			{ upsert: true }
		)
		const result = await options.findOne({ userId: parseInt(userId) }, { options: 1, _id: 0 })
		res.json(result.options)
	} catch (error) {
		console.log(error)
		res.status(500)
		res.send({ error })
	}
})

module.exports = router
