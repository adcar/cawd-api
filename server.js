const osmosis = require('osmosis')
const express = require('express')
const app = express()

// CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.get('/', (req, res) => {
	res.send(
		'Please specify a week number. E.g., http://cawd-api.herokuapp.com/25'
	)
})

app.get('/:week', async (req, res) => {
	let results = []
	osmosis
		.get(
			`http://www.cawdvt.org/assignments/second-year-archive/week-${
				req.params.week
			}-what-is-due/`
		)
		.find('.entry-content ul li')
		.set('item')
		.data(data => results.push(data.item))
		.done(() => {
			console.log(results)
			res.json(results)
		})
})
let port = process.env.PORT || 3000
app.listen(port, () => console.log(`CAWD API listening on port ${port} <3`))
