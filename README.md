# Doctor Servicios Directory

Este repositorio contiene un MVP para un directorio de proveedores de servicios en Puerto Rico. Es una aplicación estática que no requiere backend y se puede desplegar fácilmente en GitHub Pages o Netlify.

## Características

- **Página de inicio (`index.html`)**: muestra un héroe con búsqueda y tarjetas de categorías de servicios.
- **Listado de proveedores (`providers.html`)**: permite buscar en vivo y filtrar proveedores por categoría y municipio usando [Fuse.js](https://fusejs.io/).
- **Detalle de proveedor (`provider.html`)**: carga la información de un proveedor por su identificador y ofrece un botón para contactarlo por WhatsApp con un mensaje prellenado.
- **Datos en JSON (`data/providers.json`)**: todos los proveedores se almacenan en un archivo JSON estático que el frontend carga mediante fetch.
- **Diseño responsive** con Bootstrap 5, iconos de Font Awesome y animaciones AOS.

## Estructura del proyecto

```
/ (raíz)
├─ index.html              (landing page con héroe y categorías)
├─ providers.html          (listado con búsqueda y filtros)
├─ provider.html           (detalle de proveedor)
├─ assets/
│   ├─ css/styles.css       (estilos personalizados)
│   ├─ js/app.js            (lógica de búsqueda, filtros y carga de detalles)
│   └─ img/                 (imágenes de ejemplo, si se necesitan)
├─ data/providers.json     (datos de proveedores)
└─ README.md               (este archivo)
```

## Edición de datos de proveedores

El archivo `data/providers.json` contiene un arreglo de objetos de proveedores. Cada uno debe respetar el siguiente esquema:

```json
{
  "id": "string-uuid",
  "name": "string",
  "category": "string",
  "municipio": "string",
  "phone": "string",
  "whatsapp": "string",
  "description": "string",
  "services": ["string"],
  "rating": 0,
  "reviewsCount": 0,
  "address": "string",
  "photos": ["string-url"],
  "keywords": ["string"]
}
```

Para añadir o editar un proveedor:

1. Abre `data/providers.json` y localiza el arreglo de proveedores.
2. Añade un nuevo objeto siguiendo el esquema o modifica uno existente. Asegúrate de que `id` sea único.
3. Si incluyes fotos, guárdalas en `assets/img/` y referencia las rutas en el array `photos`.

## Cómo ejecutar localmente

Al no requerir backend, puedes abrir los archivos HTML directamente en el navegador. No obstante, debido a que se usan peticiones `fetch`, se recomienda usar un servidor local. Puedes iniciarlo con:

```sh
npx serve .
```

Este comando abrirá un servidor de archivos estáticos en el directorio actual (por defecto en el puerto 3000). Luego accede a `http://localhost:3000/index.html` desde tu navegador.

## Despliegue en GitHub Pages

1. Haz *commit* y *push* de tus cambios en la rama principal (`main`).
2. Ve a *Settings* en GitHub y luego a la sección **Pages**.
3. Selecciona como fuente la rama `main` y guarda los cambios.
4. GitHub publicará el sitio en `https://<tu-usuario>.github.io/<repositorio>/`.

## Despliegue en Netlify

1. Ingresa a [Netlify](https://www.netlify.com/) y selecciona **New site from Git**.
2. Conecta tu repositorio de GitHub.
3. Deja vacío el campo de comando de compilación y coloca `/` como directorio de publicación.
4. Despliega el sitio.

---

Puedes clonar o bifurcar este proyecto para adaptarlo a tus necesidades. ¡Espero que te sea de ayuda!
