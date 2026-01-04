import React from "react";
import eemtImage from "../images/imageLogo.png"; // Ajusta la ruta

const EemtImage: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${eemtImage})`,
        backgroundRepeat: "no-repeat",
        //backgroundSize: "contain", // 'cover' O 'contain' si prefieres
        width: "100%",
        //height: "100%",
        height: "48vh", // Asegura que ocupe toda la altura de la pantalla*/
        //objectFit: "contain" /* O 'cover', 'fill', 'contain', etc. */,
      }}
    >
      {/* Aquí va el contenido de tu componente */}
      <span style={{ color: "#505557ff" }}></span>
    </div>
  );
};

export default EemtImage;
