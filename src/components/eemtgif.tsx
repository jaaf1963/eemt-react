import React from "react";
import miGif from "../assets/line-globe.gif"; // Ajusta la ruta

const EemtGif: React.FC = () => {
  return (
    <div style={{ width: "90%" }}>
      <img
        src={miGif}
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          WebkitMaskImage:
            "radial-gradient(circle, black 50%, transparent 100%)",
          maskImage: "radial-gradient(circle, black 50%, transparent 100%)",
        }}
        alt="GIF animado"
      />
    </div>
  );
};

export default EemtGif;
