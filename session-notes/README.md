# Session Notes

Web application for managing session notes built with React, TypeScript, Material-UI, and Supabase.

## a. Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- A Supabase account with a configured project

### Installation Steps

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the project root `session-notes/` with the following variables:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_public_key
   ```

   You can find these credentials in your Supabase project at:

   - Settings → API → Project URL (for `VITE_SUPABASE_URL`)
   - Settings → API → Project API keys → `public` key (for `VITE_SUPABASE_KEY`)

3. **Set up the database in Supabase:**

   Run the following SQL in Supabase's SQL Editor to create the required table:

   ```sql
   CREATE TABLE session_notes (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     client_name TEXT NOT NULL,
     session_date DATE NOT NULL,
     notes TEXT NOT NULL,
     duration INTEGER NOT NULL CHECK (duration >= 15 AND duration <= 120),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security (RLS) - optional depending on your needs
   ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;

   -- Policy to allow public read and write access (adjust according to your case)
   CREATE POLICY "Allow public read access" ON session_notes FOR SELECT USING (true);
   CREATE POLICY "Allow public insert access" ON session_notes FOR INSERT WITH CHECK (true);
   CREATE POLICY "Allow public delete access" ON session_notes FOR DELETE USING (true);
   ```

4. **Run the application in development mode:**

   ```bash
   npm run dev
   ```

5. **Open in browser:**
   The application will be available at `http://localhost:5173` (or the port that Vite assigns).

## b. Supabase Project URL

**Note:** Please update this section with your actual Supabase project URL.

```
https://[your-project-id].supabase.co
```

To get your URL:

1. Go to your project in Supabase Dashboard
2. Navigate to Settings → API
3. Copy the "Project URL"

## c. Assumptions Made

1. **`session_notes` table structure:**

   - `id`: Automatically generated UUID
   - `client_name`: Required text (client name)
   - `session_date`: Session date (DATE format)
   - `notes`: Text with notes (maximum 500 characters)
   - `duration`: Duration in minutes (between 15 and 120)
   - `created_at`: Automatic timestamp

2. **Client-side validations:**

   - Duration must be between 15 and 120 minutes
   - Notes have a limit of 500 characters
   - Client name is required
   - Session date is required

3. **Access policies:**

   - It is assumed that RLS (Row Level Security) policies are configured to allow public access for reading, inserting, and deleting. **Important:** In production, you should implement authentication and appropriate security policies.

4. **Environment variables:**

   - Supabase credentials are managed through environment variables to maintain security
   - Variables must use the `VITE_` prefix to be accessible in client code (Vite requirement)

5. **User interface:**
   - The application uses Material-UI with a dark theme
   - User authentication was not implemented (assuming direct use or demo)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run the ESLint linter

## Project Structure

```
session-notes/
├── src/
│   ├── components/      # React components (NoteForm, NotesList)
│   ├── utils/           # Utilities (supabase client, hooks, interfaces)
│   ├── App.tsx          # Main component
│   └── main.tsx         # Entry point
├── public/              # Static files
├── package.json         # Dependencies and scripts
└── .env                 # Environment variables (not included in git)
```
