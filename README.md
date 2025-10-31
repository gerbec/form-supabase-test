# Therapy Session Quick Notes - Coding Challenge

**Time Limit:** 45 minutes  
**AI Usage:** Allowed and encouraged  
**Goal:** Build a simple note-taking app that demonstrates your ability to work with our tech stack

## Tech Stack (Must Use)

- **Frontend:** React + TypeScript + Material-UI
- **Backend:** Supabase (database + one edge function)
- **Bonus:** React Router (if time permits)

## Requirements

> **Note:** Please do what you can in 45 minutes. Do not spend more than 45 minutes on this

### Core Functionality

Build a simple note-taking application where a therapist can:

1. **Create a note with:**

   - a. Client name (text input)
   - b. Session date (date picker)
   - c. Quick notes (textarea, max 500 chars)
   - d. Session duration in minutes (number input)

2. **View all notes in a list/card format showing:**

   - a. Client name
   - b. Session date
   - c. Truncated notes (first 100 chars)
   - d. Duration

3. **Delete a note with a confirmation dialog**

### Technical Requirements

#### Database (Supabase):

- Create a table called `session_notes` with appropriate columns
- Set up Row Level Security (RLS) - you can disable it for this demo or use a simple policy
- Use Supabase client for all database operations

#### Frontend

- Use Material-UI components (Dialog, TextField, Button, Card, etc.)
- Create a custom hook for data fetching (e.g., `useSessionNotes`)
- Implement proper TypeScript types for your data
- Use React hooks (useState, useEffect) appropriately
- Handle loading and error states

#### Backend

- Create **ONE** Supabase edge function called `validate-session-note` that:
  - Takes a note object as input
  - Validates that duration is between 15-120 minutes
  - Returns `{ valid: boolean, error?: string }`
  - Call this before saving new notes

## Evaluation Criteria

We'll look at:

1. **Code organization** - Clear separation of concerns (hooks, API calls, components)
2. **TypeScript usage** - Proper typing, no `any` types
3. **Error handling** - Graceful handling of failures
4. **UI/UX** - Clean, functional interface using MUI
5. **Supabase integration** - Proper use of client and edge functions

## Deliverables

1. GitHub repo with your code
2. Brief README with:
   - a. Setup instructions
   - b. Your Supabase project URL
   - c. Any assumptions you made

## Getting Started

```bash
npm create vite@latest session-notes -- --template react-ts
cd session-notes
npm install @supabase/supabase-js @mui/material @emotion/react @emotion/styled
```

## What We're NOT Looking For

- Perfect styling (functional > beautiful)
- Complex state management (Context/Redux not needed)
- Authentication (assume user is already logged in)
- Edit functionality (create/read/delete is enough)

## Tips

- Use AI to speed up MUI component setup and Supabase boilerplate
- Focus on clean architecture over features
- If running short on time, skip the edge function and just validate client-side
- Comment your code where patterns aren't obvious
