# El Viejo Gray - Sistema de Gestión Interna (BackOffice)

Este repositorio contiene el código fuente del panel de administración (Single Page Application) para "El Viejo Gray", una imprenta universitaria especializada en medicina. El proyecto está construido con **React (Vite) y Tailwind CSS**.

## 🚀 Estado Actual del Proyecto (3ra Entrega)

Hasta este punto, el desarrollo se ha centrado en la **Consolidación de la Arquitectura de Componentes** y en el **Sistema de Ruteo**, cumpliendo estrictamente con los diseños visuales (prototipos) y el diagrama arquitectónico (estilo Excalidraw) planteados en la fase de diseño.

### 1. Arquitectura de Componentes (Modularidad)
Se ha implementado una arquitectura fuertemente escalable dividida en tres niveles dentro de `src/`:

*   **`/components/ui/` (Componentes Globales y Atómicos):**
    *   Elementos altamente reutilizables como `ActionButton`, `InputField`, `StatusBadge` (con renderizado condicional de colores según estado), `StatCard` y el ecosistema de tablas (`DataTable`, `DataRow`, `Pagination`).
*   **`/components/layout/` (Contenedores Maestros):**
    *   Contiene `SidebarComponent` (navegación lateral responsiva) y `HeaderComponent` (barra superior con `Avatar`), los cuales se mantienen fijos gracias al enrutador.
*   **`/components/features/` (Características de Dominio):**
    *   Componentes específicos de cada vista que orquestan los componentes UI. Ejemplos: `PedidosTablero`, `StockTable`, `PriceListSection`.

### 2. Sistema de Ruteo (React Router DOM)
La aplicación funciona como una auténtica SPA sin recargas de página.

*   **Rutas Estáticas:** Mapeo de las vistas principales:
    *   `/` -> Dashboard (Resumen de métricas).
    *   `/orders` -> Gestión de Pedidos (Tablero Kanban).
    *   `/inventory` -> Control de Stock (Tabla de insumos y alertas).
    *   `/prices` -> Lista de Precios (Tablas por categoría).
*   **Rutas Dinámicas (URL Params):** Implementación de rutas con parámetros para preparar el terreno del ABM (Alta, Baja, Modificación).
    *   `/inventory/new` y `/prices/new` para creación.
    *   `/inventory/edit/:id` y `/prices/edit/:id` para edición. 
    *   Actualmente, la navegación a estas rutas (a través de los botones de "Agregar", "Nuevo" o los iconos de lápiz) redirige exitosamente a la vista `FormularioAbmPage` que captura el parámetro `:id`.

### 3. Maquetación y Diseño Visual
*   Implementación de Tailwind CSS con una paleta clínica/técnica (blancos, grises `slate` y acentos en verde azulado `brand-teal`).
*   Configuración en `index.css` de variables `@theme` (estándar Tailwind v4) y un *scrollbar* personalizado para una estética más limpia.
*   Uso de `lucide-react` para toda la iconografía del sistema.

### 4. Preparación para Backend (Supabase)
Aunque la conexión en vivo aún no está implementada en las vistas, se ha dejado preparado:
*   El archivo `src/lib/supabase.js` para la inicialización del cliente.
*   El script SQL completo (`supabase_schema.sql` guardado externamente) que contiene el esquema relacional de tablas, tipos de encuadernación y triggers de actualización automática (`updated_at`).

## 🛠️ Tecnologías Utilizadas
*   React 18 + Vite
*   Tailwind CSS v4
*   React Router DOM v6
*   Lucide React (Iconos)

## 📦 Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Levantar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador (usualmente `http://localhost:5173/`).
