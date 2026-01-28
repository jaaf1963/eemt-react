import EemtImage from "../services/eemtImage";
import EemtImage2 from "../services/eemtimage2";
import EemtGif from "./eemtgif";

const EEMT: React.FC = () => {
  //
  return (
    <>
      <div className="container">
        {/* Aquí va el contenido de tu componente */}
        <span style={{ color: "rgb(115, 178, 202)", fontSize: "25px" }}>
          Bienvenidos a la Empresa de Estudios
        </span>
        {/* Imagen de Fondo */}
        <EemtImage />
        <span style={{ color: "beige", fontSize: "18px", marginLeft: "5%" }}>
          #estudiamosconenergía
        </span>
        <EemtImage2 />
        {/* GIF encima */}
        <EemtGif />
      </div>
      <div style={{ marginTop: "300px" }}>
        <p
          style={{
            color: "rgb(115, 178, 202)",
            fontSize: "18px",
          }}
        >
          Ofrecemos consultoría de calidad para todos los actores que operan el
          sistema eléctrico
        </p>
        <p
          style={{
            color: "rgb(115, 178, 202)",
            fontSize: "18px",
          }}
        >
          Generación – Transmisión – Ingeniería – Operador
        </p>
        <p
          style={{
            color: "rgb(115, 178, 202)",
            fontSize: "16px",
          }}
        >
          in Estudios Electromagnéticos +56 (22) 668 9106
          contacto@estudios-electromagneticos.com
        </p>
      </div>
    </>
  );
};

export default EEMT;
