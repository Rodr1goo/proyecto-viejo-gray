# El Viejo Gray - Sistema de Gestión Interna (BackOffice)

Este repositorio contiene el código fuente del panel de administración (Single Page Application) para "El Viejo Gray", una imprenta universitaria especializada en medicina. El proyecto está construido con **React (Vite), Tailwind CSS y Supabase**.

## 🚀 Estado Actual del Proyecto (Entrega Final)

El proyecto ha completado todas las fases de desarrollo y cuenta con un backend funcional en tiempo real, enrutamiento moderno y patrones de diseño escalables.

### 1. Sistema de Seguridad y Acceso (Easter Egg) 🔐
La ruta principal (`/`) muestra la **Landing Page** pública. Para mantener la interfaz limpia de botones administrativos obvios durante las demostraciones, se ha implementado un acceso secreto:
- **Cómo ingresar:** Hacer **Doble Clic en el logo "VG"** (esquina superior izquierda de la Landing Page).
- **Credenciales de prueba:** 
  - Correo: `admin@elviejogray.com`
  - Contraseña: `admin123`
- *Nota Técnica:* La seguridad se maneja mediante un patrón de "Higher Order Component" (`<ProtectedRoute />`) que intercepta la navegación hacia `/admin`.

### 2. Backend y Transacciones (Supabase) ☁️
La aplicación está 100% conectada a una base de datos relacional PostgreSQL hosteada en Supabase.
- **Consultas Paralelas:** El `Dashboard` utiliza `Promise.all` para resolver múltiples consultas asíncronas simultáneamente, reduciendo los tiempos de carga a la mitad.
- **Transacciones Maestro-Detalle:** Al crear un "Nuevo Pedido", el sistema ejecuta una lógica transaccional multicapa que inserta datos en la tabla `clientes`, `pedidos` y múltiples filas en `detalles_pedido` (carrito de compras) asegurando la integridad referencial.

### 3. Sistema de Ruteo Moderno (Data Router) 🛣️
Se ha refactorizado la aplicación para utilizar la API de Enrutamiento de Datos (Data Router v6.4+) de React Router (`createBrowserRouter`). 
- Uso de **Rutas Anidadas (Nested Routes)** mediante un `<AdminLayout />` y el componente `<Outlet />`.
- Estructura escalable y permeable a futuros cambios o agregados de *loaders* y *actions*.

### 4. Funcionalidades Destacadas (Features) ✨
*   **Tablero Kanban Nativo:** Gestión visual de los estados de pedidos con Drag & Drop nativo de HTML5. Las actualizaciones se reflejan en tiempo real en Supabase mediante *Optimistic UI Updates*.
*   **Cálculo de Métricas:** Paneles matemáticos en tiempo real para "Ventas del Día" e "Insumos Críticos".
*   **Diseño Expandible:** Tarjetas Kanban con efecto acordeón para revelar el detalle completo del carrito de compras de cada cliente.

### 5. Arquitectura Escalar 🏗️
El proyecto sigue el estándar de oro en estructura React:
- `/components/ui/` (Botones, Inputs, Badges genéricos).
- `/components/features/` (Kanban, Tablas, Filas interactivas).
- `/components/layout/` (Sidebar, Navbar, ProtectedRoute).
- `/pages/` (Vistas completas).
- `/lib/` (Instancia cliente de Supabase).

## 🛠️ Tecnologías Utilizadas
*   **Core:** React 19 + Vite
*   **Estilos:** Tailwind CSS v4
*   **Enrutamiento:** React Router DOM (Data Router API)
*   **Backend & DB:** Supabase (PostgreSQL + API REST automatizada)
*   **Iconografía:** Lucide React

## 📦 Instalación y Ejecución Local

1. Clonar el repositorio.
2. Crear un archivo `.env.local` en la raíz del proyecto basándose en las credenciales proporcionadas.
    ```env
    VITE_SUPABASE_URL=tu_url_de_supabase
    VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
    ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Levantar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abrir en el navegador (usualmente `http://localhost:5173/`).
