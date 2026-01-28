import React from "react";
import homeImage from "../images/fondo1.png"; // Ajusta la ruta
import "../styles/InputGroup.css";

const HomeImage: React.FC = () => {
  //
  // Especialistas en sistemas de potencia - Estudios por simulación y pruebas en sitio
  return (
    <div
      style={{
        backgroundImage: `url(${homeImage})`,

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
        //filter: "brightness(80%)", // Reduce el brillo al 50% [2]
        ////backgroundSize: "contain", // 'cover' O 'contain' si prefieres
        //width: "100%",
        ////height: "100%",
        ///height: "88vh", // Asegura que ocupe toda la altura de la pantalla*/
        ////objectFit: "contain" /* O 'cover', 'fill', 'contain', etc. */,
        //position: "relative",
      }}
    >
      {/* Aquí va el contenido de tu componente */}
      <span style={{ color: "#03042bff" }}></span>
    </div>
  );
};

export default HomeImage;
