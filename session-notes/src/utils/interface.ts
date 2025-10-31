export interface SessionNote {
  id?: string;
  client_name: string;
  session_date: string;
  notes: string;
  duration: number;
  created_at?: string;
}
