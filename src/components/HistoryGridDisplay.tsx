import React, { useState, useEffect } from "react";
import FileDisplayDownload from "./FileDisplayDownload";
interface ItemHist {
  id: number;
  numitr: number;
  numtsk: number;
  doctsk: string;
  docitr: string;
  b64itr: string;
  autitr: string;
  advitr: number;
  datupd: string;
}
interface GridProps {
  datos: ItemHist[];
  estaVisible: boolean; // Para controlar el fade
  // Datos ID proyecto
  //activarFetch: string;
  datoBtnFetch: string;
  codiPrjFetch: string;
  cliePrjFetch: string;
}

const GridHistoryDisplay: React.FC<GridProps> = ({
  datos,
  estaVisible,
  datoBtnFetch,
  codiPrjFetch,
  cliePrjFetch,
}) => {
  const [ubihost, setUbihost] = useState<string>("");
  const [progress, setProgress] = useState(0); // Valor inicial 0%
  const [isLoading, setIsLoading] = React.useState(true);
  //
  const [textRoleStore, setTextRoleStore] = useState(() => {
    const roleStore = localStorage.getItem("role");
    if (roleStore) {
      return roleStore;
    }
    setTextRoleStore("");
    return "";
  });
  //
  const [textUserStore, setTextUserStore] = useState(() => {
    const userStore = localStorage.getItem("username");
    if (userStore) {
      return userStore;
    }
    setTextUserStore("");
    return "";
  });
  //
  const [entyUserStore, setEntyUserStore] = useState(() => {
    const entyStore = localStorage.getItem("entity");
    if (entyStore) {
      return entyStore;
    }
    setEntyUserStore("");
    return "";
  });
  //
  const [authUserStore, setAuthUserStore] = useState(() => {
    const authStore = localStorage.getItem("token");
    if (authStore) {
      return authStore;
    }
    setAuthUserStore("");
    return "";
  });
  //
  //
  useEffect(() => {
    //
    let numApp = process.env.REACT_APP_NUM;
    if (Number(numApp) === 1) {
      // api web
      const ubiho = process.env.REACT_APP_API_URL;
      //
      if (ubiho) {
        setUbihost(ubiho);
      }
    } else {
      // local
      const ubiho = process.env.REACT_APP_LOC;
      //
      if (ubiho) {
        setUbihost(ubiho);
      }
    }
    //
  }, []);
  //
  //
  //-----------------------------------------------------------------
  // Estilo para el efecto tenue (puedes usar CSS o Tailwind)
  const estiloGrilla = {
    opacity: estaVisible ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
    //display: "block",
    // O si usas Tailwind:
    // className={`transition-opacity duration-500 ${estaVisible ? 'opacity-100' : 'opacity-0'}`}
  };
  //
  // Delete documents
  //
  const manejarFileDelete = async (fileSelect: string) => {
    //console.log("Dato recibido para Delete:", fileSelect);
    if (fileSelect !== "") {
      //
      setProgress(0);
      setIsLoading(true);
      if (
        textRoleStore !== null &&
        entyUserStore !== null &&
        textUserStore !== null &&
        authUserStore !== null
      ) {
        //
        if (textRoleStore === "admin" || textRoleStore === "edit") {
          //
          const dataButton = {
            buttext: "delete_document",
            entity: entyUserStore,
            userna: textUserStore,
            authen: authUserStore,
            codprj: codiPrjFetch,
            cliprj: cliePrjFetch,
            button: datoBtnFetch,
            docume: fileSelect,
          };
          //
          const API_URL_BACKEND = `${ubihost}/delete_document_display_react`;
          //const API_URL_BACKEND ="http://localhost:5055/delete_document_display_react";
          //
          try {
            const response = await fetch(API_URL_BACKEND, {
              method: "POST",
              body: JSON.stringify(dataButton),
              headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
            });
            const deleteResp = await response.json();
            //
            if (deleteResp.success === "err") {
              //throw new Error(`HTTP error! status: ${response.status}`);
              const message = deleteResp.msg;
              alert(message);
              //
            } else {
              //
              const docDelete = deleteResp.msg;
              alert(docDelete);
              //
            }
          } catch (err: any) {
            //setError(err.message);
            alert("Error al eliminar documento...");
            //
          } finally {
            setIsLoading(false);
            //console.log(isLoading);
          }
        } else {
          alert("NO tiene credenciales para eliminar documentos.");
        }
      } else {
        alert("No se advierte usuario...hacer Login");
      }
    }
  };
  //console.log(progress);
  //
  return (
    <div style={estiloGrilla}>
      {/* Renderizado condicional: solo mapea si está visible para optimizar */}
      {estaVisible && (
        <table>
          <thead>
            <tr className="row-head">
              <th
                style={{
                  width: "100px",
                  marginLeft: "5px",
                  textAlign: "revert-layer",
                }}
              >
                Iteración
              </th>
              <th style={{ width: "460px", marginLeft: "1px" }}>Tareas</th>
              <th style={{ width: "560px", marginLeft: "5px" }}>Documentos</th>
              <th style={{ width: "160px", marginLeft: "5px" }}>Autor</th>
              <th style={{ width: "85px", marginLeft: "5px" }}>Actualizado</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item, index) => (
              <tr
                key={item.id}
                className={item.numitr % 2 === 0 ? "row-even" : "row-odd"}
              >
                <td style={{ textAlign: "center" }}>{item.numitr}</td>
                <td>{item.doctsk}</td>

                <td key={item.id} id="span-iters">
                  <FileDisplayDownload
                    fileName={item.docitr} //+ " " + item.numitr.toString()
                    base64str={item.b64itr}
                    numdocum={item.numtsk}
                    onDelete={manejarFileDelete}
                  />
                </td>

                <td>{item.autitr}</td>
                <td
                  style={{
                    textAlign: "center",
                    color: "tomato",
                    fontStyle: "oblique",
                    fontSize: "small",
                  }}
                >
                  {item.datupd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Alternativa: mostrar siempre pero con estilos que lo "ocultan" */}
      {/* {!estaVisible && <p>No hay datos</p>} */}
    </div>
  );
};

export default GridHistoryDisplay;
