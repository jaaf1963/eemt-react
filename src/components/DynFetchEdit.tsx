import React, { useEffect, useState } from "react";
import FileDisplayDownload from "./FileDisplayDownload";
import ProgressWithLabel from "./InfiniteProgress";
//import { srv_host } from "../types/user.type";

//const posic = Number(srv_host[0]);
//const ubihost = srv_host[posic];
//
// Solo lista documentos segun Button/Project
//
interface docum {
  id: number;
  docu: string;
  date: string;
  advn: number;
  numdoc: number;
  docbs64: string;
}
interface tarea {
  id: number;
  task: string;
  date: string;
  advn: number;
  numtsk: number;
  tskbs64: string;
}
interface itera {
  id: number;
  iter: string;
  date: string;
  advn: number;
  numitr: number;
  itrbs64: string;
}
interface docsEx {
  id: number;
  num: number;
  name: string;
}
interface fetchDocsProps {
  activarFetch: boolean;
  datoBtnFetch: string;
  codiPrjFetch: string;
  cliePrjFetch: string;
  // Esta prop permite al padre resetear el estado. No en uso aqui
  onActivar: (valor: boolean) => void;
  // Define el tipo para devolver documentos
  //onDocusEx: (files: FileList) => void;
  onDocusEx: (updaDocExist: docsEx[]) => void;
}
//
//let contenidoADibujar1: React.ReactNode;
//let theme = "";
let descriPrj = "";

const FetchDataEdit: React.FC<fetchDocsProps> = ({
  activarFetch,
  datoBtnFetch,
  codiPrjFetch,
  cliePrjFetch,
  onDocusEx,
}) => {
  const [themeProj, setThemeProj] = useState<string>("");
  const [descrProj, setDescrProj] = useState<string>("");
  const [responsab, setResponsab] = useState<string>("");
  const [numiterac, setNumiterac] = useState<string>("");
  const [dataDocus, setDataDocus] = useState<docum[]>([]);
  const [dataTasks, setDataTasks] = useState<tarea[]>([]);
  const [dataIters, setDataIters] = useState<itera[]>([]);
  const [existDocs, setExistDocs] = useState<docsEx[]>([]);
  const [progress, setProgress] = useState(0); // Valor inicial 0%
  const [renderFiles, setRenderfiles] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isExisdoc, setIsExisdoc] = React.useState(false);
  const [ubihost, setHubihost] = useState<string>("");
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
  //-----------------------------------------------------------------
  //
  // Delete documents
  //
  const manejarFileDelete = async (fileSelect: string) => {
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
          const API_URL_BACKEND = ubihost + "/delete_document_display_react";
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
          }
        } else {
          alert("NO tiene credenciales para eliminar documentos.");
        }
      } else {
        alert("No se advierte usuario...hacer Login");
      }
    }
  };
  //
  // Descrip Project Update
  //
  const handleUpdateDescrip = async () => {
    //console.log("Dato recibido para Delete:", fileSelect);
    if (descriPrj !== "") {
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
            buttext: "descrip_project",
            entity: entyUserStore,
            userna: textUserStore,
            authen: authUserStore,
            codprj: codiPrjFetch,
            cliprj: cliePrjFetch,
            button: datoBtnFetch,
            dcrprj: descriPrj,
          };
          //
          const API_URL_BACKEND = ubihost + "/descrip_project_display_react";
          //
          try {
            const response = await fetch(API_URL_BACKEND, {
              method: "POST",
              body: JSON.stringify(dataButton),
              headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
            });
            const descripResp = await response.json();
            //
            if (descripResp.success === "err") {
              //throw new Error(`HTTP error! status: ${response.status}`);
              const message = descripResp.msg;
              alert(message);
              //
            } else {
              //
              const msgDescrip = descripResp.msg;
              alert(msgDescrip);
              //
            }
          } catch (err: any) {
            //setError(err.message);
            alert("Error al grabar descripcion proyecto...");
            //
          } finally {
            setIsLoading(false);
          }
        } else {
          alert("NO tiene credenciales para cambiar descripcion.");
        }
      } else {
        alert("No se advierte usuario...hacer Login");
      }
    }
  };
  //
  // Get documents
  //
  const getDocumentsButton = async (codiPrjSel: string, buttonSel: string) => {
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
      setThemeProj("");
      setDescrProj("");
      setResponsab("");
      setNumiterac("");
      setDataDocus([]);
      setDataTasks([]);
      setDataIters([]);
      //
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        //
        const dataButton = {
          buttext: "display_documents",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
          codprj: codiPrjSel,
          cliprj: cliePrjFetch,
          button: buttonSel,
        };
        //console.log("dataButton:", dataButton);
        //
        const API_URL_BACKEND = ubihost + "/get_documents_display_react";
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
            if (docums) {
              //
              //setDocumentsButt(docums);
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
  // Función para manejar el cambio de la 'Observacion'
  const handleChangeDescrip = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      //setDescrProj(e.target.value);
      descriPrj = e.target.value;
      setDescrProj(descriPrj);
    }
  };
  //
  //
  const handleFetchDocuments = (files: any) => {
    //
    const addDataDocus = (newDocu: docum) => {
      // Crea un nuevo array que incluye todos los datos existentes
      setDataDocus((prevDataDocus) => [...prevDataDocus, newDocu]);
    };
    //
    const addDataTasks = (newTask: tarea) => {
      // Crea un nuevo array que incluye todos los datos existentes
      setDataTasks((prevDataTasks) => [...prevDataTasks, newTask]);
    };
    //
    const addDataIters = (newIter: itera) => {
      // Crea un nuevo array que incluye todos los datos existentes
      setDataIters((prevDataIters) => [...prevDataIters, newIter]);
    };
    const addExistDocus = (newDocu: docsEx) => {
      // Crea un nuevo array que incluye todos los datos existentes
      setExistDocs((prevExistDocs) => [...prevExistDocs, newDocu]);
    };

    //
    //console.log(files);
    //
    if (files) {
      setDataDocus([]);
      setDataTasks([]);
      setDataIters([]);
      setExistDocs([]);
      //
      // Themes
      //
      //theme = files.theme;
      setThemeProj(files.theme);
      setDescrProj(files.descri);
      setResponsab(files.author[0]);
      setNumiterac(files.itrmaj);
      //
      // Docs
      //
      ////const docsNames = Object.entries(dataFiles[0].docs);
      let docnames = files.docus;
      let bs64docum = files.docusx;
      let numedocu = files.numdoc;
      //
      if (docnames) {
        for (let i: number = 0; i < docnames.length; i++) {
          //
          addDataDocus({
            id: i,
            docu: docnames[i],
            date: "",
            advn: 0,
            numdoc: numedocu[i],
            docbs64: bs64docum[i],
          });
        }
        //
        // Documentos existentes en DB
        //
        for (let i: number = 0; i < docnames.length; i++) {
          addExistDocus({
            id: i,
            num: numedocu[i],
            name: docnames[i],
          });
        }
        addExistDocus({
          id: 99,
          num: 99,
          name: "--- Nothing Document ---",
        });
        //
        // Envia Documentos a 'BtnDynCliEdit'
        onDocusEx(existDocs);
        //
        if (!isExisdoc) {
          setIsExisdoc(true);
        }
      }
      //
      // Tasks
      //
      let doctasks = files.tasks;
      let datetask = files.tskdat;
      let advntask = files.tskadv;
      let bs64task = files.tasksx;
      let numetask = files.numtsk;
      //
      if (doctasks) {
        for (let i: number = 0; i < doctasks.length; i++) {
          //
          //let tsk = doctasks[i];
          addDataTasks({
            id: i,
            task: doctasks[i].toString(),
            date: datetask[i][0] + " " + datetask[i][1],
            advn: advntask[i],
            numtsk: numetask[i],
            tskbs64: bs64task[i],
          });
        }
      }
      //
      // Iterations
      //
      let dociters = files.iters;
      let dateiter = files.itrdat;
      let advniter = files.itradv;
      let bs64iter = files.itersx;
      let numeiter = files.numitr;
      //
      if (dociters) {
        for (let i: number = 0; i < dociters.length; i++) {
          //
          //let tsk = doctasks[i];
          addDataIters({
            id: i,
            iter: dociters[i].toString(),
            date: dateiter[i][0] + " " + dateiter[i][1],
            advn: advniter[i],
            numitr: numeiter[i],
            itrbs64: bs64iter[i],
          });
        }
      }
      //
      // Despliega 'Files' al hacer Click en 'Buttons'
      //
      setRenderfiles(true);
      //
    }

    if (renderFiles) {
      setRenderfiles(false);
    }
  };

  useEffect(() => {
    //
    let numApp = process.env.REACT_APP_NUM;
    if (Number(numApp) === 1) {
      // api web
      const ubiho = process.env.REACT_APP_API_URL;
      //
      if (ubiho) {
        setHubihost(ubiho);
      }
    } else {
      // local
      const ubiho = process.env.REACT_APP_LOC;
      //
      if (ubiho) {
        setHubihost(ubiho);
      }
    }
    //
  }, []);

  //
  useEffect(() => {
    // Aquí podrías hacer llamadas a API, actualizar estado, etc.
    // Aquí podrías hacer llamadas a API, actualizar estado, etc.
    // onActivar: Llama a la función onActivar para resetear el estado en el padre
    // y evitar que el efecto se ejecute cada vez que se renderiza el padre.
    //onActivar(false); // Opcional: resetea el estado en el padre
    //
    getDocumentsButton(codiPrjFetch, datoBtnFetch);
    //
    //
  }, [activarFetch, datoBtnFetch, isExisdoc]); // , isExisdoc
  //
  //
  if (!activarFetch) {
    return <p>Presione un botón para ver info.</p>;
  }
  //
  //    <span>{mensajeDeBoton}</span>;
  //    <InfiniteProgress isLoading={isLoading} />
  //
  return (
    <>
      {isLoading && (
        <div style={{ marginLeft: "0px" }}>
          <ProgressWithLabel />
        </div>
      )}
      <div
        style={{
          marginLeft: "0.01%",
          backgroundColor: "#f5f5f5ff",
          width: "100%",
          height: "30%",
          marginBottom: "0.3%",
          display: "flex",
          //overflow: "auto",
        }}
        //         <div style={{ display: "flex", backgroundColor: "orange" }}>
      >
        <div style={{ width: "30%", backgroundColor: "yellow" }}>
          <span style={{ marginLeft: "2%" }}>Tema: </span>
          <span style={{ fontFamily: "cursive" }}>{themeProj}</span>
          <br></br>
          <span style={{ marginLeft: "2%" }}>Avance del proyeto: </span>
          <br></br>
          <progress
            value={progress}
            max={100}
            style={{ marginLeft: "20%" }}
          ></progress>{" "}
          {/* El valor indica el progreso actual, max el 100% */}
          <span> {progress}%</span> {/* Muestra el porcentaje */}
        </div>
        <div
          style={{
            marginLeft: "0%",
            width: "99.8%",
            backgroundColor: "cyan",
          }}
        >
          <strong>Descripción del proyecto:</strong>
          <button
            className="button-upload-docs"
            onClick={handleUpdateDescrip}
            style={{ marginLeft: "70%", width: "70px", height: "25px" }}
          >
            Update
          </button>
          <div>
            <textarea
              style={{ resize: "none", width: "97%" }}
              value={descrProj}
              onChange={handleChangeDescrip}
            ></textarea>
          </div>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            marginLeft: "3px",
            backgroundColor: "#f5f5f5ff",
            width: "15%",
            height: "500px",
            padding: "0px",
            //overflow: "auto",
          }}
        >
          <strong></strong>
          <ul>
            {dataTasks.map((tsk) => (
              <li key={tsk.id} id="span-tasks">
                <FileDisplayDownload
                  fileName={tsk.task + " " + tsk.numtsk.toString()}
                  base64str={tsk.tskbs64}
                  numdocum={tsk.numtsk}
                  onDelete={manejarFileDelete}
                />
                {tsk.date} <progress value={tsk.advn} max={100}></progress>{" "}
                {/* El valor indica el progreso actual, max el 100% */}
                <span> {tsk.advn}%</span> {/* Muestra el porcentaje */}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            marginLeft: "0px",
            backgroundColor: "#f5f5f5ff",
            width: "85%",
            height: "500px",
            padding: "5px",
            //overflow: "auto",
          }}
        >
          {dataDocus && <strong>Lista de Documentos.</strong>}
          {dataDocus && (
            <ul>
              {" "}
              {dataDocus.map((doc) => (
                <li key={doc.numdoc} id="span-docus">
                  <FileDisplayDownload
                    fileName={doc.docu}
                    base64str={doc.docbs64}
                    numdocum={doc.numdoc}
                    onDelete={manejarFileDelete}
                  />
                </li>
              ))}
            </ul>
          )}
          {responsab && <strong>Responsable: </strong>}
          {responsab && <span style={{ color: "blue" }}>{responsab}</span>}
          <br></br>
          {numiterac && <span>Número de iteraciones: </span>}
          {numiterac && (
            <strong style={{ color: "blue" }}>[ {numiterac} ]</strong>
          )}
          <ul>
            {dataIters.map((ite) => (
              <li key={ite.id} id="span-iters">
                <FileDisplayDownload
                  fileName={ite.iter}
                  base64str={ite.itrbs64}
                  numdocum={ite.numitr}
                  onDelete={manejarFileDelete}
                />
                {ite.date} <progress value={ite.advn} max={100}></progress>{" "}
                {/*  + " " + ite.numitr.toString() */}
                {/* El valor indica el progreso actual, max el 100%  */}
                <span> {ite.advn}%</span> {/* Muestra el porcentaje */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FetchDataEdit;
