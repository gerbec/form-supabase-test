import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import type { SessionNote } from "./interface";

export function useSessionNotes() {
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);


      const { data, error } = await supabase
        .from("session_notes")
        .select("*")
        .order("session_date", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar notas");
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };
  const createNote = async (note: Omit<SessionNote, "id" | "created_at">) => {
    try {
      if (note.duration < 15 || note.duration > 120) {
        throw new Error("La duración debe estar entre 15 y 120 minutos");
      }
      if (note.notes.length > 500) {
        throw new Error("Las notas no pueden exceder 500 caracteres");
      }
      const { error } = await supabase.from("session_notes").insert([note]);
      if (error) throw error;
      await fetchNotes();
    } catch (err) {
      console.error("Error creating note:", err);
      throw err;
    }
  }

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from("session_notes")
        .delete()
        .eq("id", id);
      if (error) throw error;
      await fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    createNote,
    deleteNote,
  };
}
