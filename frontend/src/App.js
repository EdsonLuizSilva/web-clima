/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import React, { useState } from 'react';
import './App.css'

// O componente principal da aplicação React
const App = () => {
  // Estado para armazenar o nome da cidade inserido pelo usuário
  const [city, setCity] = useState('');
  // Estado para armazenar os dados do clima atual
  const [currentWeather, setCurrentWeather] = useState(null);
  // Estado para armazenar os dados da previsão do tempo
  const [forecast, setForecast] = useState(null);
  // Estado para armazenar os dados de coordenadas da cidade
  const [cityCoords, setCityCoords] = useState(null);
  // Estado para controlar o estado de carregamento
  const [loading, setLoading] = useState(false);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState('');

  // URL base do seu backend Node.js
  const BACKEND_BASE_URL = 'http://localhost:3001/api/weather';
  //const BACKEND_BASE_URL = 'https://bookish-goldfish-xxrw4g4vx57c6qp4-3001.app.github.dev/api/weather';

  // Função para buscar o clima atual
  const fetchCurrentWeather = async () => {
    setLoading(true);
    setError('');
    setCurrentWeather(null);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/current?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        setCurrentWeather(data);
      } else {
        setError(data.message || 'Erro ao buscar clima atual.');
      }
    } catch (err) {
      setError('Falha na conexão com o backend ou API OpenWeatherMap.');
      //console.error('Erro ao buscar clima atual:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar a previsão do tempo
  const fetchForecast = async () => {
    setLoading(true);
    setError('');
    setForecast(null);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/forecast?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        setForecast(data);
      } else {
        setError(data.message || 'Erro ao buscar previsão do tempo.');
      }
    } catch (err) {
      setError('Falha na conexão com o backend ou API OpenWeatherMap.');
      console.error('Erro ao buscar previsão do tempo:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar as coordenadas da cidade
  const fetchCityCoords = async () => {
    setLoading(true);
    setError('');
    setCityCoords(null);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/city-coords?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        setCityCoords(data);
      } else {
        setError(data.message || 'Erro ao buscar coordenadas da cidade.');
      }
    } catch (err) {
      setError('Falha na conexão com o backend ou API OpenWeatherMap.');
      //console.error('Erro ao buscar coordenadas da cidade:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="app-container">
        <div className="main-card">
          <h1 className="title">
            Clima App
          </h1>

          <div className="input-group">
            <input
                type="text"
                placeholder="Digite o nome da cidade"
                className="city-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="button-grid">
            <button
                onClick={fetchCurrentWeather}
                disabled={!city || loading}
                className="action-button button-blue"
            >
              Clima Atual
            </button>
            <button
                onClick={fetchForecast}
                disabled={!city || loading}
                className="action-button button-green"
            >
              Previsão
            </button>
            <button
                onClick={fetchCityCoords}
                disabled={!city || loading}
                className="action-button button-purple"
            >
              Coordenadas
            </button>
          </div>

          {loading && (
              <p className="loading-text">Carregando...</p>
          )}

          {error && (
              <div className="error-message" role="alert">
                <strong>Erro!</strong>
                <span> {error}</span>
              </div>
          )}

          {/* Exibição do Clima Atual */}
          {currentWeather && (
              <div className="info-card current-weather-card">
                <h2>Clima Atual em {currentWeather.name}</h2>
                <p>
                  Temperatura: <span>{currentWeather.main.temp}°C</span>
                </p>
                <p>
                  Sensação Térmica: <span>{currentWeather.main.feels_like}°C</span>
                </p>
                <p>
                  Condição: <span style={{ textTransform: 'capitalize' }}>{currentWeather.weather[0].description}</span>
                </p>
                <p>
                  Umidade: <span>{currentWeather.main.humidity}%</span>
                </p>
                <p>
                  Vento: <span>{currentWeather.wind.speed} m/s</span>
                </p>
              </div>
          )}

          {/* Exibição da Previsão do Tempo */}
          {forecast && (
              <div className="info-card forecast-card">
                <h2>Previsão para {forecast.city.name}</h2>
                <div className="forecast-item-container">
                  {forecast.list.slice(0, 5).map((item, index) => ( // Mostra as primeiras 5 previsões
                      <div key={index} className="forecast-item">
                        <p>
                          Data/Hora: {new Date(item.dt * 1000).toLocaleString('pt-BR')}
                        </p>
                        <p>
                          Temperatura: <span>{item.main.temp}°C</span>
                        </p>
                        <p style={{ textTransform: 'capitalize' }}>
                          Condição: <span>{item.weather[0].description}</span>
                        </p>
                      </div>
                  ))}
                  {forecast.list.length > 5 && (
                      <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '14px', marginTop: '8px' }}>Exibindo as primeiras 5 entradas. Role para ver mais.</p>
                  )}
                </div>
              </div>
          )}

          {/* Exibição das Coordenadas da Cidade */}
          {cityCoords && cityCoords.length > 0 && (
              <div className="info-card coords-card">
                <h2>Coordenadas para {cityCoords[0].name}</h2>
                <p>
                  Latitude: <span>{cityCoords[0].lat}</span>
                </p>
                <p>
                  Longitude: <span>{cityCoords[0].lon}</span>
                </p>
                <p>
                  País: <span>{cityCoords[0].country}</span>
                </p>
              </div>
          )}

          {cityCoords && cityCoords.length === 0 && !loading && (
              <div className="warning-message" role="alert">
                <strong>Aviso!</strong>
                <span> Nenhuma coordenada encontrada para esta cidade.</span>
              </div>
          )}
        </div>
      </div>
  );
};

export default App;
