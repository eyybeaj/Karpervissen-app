export async function handler(event) {
  try {
    const lat = event.queryStringParameters?.lat || '52.6478';
    const lon = event.queryStringParameters?.lon || '5.0603';
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,winddirection_10m,surface_pressure,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,winddirection_10m_dominant,precipitation_sum&hourly=surface_pressure&wind_speed_unit=kmh&timezone=Europe%2FAmsterdam&forecast_days=7`;

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
}
