const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

export const getWeatherForecast = async (city) => {
  /**
 * Função para ir a busca dos valores do tempo.
 * @param city - E-mail do destinatário.
 * @returns retorna os valores do tempo.
 */
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&pt`
  );
  const data = await response.json();
  return data;
};