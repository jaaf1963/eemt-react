import React from "react";
import miGif from "../assets/fish-21934.gif"; // Ajusta la ruta

const PortadaGif: React.FC = () => {
  return (
    <div style={{ width: "50%" }}>
      <img
        src={miGif}
        style={{
          position: "absolute",
          top: "55%",
          left: "52%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          WebkitMaskImage:
            "radial-gradient(circle, black 1%, transparent 100%)",
          maskImage: "radial-gradient(circle, black 1%, transparent 100%)",
        }}
        alt="GIF animado"
      />
    </div>
  );
};

export default PortadaGif;
