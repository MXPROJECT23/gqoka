import type { Handler } from '@netlify/functions'
import crypto from 'crypto'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
  const body = JSON.parse(event.body || '{}')
  const { itemId, userId } = body
  if (!itemId || !userId) return { statusCode: 400, body: 'Missing params' }
  const cert_hash = crypto.createHash('sha256').update(`${itemId}:${userId}:${Date.now()}`).digest('hex')
  const cert_at = new Date().toISOString()
  return { statusCode: 200, body: JSON.stringify({ cert_hash, cert_at }) }
}
