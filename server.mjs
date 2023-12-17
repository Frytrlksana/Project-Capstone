const express = require('express');
const cors = require('cors');

// Ganti require dengan dynamic import
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/v1/tukang', async (req, res) => {
    try {
        // Ganti penggunaan fetch dengan dynamic import
        const { default: fetch } = await import('node-fetch');

        const response = await fetch('https://capstone-builderco.vercel.app/api/v1/tukang');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
