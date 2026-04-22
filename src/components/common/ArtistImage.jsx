// src/components/common/ArtistImage.jsx
// Imagen de artista con fallback si la URL es nula o falla.
// Implementa la validación de Fase 3 (Pipes Adaptados / Null Safety).

import { useState } from "react";
import Icon from "./Icon";
import { Colors } from "../../constants/theme";

/**
 * @param {{ src: string|null, size?: number, style?: object }} props
 */
export default function ArtistImage({ src, size = 80, style = {} }) {
  const [hasError, setHasError] = useState(false);

  const showFallback = hasError || !src;

  if (showFallback) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: Colors.card,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          ...style,
        }}
      >
        {/* En RN: <Image source={require('../../assets/img/noimage.png')} /> */}
        <Icon name="user" size={size * 0.4} color={Colors.muted} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setHasError(true)}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
