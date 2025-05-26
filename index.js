const express = require('express');
const axios = require('axios');
const path = require('path');
const {v4: randomUUID} = require('uuid');

const app = express();
const PORT = 3000;

// Serve static files from 'public' folder
app.use(express.static('public'));

// API route to fetch accessToken
app.get('/getToken', async (req, res) => {
  try {
    const newTimeStemp = new Date().toISOString();
    const clientId = "ANTPL_001";
    const clientSecret = "b56160b6-db82-408a-af76-54fe13b023d8";
    const baseUrl = "https://apis.abdm.gov.in";
    const xCmId = "abdm";

    const response = await axios.post(`${baseUrl}/api/hiecm/gateway/v3/sessions`, {
      clientId: clientId,
      clientSecret: clientSecret,
      grantType: "client_credentials"
    }, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        "x-cm-id": xCmId,
        "TIMESTAMP": newTimeStemp,
        "REQUEST-ID": randomUUID()
      }
    });

    res.json({ accessToken: response.data.accessToken });
  } catch (error) {
    console.error('Error getting token:', error.message);
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
