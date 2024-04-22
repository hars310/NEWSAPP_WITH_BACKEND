const dotenv = require('dotenv')
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require("cors");

require('dotenv').config(); // Load environment variables from .env file
app.use(express.json());
app.use(cors());

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

  try {
    const url = `${apiUrl}everything?q=${query}&apiKey=${apiKey}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ message: 'Error searching news' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
