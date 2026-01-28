import React, { useState } from "react";
import GridHistoryDisplay from "./HistoryGridDisplay";
import ProgressWithLabel from "./InfiniteProgress";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;
//
// Solo lista documentos segun Button/Project
//
interface itera {
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
interface fetchDocsProps {
  activarFetch: boolean;
  datoBtnFetch: string;
  codiPrjFetch: string;
  cliePrjFetch: string;
  // Esta prop permite al padre resetear el estado. No en uso aqui
  //onActivar: (valor: boolean) => void;
}
//
//let descriPrj = "";

const HistoryDisplay: React.FC<fetchDocsProps> = ({
  activarFetch,
  datoBtnFetch,
  codiPrjFetch,
  cliePrjFetch,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [dataHistory, setDataHistory] = useState<itera[]>([]);
  //const [ubihost, setUbihost] = useState<string>("");
  const [progress, setProgress] = useState(0); // Valor inicial 0%
  const [renderFiles, setRenderfiles] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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
  // Get documents History
  //
  const get_documents_history = async () =>
    //codiPrjSel: string,
    //buttonSel: string
    {
      //
      setProgress(70);
      setIsLoading(true);
      if (
        textRoleStore !== null &&
        entyUserStore !== null &&
        textUserStore !== null &&
        authUserStore !== null
      ) {
        //
        setDataHistory([]);
        //
        if (textRoleStore === "admin" || textRoleStore === "edit") {
          //
          const dataButton = {
            buttext: "history_documents",
            entity: entyUserStore,
            userna: textUserStore,
            authen: authUserStore,
            codprj: codiPrjFetch, // codiPrjSel,
            cliprj: cliePrjFetch,
            button: datoBtnFetch, // buttonSel,
          };
          //
          const API_URL_BACKEND = `${ubihost}/get_documents_history_react`;
          //const API_URL_BACKEND ="http://localhost:5055/get_documents_history_react";
          //
          try {
            const response = await fetch(API_URL_BACKEND, {
              method: "POST",
              body: JSON.stringify(dataButton),
              headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
            });
            const documsResp = await response.json();
            //
            if (documsResp.success === "err") {
              //throw new Error(`HTTP error! status: ${response.status}`);
              const message = documsResp.msg[0];
              alert(message);
            } else {
              //
              const docums = documsResp.msg;
              //
              if (docums) {
                //
                handleFetchDocuments(docums);
                //
              }
            }
          } catch (err: any) {
            //setError(err.message);
            alert("Error al leer documentos...");
            //
          } finally {
            setIsLoading(false);
          }
        } else {
          alert("NO tiene credenciales para modificar datos.");
        }
      } else {
        alert("No se advierte usuario...hacer Login");
      }
    };
  //
  //
  const handleFetchDocuments = (files: any) => {
    //
    const addDataIters = (newIter: itera) => {
      // Crea un nuevo array que incluye todos los datos existentes
      setDataHistory((prevDataHistory) => [...prevDataHistory, newIter]);
    };
    //
    if (files) {
      setDataHistory([]);
      //
      // Iterations
      //
      let numbeitr = files.itrnum;
      let docstask = files.doctsk;
      let docsiter = files.iternm;
      let bs64iter = files.itersx;
      let advniter = files.itradv;
      let authiter = files.author;
      let dateiter = files.upddat;
      let numbetsk = files.numtsk;
      //
      if (docsiter) {
        for (let i: number = 0; i < docsiter.length; i++) {
          //
          addDataIters({
            id: i,
            numitr: numbeitr[i],
            doctsk: docstask[i].toString(),
            docitr: docsiter[i].toString(),
            b64itr: bs64iter[i],
            advitr: advniter[i],
            autitr: authiter[i],
            datupd: dateiter[i],
            numtsk: numbetsk[i],
          });
        }
        setShowHistory(true);
      }
      //
      // Despliega 'Files' al hacer Click en 'Buttons'
      //
      setRenderfiles(true);
    }

    if (renderFiles) {
      console.log("RENDER OK...");
    }
  };
  //
  if (!activarFetch) {
    return <p>Presione un botón para ver info.</p>;
  }
  //
  //
  console.log(progress);
  //
  return (
    <>
      <div style={{ display: "block" }}>
        <button
          id="history"
          name="history"
          onClick={get_documents_history}
          className="button-history"
        >
          + Historial de movimientos
        </button>
        {isLoading && (
          <div style={{ marginLeft: "0px" }}>
            <ProgressWithLabel />
          </div>
        )}
        <div
          style={{
            marginLeft: "0px",
            backgroundColor: "#f5f5f5ff",
            width: "100%",
            height: "500px",
            padding: "5px",
            //overflow: "auto",
          }}
        >
          {showHistory && (
            <GridHistoryDisplay
              datos={dataHistory}
              estaVisible={showHistory}
              datoBtnFetch={datoBtnFetch}
              codiPrjFetch={codiPrjFetch}
              cliePrjFetch={cliePrjFetch}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryDisplay;
