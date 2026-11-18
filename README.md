# frontend-prueba

Frontend en Vue 3 + Vite + TypeScript para gestionar **productos** y **categorías**.

## Guía rápida

### 1. Requisitos

- [Node.js](https://nodejs.org/) `^22.18.0` o `>=24.12.0` (comprueba con `node -v`)
- El backend (Laravel) corriendo, para que la API responda

### 2. Instalar dependencias

Desde la carpeta `frontend-prueba`:

```sh
npm install
```

### 3. Configurar la URL de la API (opcional)

Por defecto el frontend llama a `http://localhost/api` (ver `src/services/apiClient.ts`).
Si tu backend corre en otra dirección (por ejemplo `php artisan serve` usa el puerto 8000),
crea un archivo `.env` en esta carpeta:

```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Levantar el servidor de desarrollo

```sh
npm run dev
```

Abre la URL que muestra la terminal (normalmente <http://localhost:5173>).

## Rutas

| Ruta          | Vista      |
| ------------- | ---------- |
| `/products`   | Productos  |
| `/categories` | Categorías |

## Otros comandos

```sh
npm run type-check   # revisa los tipos con vue-tsc
npm run build        # compila para producción (carpeta dist/)
npm run preview      # sirve el build de producción en local
```

## Estructura

```
src/
├── components/   # AlertMessage, DataTable, EntityForm, LoadingState
├── router/       # rutas
├── services/
│   ├── apiClient.ts   # cliente HTTP principal
│   ├── api/           # llamadas a los endpoints
│   ├── repositories/  # capa sobre la API
│   └── hooks/         # lógica reutilizable (useProducts, useCategories)
├── types/        # interfaces TypeScript
└── views/        # ProductsView, CategoriesView
```

## Problemas comunes

- **"No se pudo conectar con la API"**: el backend no está encendido o `VITE_API_URL` apunta a otra dirección. Reinicia `npm run dev` después de cambiar el `.env`.
- **Error de CORS**: revisa la configuración de CORS del backend (`config/cors.php`).
- **Versión de Node no soportada**: actualiza Node a la versión indicada en los requisitos.

## IDE recomendado

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desactiva Vetur).
