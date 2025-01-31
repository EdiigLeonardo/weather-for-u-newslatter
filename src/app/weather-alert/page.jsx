"use client";

import { useState } from 'react';

export default function WeatherAlert() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const checkWeatherAndSendEmails = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/weather-alert', { method: 'POST' });
      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      setMessage('Erro ao verificar o tempo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={checkWeatherAndSendEmails} disabled={loading}>
        {loading ? 'Verificando...' : 'Verificar Previsão e Enviar Alertas'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
