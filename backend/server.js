// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Chave da API OpenWeatherMap
const OPENWEATHER_API_KEY = '257969c9892aa632e28d8f180024e93e';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Configura o CORS para permitir requisições do frontend React
app.use(cors());
app.use(express.json());

// Endpoint 1: Obter o clima atual por nome da cidade
app.get('/api/weather/current', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'Parâmetro "city" é obrigatório.' });
    }

    try {
        const response = await fetch(`${OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`);
        const data = await response.json();

        if (response.ok) {
            res.json(data);
        } else {
            res.status(response.status).json(data);
        }
    } catch (error) {
        //console.error('Erro ao buscar clima atual:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar clima atual.' });
    }
});

// Endpoint 2: Obter a previsão do tempo (5 dias / 3 horas) por nome da cidade
app.get('/api/weather/forecast', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'Parâmetro "city" é obrigatório.' });
    }

    try {
        const response = await fetch(`${OPENWEATHER_BASE_URL}/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`);
        const data = await response.json();

        if (response.ok) {
            res.json(data);
        } else {
            res.status(response.status).json(data);
        }
    } catch (error) {
        //console.error('Erro ao buscar previsão do tempo:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar previsão do tempo.' });
    }
});

// Endpoint 3: Obter coordenadas da cidade por nome da cidade (usando a API de geocodificação)
app.get('/api/weather/city-coords', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'Parâmetro "city" é obrigatório.' });
    }

    try {
        // A API de geocodificação é diferente da API de clima principal
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`);
        const data = await response.json();

        if (response.ok) {
            res.json(data);
        } else {
            res.status(response.status).json(data);
        }
    } catch (error) {
        //console.error('Erro ao buscar coordenadas da cidade:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar coordenadas da cidade.' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Backend rodando em http://localhost:${port}`);
});


