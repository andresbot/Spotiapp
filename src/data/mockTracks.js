// src/data/mockTracks.js
// Datos simulados de top tracks de un artista.
// En producción, viene de spotify_service -> getTopTracks(artistId).

export const MOCK_TRACKS = [
  { id: "t1",  name: "Tití Me Preguntó",     duration: 237, preview: true,  popularity: 97 },
  { id: "t2",  name: "Me Porto Bonito",       duration: 178, preview: true,  popularity: 95 },
  { id: "t3",  name: "Ojitos Lindos",         duration: 225, preview: false, popularity: 93 },
  { id: "t4",  name: "Después de la Playa",   duration: 204, preview: true,  popularity: 91 },
  { id: "t5",  name: "Un Verano Sin Ti",      duration: 198, preview: true,  popularity: 89 },
  { id: "t6",  name: "Efecto",                duration: 212, preview: false, popularity: 88 },
  { id: "t7",  name: "Moscow Mule",           duration: 249, preview: true,  popularity: 87 },
  { id: "t8",  name: "Neverita",              duration: 186, preview: true,  popularity: 86 },
  { id: "t9",  name: "party",                 duration: 163, preview: false, popularity: 84 },
  { id: "t10", name: "El Apagón",             duration: 611, preview: true,  popularity: 83 },
];
