import React from "react";
import buttonsPanel from "../images/buttons_panel.jpg"; // Ajusta la ruta

const ButtonsPanelImage: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${buttonsPanel})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain", // 'cover' O 'contain' si prefieres
        width: "50",
        height: "18vh", // Asegura que ocupe toda la altura de la pantalla*/
        objectFit: "contain" /* O 'cover', 'fill', 'contain', etc. */,
      }}
    >
      {/* Aquí va el contenido de tu componente */}
      <span style={{ color: "#13ce1fff" }}>contenido del fondo imag</span>
    </div>
  );
};

export default ButtonsPanelImage;
