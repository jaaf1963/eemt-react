import React from "react";
import eemtImage from "../images/marek-piwnicki.jpg"; // Ajusta la ruta

const EemtImage2: React.FC = () => {
  return (
    <div
      style={{
        marginLeft: "0rem",
        backgroundImage: `url(${eemtImage})`,

        backgroundSize: "cover" /* Cubre todo el espacio */,
        backgroundPosition: "center" /* Centra la imagen */,
        backgroundRepeat: "no-repeat",
        position: "fixed" /* Fija la imagen al scroll */,
        top: " 0",
        left: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "-1" /* Mantiene el fondo detrás del contenido */,

        //backgroundRepeat: "no-repeat",
        //backgroundSize: "contain", // 'cover' O 'contain' si prefieres
        //width: "100%",
        //height: "100%",
        //height: "48vh", // Asegura que ocupe toda la altura de la pantalla*/
        //objectFit: "contain" /* O 'cover', 'fill', 'contain', etc. */,
      }}
    >
      {/* Aquí va el contenido de tu componente */}
      <span style={{ color: "#505557ff" }}></span>
    </div>
  );
};

export default EemtImage2;
