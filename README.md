# RapiShop

Sistema de gestión de pedidos y retroalimentación para una tienda de comida rápida.

## Descripción

RapiShop es una aplicación web full-stack diseñada para la gestión eficiente de pedidos en un local de comida rápida. Permite a los empleados manejar pedidos, generar tickets de cocina en formato PDF, y gestionar retroalimentación de clientes de manera sencilla.

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
- **Gestión de Pedidos**: Crear, visualizar y gestionar pedidos de clientes
- **Tickets PDF**: Generación de tickets de cocina en formato PDF con detalles del pedido
- **Retroalimentación**: Registro y visualización de calificaciones y comentarios de clientes

### Backend

- **API REST**: Endpoints para usuarios, pedidos y feedback
- **Almacenamiento**: Persistencia de datos en archivos JSON
- **Seguridad**: Contraseñas encriptadas con bcrypt

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