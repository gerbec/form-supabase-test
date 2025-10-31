# Session Notes

Aplicación web para gestionar notas de sesiones construida con React, TypeScript, Material-UI y Supabase.

## a. Instrucciones de Setup

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Una cuenta de Supabase con un proyecto configurado

### Pasos de instalación

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto `session-notes/` con las siguientes variables:

   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_KEY=tu_clave_publica_de_supabase
   ```

   Puedes encontrar estas credenciales en tu proyecto de Supabase en:

   - Settings → API → Project URL (para `VITE_SUPABASE_URL`)
   - Settings → API → Project API keys → `anon` `public` key (para `VITE_SUPABASE_KEY`)

3. **Configurar la base de datos en Supabase:**

   Ejecuta el siguiente SQL en el SQL Editor de Supabase para crear la tabla necesaria:

   ```sql
   CREATE TABLE session_notes (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     client_name TEXT NOT NULL,
     session_date DATE NOT NULL,
     notes TEXT NOT NULL,
     duration INTEGER NOT NULL CHECK (duration >= 15 AND duration <= 120),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Habilitar Row Level Security (RLS) - opcional según tus necesidades
   ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;

   -- Política para permitir lectura y escritura pública (ajusta según tu caso)
   CREATE POLICY "Allow public read access" ON session_notes FOR SELECT USING (true);
   CREATE POLICY "Allow public insert access" ON session_notes FOR INSERT WITH CHECK (true);
   CREATE POLICY "Allow public delete access" ON session_notes FOR DELETE USING (true);
   ```

4. **Ejecutar la aplicación en modo desarrollo:**

   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## b. URL del Proyecto Supabase

**Nota:** Por favor, actualiza esta sección con la URL real de tu proyecto Supabase.

```
https://[tu-proyecto-id].supabase.co
```

Para obtener tu URL:

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a Settings → API
3. Copia la "Project URL"

## c. Suposiciones Realizadas

1. **Estructura de la tabla `session_notes`:**

   - `id`: UUID generado automáticamente
   - `client_name`: Texto requerido (nombre del cliente)
   - `session_date`: Fecha de la sesión (formato DATE)
   - `notes`: Texto con las notas (máximo 500 caracteres)
   - `duration`: Duración en minutos (entre 15 y 120)
   - `created_at`: Timestamp automático

2. **Validaciones del lado del cliente:**

   - La duración debe estar entre 15 y 120 minutos
   - Las notas tienen un límite de 500 caracteres
   - El nombre del cliente es obligatorio
   - La fecha de sesión es obligatoria

3. **Políticas de acceso:**

   - Se asume que las políticas RLS (Row Level Security) están configuradas para permitir acceso público a lectura, inserción y eliminación. **Importante:** En producción, deberías implementar autenticación y políticas de seguridad apropiadas.

4. **Variables de entorno:**

   - Las credenciales de Supabase se manejan a través de variables de entorno para mantener la seguridad
   - Las variables deben usar el prefijo `VITE_` para ser accesibles en el código del cliente (requisito de Vite)

5. **Interfaz de usuario:**
   - La aplicación usa Material-UI con tema oscuro
   - No se implementó autenticación de usuarios (asumiendo uso directo o demo)

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter ESLint

## Estructura del Proyecto

```
session-notes/
├── src/
│   ├── components/      # Componentes React (NoteForm, NotesList)
│   ├── utils/           # Utilidades (supabase client, hooks, interfaces)
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Punto de entrada
├── public/              # Archivos estáticos
├── package.json         # Dependencias y scripts
└── .env                 # Variables de entorno (no incluido en git)
```
