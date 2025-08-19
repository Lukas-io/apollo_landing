// Debug script to check environment variables
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

console.log('=== Environment Variables Debug ===')
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL)
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? '***' + process.env.VITE_SUPABASE_ANON_KEY.slice(-4) : 'Not set')

// Check for any hidden characters
if (process.env.VITE_SUPABASE_URL) {
  console.log('\n=== URL Analysis ===')
  console.log('URL length:', process.env.VITE_SUPABASE_URL.length)
  console.log('URL characters:', Array.from(process.env.VITE_SUPABASE_URL).map(c => c.charCodeAt(0)))
  console.log('URL ends with .co:', process.env.VITE_SUPABASE_URL.endsWith('.co'))
  console.log('URL ends with .com:', process.env.VITE_SUPABASE_URL.endsWith('.com'))
}
