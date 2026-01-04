import React from "react";
import tableButtons from "../images/table_buttons2.jpg"; // Ajusta la ruta

const ButtonsTableImage: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${tableButtons})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain", // 'cover' O 'contain' si prefieres
        width: "50",
        height: "46vh", // Asegura que ocupe toda la altura de la pantalla*/
        objectFit: "contain" /* O 'cover', 'fill', 'contain', etc. */,
      }}
    >
      {/* Aquí va el contenido de tu componente */}
      <span style={{ color: "black" }}>Contenido del fondo imag</span>
    </div>
  );
};

export default ButtonsTableImage;
