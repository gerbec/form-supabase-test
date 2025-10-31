import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import type { SessionNote } from "../utils/interface";

interface NoteFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (note: SessionNote) => Promise<void>;
}

export function NoteForm({ open, onClose, onSubmit }: NoteFormProps) {
  const [clientName, setClientName] = useState("");
  const [sessionDate, setSessionDate] = useState<Dayjs | null>(dayjs());
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState<number>(60);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!clientName.trim()) {
      setError("Name is required");
      return;
    }
    if (notes.length > 500) {
      setError("500 chars max allowed for notes");
      return;
    }

    try {
      setSubmitting(true);

      await onSubmit({
        client_name: clientName,
        session_date: sessionDate ? sessionDate.format("YYYY-MM-DD") : "",
        notes,
        duration,
      });

      setClientName("");
      setNotes("");
      setDuration(60);
      setSessionDate(dayjs());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error on saving");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nueva Nota de Sesión</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          label="Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          margin="normal"
          autoFocus
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Sesion date"
            value={sessionDate}
            onChange={setSessionDate}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
              },
            }}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          label="Quick Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={4}
          margin="normal"
          helperText={`${notes.length}/500 chars`}
          inputProps={{ maxLength: 500 }}
        />
        <TextField
          fullWidth
          label="Duration (minutes)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          margin="normal"
          inputProps={{ min: 15, max: 120 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting}
        >
          {submitting ? "..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
