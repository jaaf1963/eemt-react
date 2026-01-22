import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BtnsDymCall from "./BtnsDynCall";
import FetchDataEdit from "./DynFetchEdit";
import UploadFilesEdit from "./UploadFilesEdit";
import RadioButtonGroup from "./RadioButtons";
import HistoryDisplay from "./HistoryDisplay";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

const panels = [
  {
    pnl: "1",
    siz: "265px",
    hgh: "600px",
    shd: "hsla(60, 41%, 93%, 1.00)",
    tit: "CEM Y OTROS",
  },
  {
    pnl: "2",
    siz: "740px",
    hgh: "600px",
    shd: "hsla(60, 41%, 93%, 1.00)",
    tit: "REQUISITOS PES",
  },
  {
    pnl: "3",
    siz: "265px",
    hgh: "600px",
    shd: "hsla(60, 41%, 93%, 1.00)",
    tit: "REQUISITOS EO",
  },
];

const options = [
  //{ label: "Estudio", value: "estudio" },
  { label: "Iteración", value: "iteracion" },
  { label: "Tarea", value: "tarea" },
  { label: "Reemplazo", value: "reemplazo" },
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

const ClientButtEdit: React.FC<ComponenteProps> = () => {
  const [selecDateIni, setSelecDateIni] = useState<Date | null>(null);
  const [selecDateEnd, setSelecDateEnd] = useState<Date | null>(null);
  const [mensajeDesdeCall, setMensajeDesdeCall] = useState<string>("");
  const [existDocums, setExistDocums] = useState<docsEx[]>([]);
  const [renderButton, setRenderButton] = useState<boolean>(true);
  //const [mensajeDesdePadre, setMensajeDesdePadre] = useState<string>("");
  const [projectsGet, setProjectsGet] = useState<projProps[]>([]);
  const [activarFetch, setActivarFetch] = useState<boolean>(false);
  const [activarHist, setActivarHist] = useState<boolean>(false);
  const [datoBtnFetch, setDatoBtnFetch] = useState<string>("");
  const [codiPrjFetch, setCodiPrjFetch] = useState<string>("");
  const [selecProject, setSelecProject] = useState<string>("");
  const [selecPrjCode, setSelecPrjCode] = useState<string>("");
  const [selecPrjClie, setSelecPrjClie] = useState<string>("");
  const [selecOptRadi, setSelecOptRadi] = useState<string>("");
  const [selecDocument, setSelecDocument] = useState<string>("");
  //const [ubihost, setUbihost] = useState<string>("");
  //
  const [advancDoc, setAdvancDoc] = useState<string>("");
  const [authorDoc, setAuthorDoc] = useState<string>("");
  const [observDoc, setObservDoc] = useState<string>("");
  const [taskssDoc, setTaskssDoc] = useState<string>("");
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
    //console.log("Opcion seleccionada:", value);
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
    selPrjClie: string,
  ) => {
    //console.log("*", selPrjCode, selProject, selPrjClie);
    if (selPrjCode !== "") {
      setSelecPrjCode(selPrjCode);
    }
    if (selProject !== "") {
      setSelecProject(selProject);
    }
    if (selPrjClie !== "") {
      setSelecPrjClie(selPrjClie);
    }
    //console.log("**", selecPrjCode, selecProject, selecPrjClie);
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
      ////setCodiPrjHijo(projectSel);
      //setActivarFetch(true);
      if (selPrjCode !== "") {
        setSelecProject(selPrjCode);
      }
      activarFunctionFetch(true);
    }
  };
  //
  // Funcion para manejar el 'typeDoc'
  const handleOptRadioChange = (value: string) => {
    //console.log("Option radiobutton:", value);
    setSelecOptRadi(value);
  };
  //
  // Funcion para manejar el cambio de las 'tareas'
  const handleChangeTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskssDoc(e.target.value);
  };
  //
  // Funcion para manejar el cambio de la 'Observacion'
  const handleChangeObserv = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setObservDoc(e.target.value);
    }
  };
  //
  // Funcion para manejar el cambio del 'Author'
  const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorDoc(e.target.value);
  };
  //
  // Funcion para manejar el pje de 'Avance'
  const handleChangeAdvance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdvancDoc(e.target.value);
  };
  //
  // Maneja los cambios del select box 'projects'
  const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //console.log("Opción seleccionada:", event.target.value);
    const projSel = event.target.value;
    //console.log(projSel);
    //
    if (projSel !== "") {
      setCodiPrjFetch(projSel);
    }
    /*
    split_str.forEach((str, index) => {
      console.log(`prj: ${index + 1}: ${str}`);
    });
    */
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
  //
  // Maneja los cambios del select box 'projects'
  const handleSelectDocument = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    //console.log("Opción seleccionada:", event.target.value);
    const documSel = event.target.value;
    //console.log(documSel);
    //
    if (documSel !== "" && documSel.slice(0, 3) !== "---") {
      setSelecDocument(documSel);
      //
      handleOptRadioChange("reemplazo");
      //
      //setSelecOptRadi("reemplazo");
      //console.log("Option radiobutton:", selecOptRadi);
    } else {
      //
      if (documSel.slice(0, 5) === "--- N") {
        setSelecDocument("");
      }
    }
  };
  //
  // Funcion de callback para recibir los documentos leídos
  const handleDocumentExist = (updaDocExist: docsEx[]) => {
    // Actualiza el estado del padre con la nueva lista
    if (updaDocExist) {
      setExistDocums(updaDocExist);
    }
    //console.log(updaDocExist);
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
      //console.log(projSel);
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        const dataProj = {
          srhtext: "search_prj",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
          projct: projSel,
        };
        const API_URL_BACKEND = `${ubihost}/search_projects_react`;
        //const API_URL_BACKEND = "http://localhost:5055/search_projects_react";
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
  //
  /*
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
  */
  //
  //---- Lee Hisory proyect
  //
  useEffect(() => {
    //
    // Esta función se pasará al hijo 'BtnsDynCall' como props
    const manejarDatoDesdeCall = (btnSel: string) => {
      // Llamada a funcion pata activar los 'useState()'
      activacionCompFetch(btnSel, selPrjCode);
      // Recibe mensaje de BtnsDymCall
      setMensajeDesdeCall(btnSel);
      //
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
      //setActivarFetch(false);
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
  //      <SearchBarProject enviarProyectoAlPadre={recibirProyectoHijo} />
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
      <strong>Datos de documentos a subir:</strong>
      <div style={{ display: "flex", color: "brown", fontStyle: "italic" }}>
        <RadioButtonGroup
          options={options}
          onOptionChange={handleOptRadioChange}
          defaultValue={selecOptRadi}
        />
      </div>
      <div>
        <label className="input-label-upload" htmlFor="observ">
          Descripción de la tarea {""}
        </label>
        <input
          type="text"
          id="tasktext"
          name="tasktext"
          value={taskssDoc}
          onChange={handleChangeTasks}
          className="input-field-upload"
        />
        <span style={{ fontSize: "small", color: "gray" }}> 100 cars.</span>
      </div>
      <div>
        <label className="input-label-upload" htmlFor="observ">
          Observación / Estado de la tarea{" "}
        </label>
        <textarea
          id="observtext"
          name="observtext"
          value={observDoc}
          onChange={handleChangeObserv}
          className="input-textarea-upload"
          //rows={4}
          //cols={40}
        ></textarea>
        <span style={{ fontSize: "small", color: "gray" }}> 500 cars.</span>
      </div>
      <div>
        <label className="input-label-upload" htmlFor="author">
          Autor del documento{""}
        </label>
        <input
          type="text"
          id="authortext"
          name="authortext"
          value={authorDoc}
          onChange={handleChangeAuthor}
          //required
          className="input-field-upload"
        />
        <span style={{ fontSize: "small", color: "gray" }}> 30 cars.</span>
      </div>
      <div>
        <label className="input-label-upload" htmlFor="advan">
          Avance del proyecto{""}
        </label>
        <input
          type="number"
          id="advantext"
          min="0"
          max="100"
          name="advantext"
          value={advancDoc}
          onChange={handleChangeAdvance}
          //required
          className="input-field-upload"
        />
        <span style={{ fontSize: "small", color: "gray" }}> 0%-100%</span>
      </div>
      <label className="label-date-proj">
        Inicio proyecto
        <DatePicker
          className="picker-date-proj"
          selected={selecDateIni}
          // Actualiza el estado con la nueva fecha
          onChange={(date) => setSelecDateIni(date)}
          dateFormat="dd/MM/yyyy"
          isClearable
          placeholderText="Fecha inicio"
        />
      </label>{" "}
      <label className="label-date-proj">
        Término proyecto
        <DatePicker
          className="picker-date-proj"
          selected={selecDateEnd}
          // Actualiza el estado con la nueva fecha
          onChange={(date) => setSelecDateEnd(date)}
          dateFormat="dd/MM/yyyy"
          isClearable
          placeholderText="Fecha limite"
        />
      </label>
      <p>...</p>
      <strong>Selección de documentos:</strong>
      <div>
        <label className="input-label-exist" htmlFor="document">
          Existente{" "}
        </label>
        <input
          type="text"
          id="document"
          name="document"
          value={selecDocument}
          onChange={handleChange}
          required
          className="input-text-exist"
        />{" "}
        <span></span>
        <select
          onChange={handleSelectDocument}
          style={{ marginInlineStart: "8px", width: "20px" }}
        >
          <option value="">--- Select Document ---</option>{" "}
          {/* Opcion por defecto */}
          {existDocums.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <UploadFilesEdit
        btnSelEdit={datoBtnFetch}
        codSelEdit={selPrjCode}
        prjSelEdit={selProject}
        cliSelEdit={selPrjClie}
        typedocums={selecOptRadi}
        taskssdocs={taskssDoc}
        observdocs={observDoc}
        authordocs={authorDoc}
        advancdocs={advancDoc}
        dateindocs={selecDateIni}
        datenddocs={selecDateEnd}
        existsdocs={selecDocument}
      />
      <p>...</p>
      <strong>Información almacenada:</strong>
      {activarFetch && (
        <FetchDataEdit
          activarFetch={activarFetch}
          datoBtnFetch={datoBtnFetch}
          codiPrjFetch={selecPrjCode}
          cliePrjFetch={selecPrjClie}
          onActivar={setActivarFetch}
          onDocusEx={handleDocumentExist}
        />
      )}
      {activarHist && (
        <HistoryDisplay
          activarFetch={activarFetch}
          datoBtnFetch={datoBtnFetch}
          codiPrjFetch={selecPrjCode}
          cliePrjFetch={selecPrjClie}
        />
      )}
    </>
  );
};

export default ClientButtEdit;
