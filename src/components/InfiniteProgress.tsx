import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

function ProgressWithLabel() {
  const now = 60;
  //return <ProgressBar now={now} label={`${now}%`} />;
  //{/* Barra de progreso con un degradado */}
  return <ProgressBar now={now} variant="success" animated />;
}

export default ProgressWithLabel;
