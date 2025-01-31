import { NextResponse } from 'next/server';
import { getWeatherForecast } from '@/wfu/app/lib/weather';
import { sendEmail } from '@/wfu/app/lib/email';

interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}

interface WeatherForecast {
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

export async function POST(): Promise<NextResponse> {
  try {
    // Verifica a previsão do tempo para Loures
    const weather: WeatherForecast = await getWeatherForecast('LOURES,PT');
    console.table(weather.weather);

    const willRain = weather.weather.some((condition) => condition.main === 'Rain');

    // Gerar a mensagem de alerta baseada nas informações meteorológicas
    const weatherMessage = `
      **Previsão do Tempo para Loures:**
      - **Condição Climática**: ${weather.weather[0].description} (${weather.weather[0].main})
      - **Temperatura**: ${weather.main.temp.toFixed(2)}°C (Sensação térmica: ${weather.main.feels_like.toFixed(2)}°C)
      - **Temperatura mínima**: ${weather.main.temp_min.toFixed(2)}°C
      - **Temperatura máxima**: ${weather.main.temp_max.toFixed(2)}°C
      - **Precipitação nas últimas 1 hora**: ${weather.rain ? weather.rain['1h'] : '0'} mm
      - **Pôr do Sol**: ${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
      **Status**: ${willRain ? 'Vai chover em Loures nos próximos dias. Não se esqueça do guarda-chuva!' : 'Não há previsão de chuva para Loures.'}
    `;

    await sendEmail(
        "ediigmelchiior@gmail.com", // Aqui, você pode alterar para enviar para os emails dos usuários cadastrados
        "Alerta de Chuva em Loures",
        weatherMessage
    );

    // Se houver previsão de chuva, enviar e-mail
    if (willRain) {
      // Enviar e-mail para o usuário
      await sendEmail(
        "ediigmelchiior@gmail.com", // Aqui, você pode alterar para enviar para os emails dos usuários cadastrados
        "Alerta de Chuva em Loures",
        weatherMessage
      );
      return NextResponse.json({ message: 'E-mails enviados com sucesso!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Não há previsão de chuva para Loures.' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao enviar e-mails.' }, { status: 500 });
  }
}
