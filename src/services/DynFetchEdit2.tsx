//import "../../App.css";
import React, { useEffect, useState } from "react";
import DisplayCheckBox from "../components/DisplayCheckBox";
//
const dataFetch = [
  //---- p1 1 ----------------------------------------------------------------------
  {
    id: 101,
    avance_proy: 87,
    flw_button: "101",
    theme:
      "Mejoras 1 para 101 Electromagnetismo en Transmision a Larga Distancia",
    docs: [
      "Buanas formas 101 en Electromagnetismo 2025.pdf",
      "Buanas practicas 101 en Electromagnetismo 2025.pdf",
    ],
    tasks: [
      ["2025-04-01", "Revision 101 anexos {8}", 60],
      ["2025-03-01", "Revision 101 anexos {7}", 75],
      ["2025-02-01", "Revision 101 anexos {5,6}", 100],
      ["2024-12-01", "Revision 101 anexos {3,4}", 100],
      ["2024-11-10", "Revision 101 anexos {1,2}", 100],
    ],
  },
  //---- p1 2 ----------------------------------------------------------------------
  {
    id: 102,
    avance_proy: 55,
    flw_button: "102",
    theme:
      "Mejoras 2 para 102 Electromagnetismo en Transmision a Larga Distancia",
    docs: [
      [
        "Buanas practicas 102 en Electromagnetismo 2025.pdf",
        "Buanas practicas 102 en Electromagnetismo 2024.pdf",
      ],
    ],
    tasks: [
      ["2025-04-01", "Revision 102 anexos {5}", 54],
      ["2025-03-01", "Revision 102 anexos {4}", 92],
      ["2025-02-01", "Revision 102 anexos {1-3}", 100],
    ],
  },
  {
    id: 103,
    avance_proy: 65,
    flw_button: "103",
    theme:
      "Mejoras 2 para 103 Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas 103 en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 104,
    avance_proy: 0,
    flw_button: "104",
    theme: "",
    docs: [],
    tasks: [],
  },
  {
    id: 105,
    avance_proy: 20,
    flw_button: "105",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  //---- p1 3 ----------------------------------------------------------------------
  {
    id: 106,
    avance_proy: 75,
    flw_button: "106",
    theme: "Mejoras 3 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  //---- p2 4 ----------------------------------------------------------------------
  {
    id: 201,
    avance_proy: 35,
    flw_button: "201",
    theme: "Mejoras 4 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 202,
    avance_proy: 15,
    flw_button: "202",
    theme: "Mejoras 4 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 203,
    avance_proy: 85,
    flw_button: "203",
    theme: "Mejoras 4 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 204,
    avance_proy: 60,
    flw_button: "204",
    theme: "Mejoras 4 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 205,
    avance_proy: 55,
    flw_button: "205",
    theme: "Mejoras 4 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  //---- p2 5 ----------------------------------------------------------------------
  {
    id: 207,
    avance_proy: 90,
    flw_button: "207",
    theme: "Mejoras 5 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 208,
    avance_proy: 96,
    flw_button: "208",
    theme: "Mejoras 5 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 209,
    avance_proy: 48,
    flw_button: "209",
    theme: "Mejoras 5 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 210,
    avance_proy: 74,
    flw_button: "210",
    theme: "Mejoras 5 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 211,
    avance_proy: 66,
    flw_button: "211",
    theme: "Mejoras 5 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 212,
    avance_proy: 88,
    flw_button: "212",
    theme: "Mejoras 5 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 213,
    avance_proy: 77,
    flw_button: "213",
    theme: "Mejoras 5 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 214,
    avance_proy: 63,
    flw_button: "214",
    theme: "Mejoras 5 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  //---- p2 6 ----------------------------------------------------------------------
  {
    id: 215,
    avance_proy: 44,
    flw_button: "215",
    theme: "Mejoras 6 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 216,
    avance_proy: 77,
    flw_button: "216",
    theme: "Mejoras 6 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 217,
    avance_proy: 38,
    flw_button: "217",
    theme: "Mejoras 6 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 218,
    avance_proy: 36,
    flw_button: "218",
    theme: "Mejoras 6 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 219,
    avance_proy: 86,
    flw_button: "219",
    theme: "Mejoras 6 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 220,
    avance_proy: 84,
    flw_button: "220",
    theme: "Mejoras 6 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 221,
    avance_proy: 48,
    flw_button: "221",
    theme: "Mejoras 6 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 222,
    avance_proy: 29,
    flw_button: "222",
    theme: "Mejoras 6 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 223,
    avance_proy: 10,
    flw_button: "223",
    theme: "Mejoras 6 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 224,
    avance_proy: 5,
    flw_button: "224",
    theme: "Mejoras 6 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  //---- p2 7 ----------------------------------------------------------------------
  {
    id: 225,
    avance_proy: 17,
    flw_button: "225",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 226,
    avance_proy: 65,
    flw_button: "226",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 227,
    avance_proy: 73,
    flw_button: "227",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 228,
    avance_proy: 92,
    flw_button: "228",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 229,
    avance_proy: 81,
    flw_button: "229",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 230,
    avance_proy: 42,
    flw_button: "230",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 231,
    avance_proy: 56,
    flw_button: "231",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  //---- p2 8 ----------------------------------------------------------------------
  {
    id: 232,
    avance_proy: 58,
    flw_button: "232",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  //---- p2 9 ----------------------------------------------------------------------
  {
    id: 233,
    avance_proy: 87,
    flw_button: "233",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  //---- p3 10 ----------------------------------------------------------------------
  {
    id: 301,
    avance_proy: 43,
    flw_button: "301",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 302,
    avance_proy: 45,
    flw_button: "302",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 303,
    avance_proy: 47,
    flw_button: "303",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 304,
    avance_proy: 76,
    flw_button: "304",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  //---- p3 11 ----------------------------------------------------------------------
  {
    id: 305,
    avance_proy: 88,
    flw_button: "305",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  //---- p3 12 ----------------------------------------------------------------------
  {
    id: 306,
    avance_proy: 99,
    flw_button: "306",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 307,
    avance_proy: 90,
    flw_button: "307",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 308,
    avance_proy: 35,
    flw_button: "308",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 309,
    avance_proy: 44,
    flw_button: "309",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
  {
    id: 310,
    avance_proy: 77,
    flw_button: "310",
    theme: "Mejoras 2 para Electromagnetismo en Transmision a Larga Distancia",
    docs: [["Buanas practicas en Electromagnetismo 2025.pdf"]],
    tasks: [],
  },
];

//
interface docum {
  id: number;
  docu: string;
}
interface tarea {
  id: number;
  task: string;
  date: string;
  advn: number;
}
//let docus:string[] = [];
//let tasks:string[] = [];

//interface MiCompProps {
//  dataBtn?: string;
//}

interface HijoProps {
  activo: boolean;
  datoBtn: string;
  codiPrj: string;
  // Esta prop permite al padre resetear el estado. No en uso aqui
  onActivar: (valor: boolean) => void;
}

//let contenidoADibujar1: React.ReactNode;
let theme = "";

//const FetchDataEdit: React.FC<HijoProps> = ({ activo, datoBtn }) => {
//async function FetchDataEdit({ activo, datoBtn }: HijoProps) {

const FetchDataEdit: React.FC<HijoProps> = ({ activo, datoBtn, codiPrj }) => {
  const [dataDocus, setDataDocus] = useState<docum[]>([]);
  const [dataTasks, setDataTasks] = useState<tarea[]>([]);
  const [progress, setProgress] = useState(0); // Valor inicial 0%
  const [renderFiles, setRenderfiles] = useState(false);
  //
  const [adminUserRole, setAdminUserRole] = useState<boolean>(false);
  const [moderUserRole, setModerUserRole] = useState<boolean>(false);
  const [entyUserStore, setEntyUserStore] = useState<string>("");
  const [textUserStore, setTextUserStore] = useState<string>("");
  const [authUserStore, setAuthUserStore] = useState<string>("");
  const [projectCodemp, setProjectCodemp] = useState<string>("");
  const [documentsButt, setDocumentsButt] = useState<string[]>([]);
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
  //
  const getDocumentsButton = async (codiPrjSel: string, buttonSel: string) => {
    const userStore = localStorage.getItem("username");
    const roleStore = localStorage.getItem("role");
    const entyStore = localStorage.getItem("entity");
    const authStore = localStorage.getItem("token");
    //const panelSel = inputsData.panel;
    //
    if (
      roleStore &&
      entyStore !== null &&
      userStore !== null &&
      authStore !== null
    ) {
      //setTextUserStore(userStore);
      const adm: boolean = roleStore === "admin";
      const mod: boolean = roleStore === "moder";
      setAdminUserRole(adm);
      setModerUserRole(mod);
      setTextUserStore(userStore);
      setEntyUserStore(entyStore);
      setAuthUserStore(authStore);
      //
      const dataButton = {
        buttext: "documents_button",
        entity: entyUserStore,
        userna: textUserStore,
        authen: authUserStore,
        projct: codiPrjSel,
        button: buttonSel,
      };
      console.log("dataButton:", dataButton);
      //
      try {
        const response = await fetch(
          "http://localhost:5055/get_documents_button_react",
          {
            method: "POST",
            body: JSON.stringify(dataButton),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          }
        );
        const documsResp = await response.json();
        //
        if (documsResp.success === "err") {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        //
        const docums = documsResp.msg;
        setDocumentsButt(docums);
        //
        //setUser(data);
      } catch (err: any) {
        //setError(err.message);
        alert("Error al leer documentos del botón...");
        //
      } finally {
        //setLoading(false);
      }
    } else {
      alert("Código de Botón es nulo...revisar");
    }
  };

  //
  //
  useEffect(() => {
    //
    if (activo) {
      console.log("Dato recibido del hijo:", datoBtn);
      // Aquí podrías hacer llamadas a API, actualizar estado, etc.
      // Aquí podrías hacer llamadas a API, actualizar estado, etc.
      // Llama a la función onActivar para resetear el estado en el padre
      // y evitar que el efecto se ejecute cada vez que se renderiza el padre.
      // onActivar(false); // Opcional: resetea el estado en el padre
      //
      console.log("MENSAJE datoBtn del HIJO:", datoBtn);
      const addDataDocus = (newDocu: docum) => {
        // Crea un nuevo array que incluye todos losdatos existentes
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
      console.log("Fetch con Boton recibido:", datoBtn);
      //
      // Filtra con datos del Hijo
      //
      let files = dataFetch.filter(
        (data) => data.flw_button === datoBtn.toString()
      );
      //
      // Fetch al Backend fastApi
      //
      //
      //let files = getDocumentsButton(datoBtn);
      //
      //
      //
      console.log(datoBtn, files);
      //
      if (files.length > 0) {
        setProgress(files[0].avance_proy);
        setDataDocus([]);
        setDataTasks([]);
        //
        // Themes
        //
        theme = files[0].theme;
        //
        // Docs
        //
        console.log("docs:", files[0].docs);
        //const docsNames = Object.entries(dataFiles[0].docs);
        let docnames = files[0].docs;
        if (docnames) {
          for (let i: number = 0; i < docnames.length; i++) {
            //
            addDataDocus({ id: i, docu: docnames[i].toString() });
          }
        }
        console.log("$$$$$$ dataDocus[]:", dataDocus);
        //
        // Tasks
        //
        //const docsTasks = Object.entries(dataFiles[0].tasks);
        let doctasks = files[0].tasks;
        console.log("doctasks:", doctasks);
        if (doctasks) {
          for (let i: number = 0; i < doctasks.length; i++) {
            //
            let tsk = doctasks[i];
            addDataTasks({
              id: i,
              task: tsk[1].toString(),
              date: tsk[0].toString(),
              advn: Number(tsk[2]),
            });
          }
        }
      }
      //
      console.log("##### dataTasks[]:", dataTasks);
      //
      // Despliega 'Files' al hacer Click en 'Buttons'
      //
      setRenderfiles(true);

      if (renderFiles) {
        console.log("RENDER OK...");
      }
    }
  }, [activo, datoBtn]);

  if (!activo) {
    return <p>Presione un botón para ver info.</p>;
  }
  //
  //    <span>{mensajeDeBoton}</span>;
  return (
    <>
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
          <h4>Tareas.</h4>
          <ul>
            {dataTasks.map((tsk) => (
              <li key={tsk.id}>
                <span id="span-tasks">
                  <DisplayCheckBox
                    file={tsk.task}
                    onFileSelect={manejarFileSeleccion}
                  />
                  {tsk.date} <progress value={tsk.advn} max={100}></progress>{" "}
                  {/* El valor indica el progreso actual, max el 100% */}
                  <span> {tsk.advn}%</span> {/* Muestra el porcentaje */}
                </span>
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
          <h4>Lista de Archivos.</h4>
          <ul>
            {" "}
            {dataDocus.map((doc) => (
              <li key={doc.id} id="span-docus">
                <DisplayCheckBox
                  file={doc.docu}
                  onFileSelect={manejarFileSeleccion}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FetchDataEdit;
