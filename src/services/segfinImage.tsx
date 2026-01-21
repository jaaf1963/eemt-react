import React from "react";
import segfinImage from "../images/segfin1.png"; // Ajusta la ruta

const SegfinImage: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${segfinImage})`,
        backgroundRepeat: "no-repeat",
        //backgroundSize: "contain", // 'cover' O 'contain' si prefieres
        width: "100%",
        //height: "100%",
        height: "18vh", // Asegura que ocupe toda la altura de la pantalla*/
        //objectFit: "contain" /* O 'cover', 'fill', 'contain', etc. */,
      }}
    >
      {/* Aquí va el contenido de tu componente */}
      <span style={{ color: "#03042bff" }}></span>
    </div>
  );
};

export default SegfinImage;
