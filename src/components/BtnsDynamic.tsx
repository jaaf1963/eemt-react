//
// Create Buttons Dynamics
//
interface ButtonProps {
  idButton: string;
  clasname: string;
  buttname: string;
  buttsize: string;
  buttshad: string;
  buttstat: string; //"active" | "inactive" | "disabled";
  onClick: () => void; // Función para manejar el clic
}

function DynamicButton({
  idButton,
  clasname,
  buttname,
  buttsize,
  buttstat,
  buttshad,
  onClick,
}: ButtonProps) {
  //
  return (
    <button
      //disabled={status === "disabled" ? true : false}
      id={idButton}
      className={clasname}
      onClick={onClick}
      style={{
        backgroundColor:
          buttstat === "inactive"
            ? "#13ce1fff"
            : buttstat === "active"
            ? "#65fa02ff"
            : buttstat === "disabled"
            ? "#717c7cff"
            : "active",
        width: buttsize,
        boxShadow: buttshad,
        height: "30px",
        border: "0px",
        margin: "5px",
        borderRadius: "5px",
      }}
    >
      {buttname}
    </button>
  );
}

export default DynamicButton;
