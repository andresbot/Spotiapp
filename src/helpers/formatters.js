// src/helpers/formatters.js
// Funciones utilitarias (equivalentes a Pipes en Angular).

/**
 * Formatea un número de seguidores en formato legible.
 * Ej: 46200000 -> "46.2M"
 */
export const formatFollowers = (n) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
};

/**
 * Formatea segundos en formato mm:ss.
 * Ej: 237 -> "3:57"
 */
export const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

/**
 * Null-safety para imagen de artista (Fase 3 del taller).
 * Devuelve la URL si existe, o la imagen por defecto.
 * En React Native usarías: require('../../assets/img/noimage.png')
 */
export const getArtistImage = (imageUrl, fallback = null) => {
  return imageUrl && imageUrl.trim() !== "" ? imageUrl : fallback;
};

/**
 * Devuelve el saludo según la hora del día.
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
};
