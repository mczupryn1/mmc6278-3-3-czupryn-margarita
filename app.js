require('dotenv').config()
const express = require('express')
const app = express()

const appInfo = require('./util.js')

app.use(express.static('public'))

app.get('/api/city/:city', async (req, res) => {
    const city = req.params.city
    const cityInfo = await appInfo.getCityInfo(city)
    const jobs = await appInfo.getJobs(city)

    if (cityInfo && jobs) {
        res.status(200).json({ cityInfo, jobs })

    } else if (cityInfo && !jobs) {
        res.status(200).json({ cityInfo: cityInfo, jobs: false })

    } else if (!cityInfo && jobs) {
        res.status(200).json({ jobs: jobs, cityInfo: false })

    } else {
        res.status(404).json({ error: 'Not found' })
    }
})

module.exports = app
