# Spotiapp Mobile — React Native / React
**Creación de Spotiapp Mobile**,
---

## Estructura de carpetas

```
spotiapp/
│
├── App.jsx                          # Punto de entrada
│
└── src/
    ├── constants/
    │   ├── theme.js                 # Tokens: colores, radios, tipografía
    │   └── styles.js                # Estilos reutilizables (como StyleSheet.create)
    │
    ├── data/
    │   ├── mockReleases.js          # Datos simulados → getNewReleases()
    │   ├── mockArtists.js           # Datos simulados → getArtistas()
    │   └── mockTracks.js            # Datos simulados → getTopTracks()
    │
    ├── helpers/
    │   └── formatters.js            # Pipes: formatFollowers, formatDuration, getArtistImage
    │
    ├── components/
    │   ├── common/
    │   │   ├── Icon.jsx             # Librería de íconos SVG
    │   │   ├── Spinner.jsx          # CircularProgressIndicator
    │   │   ├── ArtistImage.jsx      # Imagen con fallback null-safe
    │   │   ├── AlbumCard.jsx        # Tarjeta de álbum (GridView)
    │   │   ├── ArtistCard.jsx       # Tarjeta de artista (ListView)
    │   │   └── TrackItem.jsx        # Fila de canción con botón preview
    │   │
    │   └── layout/
    │       ├── StatusBar.jsx        # Barra de estado del dispositivo
    │       ├── BottomNav.jsx        # Tab Navigator inferior
    │       └── PhoneShell.jsx       # Marco visual del iPhone
    │
    ├── screens/
    │   ├── HomeScreen.jsx           # Grid de nuevos lanzamientos
    │   ├── SearchScreen.jsx         # Búsqueda de artistas con debounce
    │   ├── ArtistScreen.jsx         # Detalle artista + Top 10 + preview
    │   └── AlbumScreen.jsx          # Detalle de álbum
    │
    ├── navigation/
    │   └── AppNavigator.jsx         # Stack navigator (tab + detalle)
    │
    └── styles/
        └── global.css              # Animaciones y resets globales
```

---

