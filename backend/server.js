const dotenv = require('dotenv')
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require("cors");
const path = require('path')

require('dotenv').config(); // Load environment variables from .env file
app.use(express.json());
app.use(cors());

// const __dirname = path.resolve()


const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000
const apiUrl = process.env.NEWS_API_URL;
const apiKey = process.env.NEWS_API_KEY; 

// Set up a route to fetch news articles
app.get('/news', async (req, res) => {
    
    
    try {
    const url = `${apiUrl}top-headlines?country=in&apiKey=${apiKey}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news' });
  }

});



app.post('/search', async (req, res) => {
  const { query } = req.body;
  const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);
const yesterdayDate = currentDate.toISOString().split('T')[0];

  try {
    const url = `${apiUrl}everything?q=${query}&from=${yesterdayDate}&sortBy=publishedAt&apiKey=${apiKey}`;
    // console.log(url)

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ message: 'Error searching news' });
  }
});


app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
