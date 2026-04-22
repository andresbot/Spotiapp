# Spotiapp Mobile - Expo + React Native

## Analisis del estado inicial

El proyecto estaba modelado como app movil, pero implementado con tecnologias web:

- Uso de `div`, `button`, `img`, `input` y `global.css`.
- Dependencia de propiedades del DOM como `scrollTop`.
- Acoplamiento directo de pantallas con datos mock (sin capa de dominio).
- Estructura por tipo tecnico (`components`, `screens`, `data`) en lugar de estructura por feature.

Eso hacia dificil ejecutar de forma nativa en Expo y escalar el codigo por modulos.

## Arquitectura aplicada

Se implemento arquitectura por features y capas:

- `data`: repositorios/fuentes de datos.
- `domain`: casos de uso.
- `presentation`: pantallas y componentes UI.

Y una capa compartida (`shared`) para tokens de tema, componentes reutilizables y utilidades.

## Estructura actual

```
spotiapp/
├── App.jsx
├── app.json
├── babel.config.js
├── package.json
└── src/
    ├── application/
     │   ├── AppShell.jsx
     │   └── AppNavigator.jsx
     ├── features/
     │   ├── home/
     │   │   ├── data/homeRepository.js
     │   │   ├── domain/getNewReleases.js
     │   │   └── presentation/
     │   │       ├── HomeScreen.jsx
     │   │       └── components/AlbumCard.jsx
     │   ├── search/
     │   │   ├── data/searchRepository.js
     │   │   ├── domain/searchArtists.js
     │   │   └── presentation/
     │   │       ├── SearchScreen.jsx
     │   │       └── components/ArtistCard.jsx
     │   ├── artist/
     │   │   ├── data/artistRepository.js
     │   │   ├── domain/getTopTracks.js
     │   │   └── presentation/
     │   │       ├── ArtistScreen.jsx
     │   │       └── components/TrackItem.jsx
     │   └── album/
     │       └── presentation/AlbumScreen.jsx
     └── shared/
          ├── data/mocks/
          ├── domain/formatters.js
          ├── presentation/components/
          └── theme/tokens.js
```

## Cambios clave realizados

- Migracion completa de UI a `react-native` (sin CSS global ni elementos DOM).
- Integracion de Expo con configuracion base (`app.json`, `babel.config.js`, scripts npm).
- Reemplazo de iconos SVG web por `@expo/vector-icons`.
- Navegacion interna simplificada en `AppNavigator` con estado local (home/search/detail).
- Capa de repositorios y casos de uso por feature para separar responsabilidades.

## Como ejecutar

1. Instalar dependencias:

    ```bash
    npm install
    ```

2. Ejecutar Expo:

    ```bash
    npm run start
    ```

3. Opcional por plataforma:

    ```bash
    npm run web
    npm run android
    npm run ios
    ```

4. Levantar backend local:

    ```bash
    cd backend
    npm install
    npm start
    ```

## Exportar a APK (Android)

Este proyecto usa un backend externo (en `backend/`) para consultar releases/artistas/tracks. El APK no "incluye" ese backend: debes tenerlo corriendo en una IP/dominio accesible desde el telefono.

- Configura `EXPO_PUBLIC_API_URL` con la URL del backend, por ejemplo `https://tu-dominio/api` o `http://TU_IP_LAN:3000/api`.
- Para compilar un APK con EAS:

  ```bash
  npm install -g eas-cli
  eas login
  eas build -p android --profile preview
  ```

Notas:

- Si el backend es `http://...`, Android requiere permitir trafico sin HTTPS. Ya esta activado en `app.json` con `android.usesCleartextTraffic: true`.
- Para distribucion fuera de tu red (cualquier lugar), usa un backend publicado (idealmente `https://...`).

## Compatibilidad sin Premium

Spotify cambio sus reglas para apps en Development Mode y ahora exige que el owner del app tenga Premium para que las llamadas funcionen.
Para mantener la app operativa y cumplir el flujo del taller (lanzamientos, busqueda de artistas, top tracks y preview de 30 segundos), el backend expone la misma interfaz `/api/...` pero consume endpoints publicos de Deezer.

La arquitectura mobile no cambia:

- Home: lista lanzamientos recientes.
- Search: busca artistas en tiempo real.
- Artist detail: muestra top 10 canciones.
- Preview: reproduce muestras de 30 segundos cuando el proveedor las entrega.

## Nota sobre codigo anterior

Las carpetas antiguas (`src/components`, `src/screens`, `src/navigation`, etc.) pueden mantenerse como referencia temporal.
La aplicacion actual usa la nueva arquitectura bajo `src/application`, `src/features` y `src/shared`.

