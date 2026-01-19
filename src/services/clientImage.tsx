import React from "react";
import clientImage from "../images/client1.jpg"; // Ajusta la ruta

const ClientImage: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${clientImage})`,
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

export default ClientImage;
