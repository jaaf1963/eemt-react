//import "../../App.css";
import React, { useEffect, useState } from "react";
//import DisplayCheckBox from "../components/DisplayCheckBox";
import FileDisplayDownView from "./FileDisplayDownView";
import ProgressWithLabel from "./InfiniteProgress";
//
// Solo lista documentos segun Button/Project
//
interface docum {
  id: number;
  docu: string;
  date: string;
  advn: number;
  docbs64: string;
}
interface tarea {
  id: number;
  task: string;
  date: string;
  advn: number;
  tskbs64: string;
}
interface itera {
  id: number;
  iter: string;
  date: string;
  advn: number;
  itrbs64: string;
}
interface fetchDocsProps {
  activarFetch: boolean;
  datoBtnFetch: string;
  codiPrjFetch: string;
  cliePrjFetch: string;
  // Esta prop permite al padre resetear el estado. No en uso aqui
  onActivar: (valor: boolean) => void;
}
//
//let contenidoADibujar1: React.ReactNode;
let theme = "";

const FetchDataView: React.FC<fetchDocsProps> = ({
  activarFetch,
  datoBtnFetch,
  codiPrjFetch,
  cliePrjFetch,
}) => {
  const [dataDocus, setDataDocus] = useState<docum[]>([]);
  const [dataTasks, setDataTasks] = useState<tarea[]>([]);
  const [dataIters, setDataIters] = useState<itera[]>([]);
  const [progress, setProgress] = useState(0); // Valor inicial 0%
  const [renderFiles, setRenderfiles] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [documentsButt, setDocumentsButt] = useState<string[]>([]);
  //
  const [textRoleStore, setTextRoleStore] = useState(() => {
    const roleStore = localStorage.getItem("role");
    if (roleStore) {
      return roleStore;
    }
    return ""; // O un valor por defecto, como { nombre: '', email: '' }
  });
  //
  const [textUserStore, setTextUserStore] = useState(() => {
    const userStore = localStorage.getItem("username");
    if (userStore) {
      return userStore;
    }
    return "";
  });
  //
  const [entyUserStore, setEntyUserStore] = useState(() => {
    const entyStore = localStorage.getItem("entity");
    if (entyStore) {
      return entyStore;
    }
    return "";
  });
  //
  const [authUserStore, setAuthUserStore] = useState(() => {
    const authStore = localStorage.getItem("token");
    if (authStore) {
      return authStore;
    }
    return "";
  });
  //
  //-----------------------------------------------------------------
  //
  const [listFiles, setListfiles] = useState<string[]>([]);
  const manejarFileSeleccion = (fileSelect: string) => {
    //setFileSelected(fileSelect);
    //
    setListfiles((prevListfiles) => [...prevListfiles, fileSelect]);
    //
    console.log("Dato recibido desde DisplayCheck:", fileSelect);
    console.log(listFiles);
  };
  //
  //
  const manejarFileDelete = (fileSelect: string) => {
    //setFileSelected(fileSelect);
    //
    // Delete document
    //
    console.log("Dato recibido desde FileDisplayDownload:", fileSelect);
    //console.log(listFiles);
  };
  //
  //
  const getDocumentsButton = async (codiPrjSel: string, buttonSel: string) => {
    //
    if (
      textRoleStore !== null &&
      entyUserStore !== null &&
      textUserStore !== null &&
      authUserStore !== null
    ) {
      //
      if (
        textRoleStore === "admin" ||
        textRoleStore === "edit" ||
        textRoleStore === "view"
      ) {
        //
        setIsLoading(true);
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
        try {
          const response = await fetch(
            "http://localhost:5055/get_documents_display_react",
            {
              method: "POST",
              body: JSON.stringify(dataButton),
              headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
            }
          );
          const documsResp = await response.json();
          //
          if (documsResp.success === "err") {
            //throw new Error(`HTTP error! status: ${response.status}`);
            const message = documsResp.msg[0];
            alert(message);
          }
          //
          const docums = documsResp.msg;
          //
          console.log("LECTURA");
          console.log(docums);
          if (docums) {
            //
            setDocumentsButt(docums);
            //
            handleFetchDocuments(docums);
          }
          //
        } catch (err: any) {
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
    const addDataDocus = (newDocu: docum) => {
      // Crea un nuevo array que incluye todos los datos existentes
      //setDataDocus([...dataDocus, newDocu]);
      setDataDocus((prevDataDocus) => [...prevDataDocus, newDocu]);
    };
    const deleteDataDocusV = (itmToDelete: string) => {
      const newItems = dataDocus.filter((item) => item.docu !== itmToDelete);
      setDataDocus(newItems);
    };
    //
    const addDataTasks = (newTask: tarea) => {
      // Crea un nuevo array que incluye todos los datos existentes
      //setDataTasks([...dataTasks, newTask]);
      setDataTasks((prevDataTasks) => [...prevDataTasks, newTask]);
    };
    const deleteDataTasksV = (itmToDelete: string) => {
      const newItems = dataTasks.filter((item) => item.task !== itmToDelete);
      setDataTasks(newItems);
    };
    //
    const addDataIters = (newIter: itera) => {
      // Crea un nuevo array que incluye todos los datos existentes
      //setDataTasks([...dataTasks, newTask]);
      setDataIters((prevDataIters) => [...prevDataIters, newIter]);
    };

    //
    //let files = [[]]
    console.log("datoBtnFetch:", datoBtnFetch);
    console.log(files);
    //
    if (files) {
      //setProgress(files[0].avance_proy);
      setDataDocus([]);
      setDataTasks([]);
      setDataIters([]);
      //
      // Themes
      //
      theme = files.theme;
      //
      // Docs
      //
      ////const docsNames = Object.entries(dataFiles[0].docs);
      let docnames = files.docus;
      //let datetask = files.tskdat;
      //let advntask = files.tskadv;
      let bs64docum = files.docusx;
      //
      console.log("docnames:", docnames);
      if (docnames) {
        for (let i: number = 0; i < docnames.length; i++) {
          //
          addDataDocus({
            id: i,
            docu: docnames[i],
            date: "",
            advn: 0,
            docbs64: bs64docum[i],
          });
        }
      }
      //console.log("$$$$$$ dataDocus[]:", dataDocus);
      //
      // Tasks
      //
      ////const docsTasks = Object.entries(dataFiles[0].tasks);
      let doctasks = files.tasks;
      let datetask = files.tskdat;
      let advntask = files.tskadv;
      let bs64task = files.tasksx;
      //
      console.log("doctasks:", doctasks);
      console.log("datetask:", datetask);
      console.log("advntask:", advntask);
      if (doctasks) {
        for (let i: number = 0; i < doctasks.length; i++) {
          //
          //let tsk = doctasks[i];
          addDataTasks({
            id: i,
            task: doctasks[i].toString(),
            date: datetask[i][0] + " " + datetask[i][1],
            advn: advntask[i],
            tskbs64: bs64task[i],
          });
        }
      }
      //
      //console.log("##### dataTasks[]:", dataTasks);
      //
      // Iterations
      //
      ////const docsTasks = Object.entries(dataFiles[0].tasks);
      let dociters = files.iters;
      let dateiter = files.itrdat;
      let advniter = files.itradv;
      let bs64iter = files.itersx;
      console.log("dociters:", dociters);
      console.log("datiters:", dateiter);
      console.log("advniter:", advniter);
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
            itrbs64: bs64iter[i],
          });
        }
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
  //  codiPrjFetch, datoBtnFetch
  //
  useEffect(() => {
    // Aquí podrías hacer llamadas a API, actualizar estado, etc.
    // Aquí podrías hacer llamadas a API, actualizar estado, etc.
    // onActivar: Llama a la función onActivar para resetear el estado en el padre
    // y evitar que el efecto se ejecute cada vez que se renderiza el padre.
    // onActivar(false); // Opcional: resetea el estado en el padre
    //
    getDocumentsButton(codiPrjFetch, datoBtnFetch);
    //
    //
  }, [activarFetch, datoBtnFetch]);

  if (!activarFetch) {
    return <p>Presione un botón para ver info.</p>;
  }
  //
  //    <span>{mensajeDeBoton}</span>;
  return (
    <>
      {isLoading && (
        <div style={{ marginLeft: "0px" }}>
          <ProgressWithLabel />
        </div>
      )}
      <div
        style={{
          marginLeft: "3px",
          backgroundColor: "#f5f5f5ff",
          width: "100%",
          height: "80px",
          padding: "5px",
          marginBottom: "5px",
          //overflow: "auto",
        }}
      >
        <div>
          <span>Tema: </span>
          <span style={{ fontFamily: "cursive" }}>{theme}</span>
          <br></br>
          <span>Avance del proyeto: </span>
          <progress value={progress} max={100}></progress>{" "}
          {/* El valor indica el progreso actual, max el 100% */}
          <span> {progress}%</span> {/* Muestra el porcentaje */}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            marginLeft: "3px",
            backgroundColor: "#f5f5f5ff",
            width: "30%",
            height: "500px",
            padding: "5px",
            //overflow: "auto",
          }}
        >
          <strong>Tareas.</strong>
          <ul>
            {dataTasks.map((tsk) => (
              <li key={tsk.id} id="span-tasks">
                <FileDisplayDownView
                  fileName={tsk.task}
                  base64str={tsk.tskbs64}
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
            marginLeft: "6px",
            backgroundColor: "#f5f5f5ff",
            width: "70%",
            height: "500px",
            padding: "5px",
            //overflow: "auto",
          }}
        >
          <strong>Lista de Documentos.</strong>
          <ul>
            {" "}
            {dataDocus.map((doc) => (
              <li key={doc.id} id="span-docus">
                <FileDisplayDownView
                  fileName={doc.docu}
                  base64str={doc.docbs64}
                  onDelete={manejarFileDelete}
                />
              </li>
            ))}
          </ul>
          <p>...</p>
          <strong>Iteraciones.</strong>
          <ul>
            {dataIters.map((ite) => (
              <li key={ite.id} id="span-iters">
                <FileDisplayDownView
                  fileName={ite.iter}
                  base64str={ite.itrbs64}
                  onDelete={manejarFileDelete}
                />
                {ite.date} <progress value={ite.advn} max={100}></progress>{" "}
                {/* El valor indica el progreso actual, max el 100% */}
                <span> {ite.advn}%</span> {/* Muestra el porcentaje */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FetchDataView;
