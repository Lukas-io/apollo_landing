# 7dayslove Landing Page

A modern landing page for the 7 Days Love app with email collection functionality using Supabase.

## Features

- 🎨 Beautiful, responsive design with dark/light theme toggle
- ⏰ Real-time countdown timer to app launch
- 📱 Phone mockup with animated interface
- 📧 Email collection with Supabase database integration
- 🌙 Dark/light theme support
- 📱 Mobile-responsive design

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project dashboard
3. Run the SQL from `database-schema.sql` in your SQL editor to create the `waitlist` table
4. Go to Settings > API to get your project URL and anon key
5. Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Test Supabase Connection

```bash
# Set your environment variables
export VITE_SUPABASE_URL=your_actual_url
export VITE_SUPABASE_ANON_KEY=your_actual_key

# Test the connection
node test-supabase.js
```

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Database Schema

The `waitlist` table stores:
- `id`: Unique identifier (UUID, auto-generated)
- `email`: User's email address (unique)
- `status`: Email status (default: 'pending')
- `created_at`: Timestamp when email was submitted

## Environment Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

## Build for Production

```bash
npm run build
```

## Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Deploy!

## Technologies Used

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Supabase for backend database
- Lucide React for icons
- Vercel for deployment
