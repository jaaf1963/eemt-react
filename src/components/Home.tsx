import HomeImage from "../services/homeImage";
import PortadaGif from "./portadagif";

const Home: React.FC = () => {
  //
  return (
    <>
      <div className="transparent-panel" style={{ width: "37%" }}>
        <div className="container-transp">
          <p style={{ fontSize: "21px", fontWeight: "bold" }}>
            Empresa de Estudios Electromagnéticos
          </p>
        </div>
      </div>
      <div
        className="transparent-panel"
        style={{ width: "37%", marginTop: "5px" }}
      >
        <div className="container-transp" style={{}}>
          <p style={{ fontSize: "20px" }}>Especialistas:</p>
        </div>
        <div className="container-transp" style={{ fontStyle: "italic" }}>
          <p style={{ fontSize: "18px" }}>. Sistemas de Potencia</p>
        </div>
        <div className="container-transp" style={{ fontStyle: "italic" }}>
          <p style={{ fontSize: "18px" }}>. Estudios por Simulación</p>
        </div>
        <div className="container-transp" style={{ fontStyle: "italic" }}>
          <p style={{ fontSize: "18px" }}>. Pruebas en Sitio</p>
        </div>
      </div>

      <div className="container">
        {/* Imagen de Fondo */}
        <HomeImage />

        {/* GIF encima */}
        <PortadaGif />
      </div>
    </>
  );
};

export default Home;
