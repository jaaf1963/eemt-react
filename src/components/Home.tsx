import HomeImage from "../services/homeImage";
import PortadaGif from "./portadagif";

const Home: React.FC = () => {
  //
  return (
    <div className="container">
      {/* Imagen de Fondo */}
      <HomeImage />

      {/* GIF encima */}
      <PortadaGif />
    </div>
  );
};

export default Home;
