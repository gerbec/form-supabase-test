import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import type { SessionNote } from "../utils/interface";

interface NotesListProps {
  notes: SessionNote[];
  onDelete: (id: string) => Promise<void>;
}

export function NotesList({ notes, onDelete }: NotesListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  // Abrir el dialog de confirmación
  const handleDeleteClick = (id: string) => {
    setNoteToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirmar y ejecutar el delete
  const handleConfirmDelete = async () => {
    if (noteToDelete) {
      await onDelete(noteToDelete);
      setDeleteDialogOpen(false);
      setNoteToDelete(null);
    }
  };

  // Si no hay notas, mostrar mensaje
  if (notes.length === 0) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        sx={{ mt: 4 }}
      >
        There are no notes yet.
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          mt: 3,
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {notes.map((note) => (
          <Card key={note.id} elevation={1}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <Box flex={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {note.client_name}
                    </Typography>
                    <IconButton
                      onClick={() => handleDeleteClick(note.id || "")}
                      color="warning"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        mb: 1,
                        py: 1,
                        textAlign: "left",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {note.notes.substring(0, 100)}
                      {note.notes.length > 100 ? "..." : ""}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {" "}
                        {new Date(note.session_date).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                      <Chip
                        label={`${note.duration} min`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </div>
                  </div>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Note?</DialogTitle>
        <DialogContent>This action cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
