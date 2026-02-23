# GifsApp 🎬

Aplicación web para buscar y explorar GIFs animados, construida con Angular 21 y Tailwind CSS, consumiendo la API de Giphy.


## 🚀 Tecnologías
- Angular 21
- Tailwind CSS
- Giphy API
- Font Awesome

## ⚙️ Instalación
1. Clonar el repositorio
```bash
   git clone https://github.com/RaulSanchez119/gifs-app-angular.git
```
2. Instalar dependencias
```bash
   npm install
```
3. Iniciar el servidor
```bash
   ng serve
```
4. Abrir `http://localhost:4200/`

## 🔑 Variables de entorno
Crea un archivo `src/environments/environment.ts` con tu API key de Giphy:
```ts
export const environment = {
  apiKey: 'TU_API_KEY_AQUI'
};
```

## 📁 Estructura del proyecto
```
src/
├── app/
│   ├── gifs/
│   │   ├── components/      # gif-list, side-menu
│   │   ├── interfaces/
│   │   ├── mapper/
│   │   ├── pages/           # dashboard, gif-history, search, trending
│   │   └── services/
│   ├── shared/
│   └── auth/
├── environments/
└── styles.css
```

## 👤 Autor
Raul Sanchez — [@RaulSanchez119](https://github.com/RaulSanchez119)
