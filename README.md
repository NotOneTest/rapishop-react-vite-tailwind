# RapiShop

Plataforma de venta de videojuegos y claves digitales.

## Descripción

RapiShop es una aplicación web full-stack diseñada para la venta y gestión de videojuegos y claves digitales. Permite administrar productos, procesar pedidos, generar facturas y gestionar el inventario de claves de activación de manera eficiente.

## Tecnologías

### Frontend
- **React** (v19) - Librería principal para la interfaz de usuario
- **Vite** (v8) - Herramienta de build y desarrollo
- **Tailwind CSS** (v4) - Framework de estilos
- **React Router DOM** (v7) - Navegación entre páginas
- **jsPDF** (v4) - Generación de documentos PDF

### Backend
- **Express.js** (v5) - Framework para API REST
- **CORS** - Manejo de permisos entre dominios
- **Bcrypt** (v6) - Encriptación de contraseñas

---

## Requisitos Previos

- **Node.js** (v18 o superior)
- **npm** (v9 o superior)

---

## Instalación

### 1. Backend

```bash
cd server
npm install
```

### 2. Frontend

```bash
npm install
```

---

## Ejecución

### Backend

Desde la raíz del proyecto:

```bash
cd server
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

### Frontend

Primero, genera el build de producción:

```bash
npm run build
```

Luego, inicia el servidor de preview:

```bash
npm run preview
```

El frontend estará disponible en `http://localhost:4173`.

> **Nota:** El preview sirve los archivos estáticos del build. Siempre ejecuta `npm run build` antes de `npm run preview` para ver los cambios actualizados.

---

## Estructura del Proyecto

```
rapishop/
├── src/                    # Código fuente del frontend
│   ├── components/         # Componentes reutilizables
│   ├── context/           # Contextos de React (estado global)
│   ├── data/              # Datos estáticos
│   ├── pages/             # Páginas principales
│   ├── services/          # Servicios de API
│   └── utils/             # Utilidades
├── server/                 # Backend
│   ├── index.js           # Punto de entrada del servidor
│   ├── users.json         # Base de datos de usuarios
│   ├── orders.json        # Base de datos de pedidos
│   └── feedback.json      # Base de datos de retroalimentación
├── public/                # Archivos estáticos públicos
├── dist/                  # Build de producción (generado)
└── package.json           # Dependencias del frontend
```

---

## Funcionalidades

### Frontend

- **Autenticación**: Inicio de sesión con usuarios registrados
- **Catálogo de Videojuegos**: Visualizar y explorar videojuegos disponibles
- **Gestión de Claves**: Compra y activación de claves digitales
- **Pedidos**: Procesamiento y seguimiento de compras
- **Facturas PDF**: Generación de facturas en formato PDF
- **Retroalimentación**: Registro y visualización de opiniones de clientes

### Backend

- **API REST**: Endpoints para usuarios, productos, pedidos y feedback
- **Almacenamiento**: Persistencia de datos en archivos JSON
- **Seguridad**: Contraseñas encriptadas con bcrypt
- **Gestión de Inventario**: Control de claves digitales disponibles

---

## Endpoints de la API

| Método | Endpoint           | Descripción              |
|--------|--------------------|--------------------------|
| POST   | /api/auth/login    | Inicio de sesión         |
| GET    | /api/orders        | Listar pedidos           |
| POST   | /api/orders        | Crear nuevo pedido       |
| GET    | /api/feedback      | Listar retroalimentación |
| POST   | /api/feedback      | Crear retroalimentación  |

---

## Desarrollo

Para desarrollo del backend con recarga automática:

```bash
cd server
npm run dev
```

Para desarrollo del frontend con hot-reload:

```bash
npm run dev
```