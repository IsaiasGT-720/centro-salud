# BIOZONE — Centro Médico

Aplicación Angular SPA (sin Server-Side Rendering) para la presentación de un consultorio médico y la gestión local de solicitudes de citas.

## Requisitos
- Node.js 20.19+ o 22.12+
- npm

## Ejecutar
```bash
npm install
npm start
```
Abre `http://localhost:4200`.

## Rutas
- `/` — sitio público y formulario reactivo para solicitar citas.
- `/administracion` — panel para filtrar solicitudes, cambiar su estado y eliminarlas.

## Estructura
```text
src/app/
  core/
    models/             # Tipos del dominio
    services/           # Persistencia y reglas de citas
  features/
    home/               # Landing y formulario público
    admin/              # Panel administrativo
  shared/components/    # Componentes reutilizables (extensión futura)
  app.routes.ts
  app.component.ts
```

## Persistencia provisional
Las solicitudes se guardan en `localStorage` bajo la clave `biozone_appointments_v1`. Esto permite probar el flujo sin backend, pero no es una solución multiusuario: los registros solo existen en el navegador donde se crearon. No se implementó autenticación real; la ruta de administración es una vista de demostración y no debe publicarse como panel privado.

Cuando el cliente valide la propuesta, se recomienda sustituir el almacenamiento del `AppointmentService` por un repositorio HTTP (Angular `HttpClient`) conectado a una API FastAPI, añadir autenticación y autorización en servidor, y validar disponibilidad horaria desde backend.

## Identidad visual
- Fondo: `#E0D7C8`
- Texto: `#000200`
- Acentos: `#6C72AC`, `#496678`, `#CAAF92`, `#92944B`, `#465742`
- Tipografías: Manrope (titulares) y DM Sans (texto)

El logo suministrado está en `src/assets/images/biozone-logo.jpg`. El comentario explícito para sustituirlo por el archivo oficial está junto al elemento `<img>` del encabezado público.
