import React from "react";
import panelsImage from "../images/panels.jpg"; // Ajusta la ruta

const PanelsImage: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${panelsImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // 'cover' O 'contain' si prefieres
        //width: "30vh",
        height: "18vh", // Asegura que ocupe toda la altura de la pantalla*/
        objectFit: "contain" /* O 'cover', 'fill', 'contain', etc. */,
      }}
    >
      {/* Aquí va el contenido de tu componente */}
      <span style={{ color: "#13ce1fff" }}></span>
    </div>
  );
};

export default PanelsImage;
