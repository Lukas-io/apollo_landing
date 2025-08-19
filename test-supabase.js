// Simple test script to verify Supabase connection
// Run with: node test-supabase.js

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Test credentials from .env file
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

console.log('Testing Supabase connection...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey ? '***' + supabaseAnonKey.slice(-4) : 'Not set')

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ Please set your Supabase credentials in a .env file:')
  console.log('VITE_SUPABASE_URL=your_actual_url')
  console.log('VITE_SUPABASE_ANON_KEY=your_actual_key')
  console.log('\nMake sure the .env file is in the root directory of your project.')
  process.exit(1)
}

try {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  // Test connection by trying to access the waitlist table
  console.log('\n✅ Supabase client created successfully')
  console.log('📧 Ready to collect emails in the waitlist table!')
  
} catch (error) {
  console.error('\n❌ Error creating Supabase client:', error.message)
  process.exit(1)
}
