import type { Handler } from '@netlify/functions'

export const handler: Handler = async (event) => {
  const { lat = '48.8566', lon = '2.3522' } = event.queryStringParameters || {}
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation&current_weather=true`
  const r = await fetch(url)
  const data = await r.json()
  return { statusCode: 200, body: JSON.stringify(data) }
}
