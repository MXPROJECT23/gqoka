import type { Handler } from '@netlify/functions'

const supabaseUrl = process.env.VITE_SUPABASE_URL!
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!

export const handler: Handler = async (event) => {
  const q = (event.queryStringParameters?.q || '').trim()
  if (!q) return { statusCode: 200, body: JSON.stringify([]) }
  const url = `${supabaseUrl}/rest/v1/brands?name=ilike.*${encodeURIComponent(q)}*&select=name&id=not.is.null&order=name.asc&limit=10`
  const r = await fetch(url, { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } })
  const data = await r.json()
  return { statusCode: 200, body: JSON.stringify(data) }
}
