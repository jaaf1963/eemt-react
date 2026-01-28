import React from "react";
import eemtImage from "../images/imageLogo.png"; // Ajusta la ruta
const EemtImage: React.FC = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${eemtImage})`,
          backgroundRepeat: "no-repeat",
          //backgroundSize: "contain", // 'cover' O 'contain' si prefieres
          marginTop: "5%",
          marginLeft: "5%",
          width: "100%",
          //height: "100%",
          height: "15vh", // Asegura que ocupe toda la altura de la pantalla*/
          //objectFit: "contain" /* O 'cover', 'fill', 'contain', etc. */,
        }}
      ></div>
    </>
  );
};

export default EemtImage;
