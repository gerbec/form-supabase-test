import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSessionNotes } from "./utils/useSessionNotes";
import { NoteForm } from "./components/NoteForm";
import { NotesList } from "./components/NotesList";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const { notes, loading, error, createNote, deleteNote } = useSessionNotes();
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          minWidth: "1024px",
          border: "1px solid #ccc",
          borderRadius: "1rem",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          gap={2}
        >
          <Typography variant="h4" component="h1">
            Session Notes
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setFormOpen(true)}
          >
            New Note
          </Button>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <NotesList notes={notes} onDelete={deleteNote} />
        <NoteForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={createNote}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
