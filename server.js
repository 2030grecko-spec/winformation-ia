const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// ID de la voz Cora/Elite
const VOICE_ID = "EXAVa6l4nXU"; 

app.get('/', (req, res) => {
  res.send('WINFORMATION IA: Núcleo Operativo Activo.');
});

app.post('/api/camila/hablar', async (req, res) => {
  const { texto } = req.body;
  const API_KEY = process.env.ELEVEN_LABS_KEY;

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text: texto,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.7, similarity_boost: 0.8 }
      },
      {
        headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json' },
        responseType: 'arraybuffer'
      }
    );
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error en el núcleo de voz.");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Búnker activo en puerto ${PORT}`));
