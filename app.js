require('dotenv').config();
const express = require('express');
const app = express();
const { getCityInfo, getJobs } = require('./util.js');

// Statically serve the public folder
app.use(express.static('public'));

// Declare the GET route /api/city/:city
app.get('/api/city/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const cityInfo = await getCityInfo(city);
    const jobs = await getJobs(city);

    if (!cityInfo || !jobs) {
      return res.status(404).json({ error: 'No city info or jobs found' });
    }

    return res.json({ cityInfo, jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = app;
