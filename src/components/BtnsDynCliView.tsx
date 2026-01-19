import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BtnsDymCall from "./BtnsDynCall";
import FetchDataView from "./DynFetchView";
import HistoryDispView from "./HistoryDispView";

const panels = [
  {
    pnl: "1",
    siz: "265px",
    hgh: "600px",
    shd: "hsla(184, 73%, 53%, 1.00)",
    tit: "CEM Y OTROS",
  },
  {
    pnl: "2",
    siz: "740px",
    hgh: "600px",
    shd: "hsla(184, 73%, 53%, 1.00)",
    tit: "REQUISITOS PES",
  },
  {
    pnl: "3",
    siz: "265px",
    hgh: "600px",
    shd: "hsla(184, 73%, 53%, 1.00)",
    tit: "REQUISITOS EO",
  },
];

let selPrjCode: string = "";
let selProject: string = "";
let selPrjClie: string = "";

interface projProps {
  id?: number | undefined;
  codeprj?: string | undefined;
  project?: string | undefined;
  company?: string | undefined;
  theme?: string | undefined;
  sigla?: string | undefined;
  descrip?: string | undefined;
  observ?: string | undefined;
  advance?: string | undefined;
  dateini?: string | undefined;
  dateend?: string | undefined;
}

interface docsEx {
  id: number;
  num: number;
  name: string;
}

let contenidoADibujar1: React.ReactNode;
interface ComponenteProps {
  //projectSel: string;
}

const ClientButtView: React.FC<ComponenteProps> = () => {
  const [mensajeDesdeCall, setMensajeDesdeCall] = useState<string>("");
  const [existDocums, setExistDocums] = useState<docsEx[]>([]);
  const [renderButton, setRenderButton] = useState<boolean>(true);
  const [projectsGet, setProjectsGet] = useState<projProps[]>([]);
  const [activarFetch, setActivarFetch] = useState<boolean>(false);
  const [activarHist, setActivarHist] = useState<boolean>(false);
  const [datoBtnFetch, setDatoBtnFetch] = useState<string>("");
  const [codiPrjFetch, setCodiPrjFetch] = useState<string>("");
  const [selecProject, setSelecProject] = useState<string>("");
  const [selecPrjCode, setSelecPrjCode] = useState<string>("");
  const [selecPrjClie, setSelecPrjClie] = useState<string>("");
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
  // Funcion para activar funcion FetchData
  //
  const activarFunctionFetch = (value: boolean) => {
    if (activarFetch) {
      setActivarFetch(false);
    } else {
      setActivarFetch(value);
    }
  };
  //
  // Almacena seleccion en estados
  //
  const setProjectData = (
    selPrjCode: string,
    selProject: string,
    selPrjClie: string
  ) => {
    if (selPrjCode !== "") {
      setSelecPrjCode(selPrjCode);
    }
    if (selProject !== "") {
      setSelecProject(selProject);
    }
    if (selPrjClie !== "") {
      setSelecPrjClie(selPrjClie);
    }
  };
  //
  // Funcion Activacion del Fetch en 'DynFetchEdit' y pasar datos
  //
  const activacionCompFetch = (btnSel: string, prjSel: string) => {
    if (btnSel !== "") {
      setDatoBtnFetch(btnSel);
    }
    //
    if (btnSel !== "" && prjSel !== "") {
      if (selPrjCode !== "") {
        setSelecProject(selPrjCode);
      }
      activarFunctionFetch(true);
    }
  };
  //
  // Maneja los cambios del select box 'projects'
  const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projSel = event.target.value;
    //
    if (projSel !== "") {
      setCodiPrjFetch(projSel);
    }
    //
    const split_str = projSel.split("|");
    selPrjCode = split_str[0].trim();
    selProject = split_str[1].trim();
    selPrjClie = split_str[2].trim();
    //
    setProjectData(selPrjCode, selProject, selPrjClie);
    //
    if (selPrjCode !== "") {
      setSelecProject(selPrjCode);
      activacionCompFetch(datoBtnFetch, selPrjCode);
    }
    //
  };
  //
  // Maneja los cambios del input project
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let eee = e.target.value;
  };
  //
  //---- Lee buttons segun grupoSel
  //
  // Funcion de callback para recibir los documentos leídos
  const handleDocumentExist = (updaDocExist: docsEx[]) => {
    // Actualiza el estado del padre con la nueva lista
    if (updaDocExist) {
      setExistDocums(updaDocExist);
    }
  };
  //
  //
  const getProjects = async (projSel: string) => {
    if (
      textUserStore !== null &&
      entyUserStore !== null &&
      authUserStore !== null
      // && projSel !== ""
    ) {
      if (
        textRoleStore === "admin" ||
        textRoleStore === "edit" ||
        textRoleStore === "view"
      ) {
        const dataProj = {
          srhtext: "search_prj",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
          projct: projSel,
        };
        //const API_URL_BACKEND = `${ubihost}/search_projects_react`;
        const API_URL_BACKEND = "http://localhost:5055/search_projects_react";
        //
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(dataProj),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          const projResp = await response.json();
          //
          if (projResp.success === "err") {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          // Data ProjectsGet for map() select
          const projGets = projResp.msg;
          setProjectsGet(projGets);
          //
        } catch (err: any) {
          //setError(err.message);
          alert("Error al leer Proyectos...");
          //
        } finally {
          //setLoading(false);
        }
      } else {
        alert("Código de Proyecto es nulo...revisar");
      }
    }
  };
  //

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
  //---- Lee Hisory proyect
  //
  useEffect(() => {
    //
    // Esta funcion se pasara al hijo 'BtnsDynCall' como props
    const manejarDatoDesdeCall = (btnSel: string) => {
      // Llamada a funcion pata activar los 'useState()'
      activacionCompFetch(btnSel, selPrjCode);
      // Recibe mensaje de BtnsDymCall
      setMensajeDesdeCall(btnSel);
    };
    //
    // Despliega 'Buttons' al inicio
    //
    if (renderButton) {
      //
      contenidoADibujar1 = (
        <div className="cont" style={{ display: "flex" }}>
          {panels.map((panel) => (
            <section
              key={panel.pnl}
              className={panel.pnl}
              style={{
                padding: "3px",
              }}
            >
              <BtnsDymCall
                pnl={panel.pnl}
                siz={panel.siz}
                hgh={panel.hgh}
                shd={panel.shd}
                tit={panel.tit}
                enviarDatoACliEdit={manejarDatoDesdeCall}
              />
            </section>
          ))}
        </div>
      );
      //
      setRenderButton(false);
      setActivarHist(true);
    }
    //
    <span>{mensajeDesdeCall}</span>;
    setMensajeDesdeCall("");
    //
    getProjects(" ");
    //
  }, [mensajeDesdeCall]);
  //
  //
  return (
    <>
      <span style={{ fontStyle: "-moz-initial", fontSize: "20px" }}>
        {" "}
        Edit{" "}
      </span>
      <div>
        <label className="input-label-proj" htmlFor="project">
          Project{" "}
        </label>
        <input
          type="text"
          id="project"
          name="project"
          value={selecProject}
          onChange={handleChange}
          required
          className="input-text-proj"
        />
        {""}
        <span></span>
        <select
          onChange={handleSelectProject}
          style={{ marginInlineStart: "8px", width: "20px" }}
        >
          <option value="">--- Select Project ---</option>{" "}
          {/* Opcion por defecto */}
          {projectsGet.map((option) => (
            <option
              key={option.id}
              value={
                option.codeprj + " | " + option.project + " | " + option.company
              }
            >
              {option.codeprj} {option.project} {option.company}
            </option>
          ))}
        </select>
      </div>
      {contenidoADibujar1}
      Proyecto: <strong>{codiPrjFetch}</strong>
      {" / "}
      Botón: <strong>{datoBtnFetch}</strong>
      <p>...</p>
      <strong>Información almacenada:</strong>
      {activarFetch && (
        <FetchDataView
          activarFetch={activarFetch}
          datoBtnFetch={datoBtnFetch}
          codiPrjFetch={selecPrjCode}
          cliePrjFetch={selecPrjClie}
          onActivar={setActivarFetch}
          onDocusEx={handleDocumentExist}
        />
      )}
      {activarHist && (
        <HistoryDispView
          activarFetch={activarFetch}
          datoBtnFetch={datoBtnFetch}
          codiPrjFetch={selecPrjCode}
          cliePrjFetch={selecPrjClie}
        />
      )}
    </>
  );
};

export default ClientButtView;
