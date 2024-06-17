const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require("cors");
require('dotenv').config();
const path = require('path')
const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Initialize GoogleGenerativeAI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_API_KEY);

app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
})


app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        res.json({ text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


