import React, { useEffect, useState } from "react";
import BtnsDynCall from "./BtnsDynCall";
import FetchDataView from "./DynFetchView";
//import UploadFilesEdit from "./UploadFilesEdit";
//import RadioButtonGroup from "./RadioButtons";

const panels = [
  {
    pnl: "1",
    siz: "265px",
    hgh: "600px",
    shd: "hsla(184, 73%, 53%, 1.00)",
    tit: "AREA COMERCIAL",
  },
  {
    pnl: "2",
    siz: "550px",
    hgh: "600px",
    shd: "hsla(184, 73%, 53%, 1.00)",
    tit: "AREA ESTUDIOS",
  },
  {
    pnl: "3",
    siz: "265px",
    hgh: "600px",
    shd: "hsla(184, 73%, 53%, 1.00)",
    tit: "AREA ENSAYOS",
  },
];

let selPrjCode: string = "";
let selProject: string = "";
let selPrjClie: string = "";

interface projProps {
  id: number | undefined;
  name?: string | undefined;
  code?: string | undefined;
  client?: string | undefined;
}

interface titleProps {
  id: number | undefined;
  name?: string | undefined;
  code?: string | undefined;
  client?: string | undefined;
}

let contenidoADibujar1: React.ReactNode;
interface ComponenteProps {
  //projectSel: string;
}

const ClientButtEdit: React.FC<ComponenteProps> = () => {
  const [mensajeDesdeCall, setMensajeDesdeCall] = useState<string>("");
  const [renderButton, setRenderButton] = useState(true);
  //const [mensajeDesdePadre, setMensajeDesdePadre] = useState<string>("");
  const [titlesGet, setTitlesGet] = useState<titleProps[]>([]);
  const [projectsGet, setProjectsGet] = useState<projProps[]>([]);
  const [activarFetch, setActivarFetch] = useState<boolean>(false);
  const [datoBtnFetch, setDatoBtnFetch] = useState<string>("");
  const [codiPrjFetch, setCodiPrjFetch] = useState<string>("");
  const [selecProject, setSelecProject] = useState<string>("");
  const [selecPrjCode, setSelecPrjCode] = useState<string>("");
  const [selecPrjClie, setSelecPrjClie] = useState<string>("");
  const [selecOptRadi, setSelecOptRadi] = useState("");
  const [error, setError] = useState<string | null>(null);
  //
  const [textRoleStore, setTextRoleStore] = useState(() => {
    const roleStore = localStorage.getItem("role");
    if (roleStore) {
      return roleStore;
    }
    return "";
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
  const setProjectData = (
    selPrjCode: string,
    selProject: string,
    selPrjClie: string
  ) => {
    console.log("*", selPrjCode, selProject, selPrjClie);
    if (selPrjCode !== "") {
      setSelecPrjCode(selPrjCode);
    }
    if (selProject !== "") {
      setSelecProject(selProject);
    }
    if (selPrjClie !== "") {
      setSelecPrjClie(selPrjClie);
    }
    console.log("**", selecPrjCode, selecProject, selecPrjClie);
  };
  //
  // Funcion Activacion del Fetch y pasar datos
  const activacionCompFetch = (btnSel: string, prjSel: string) => {
    setDatoBtnFetch(btnSel);
    //
    if (btnSel !== "" && prjSel !== "") {
      setActivarFetch(true);
      //setCodiPrjHijo(projectSel);
    }
  };
  //
  // Maneja los cambios del select box projects
  const handleSelectProject = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Opción seleccionada:", event.target.value);
    const projSel = event.target.value;
    console.log(projSel);
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
    console.log("codePrj selecc:", selPrjCode);
    console.log("project selecc:", selProject);
    console.log("cliePrj selecc:", selPrjClie);
    //
  };
  //
  // Maneja los cambios del input project
  const handleChangeProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    let eee = e.target.value;
  };
  //
  //---- Lee panels titles
  //
  const getTitlesPanel = async () => {
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
        const dataPanel = {
          instance: "titles_panel",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
        };
        const API_URL_BACKEND =
          "http://localhost:5055/search_titlespanel_react";
        //
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(dataPanel),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          const titlesResp = await response.json();
          //
          if (titlesResp.success === "err") {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          // Data ProjectsGet for map() select
          const titlesGets = titlesResp.msg;
          setTitlesGet(titlesGets);
          console.log("titlesGet:", titlesGet);
          //
        } catch (err: any) {
          //setError(err.message);
          alert("Error al leer Titulos de panel...");
          //
        } finally {
          //setLoading(false);
        }
      } else {
        alert("Sin privilegios para leer datos.");
      }
    }
  };
  //
  //---- Lee buttons segun grupoSel
  //
  const getProjects = async (projSel: string) => {
    if (
      textUserStore !== null &&
      entyUserStore !== null &&
      authUserStore !== null
      // && projSel !== ""
    ) {
      console.log(projSel);
      if (
        textRoleStore === "admin" ||
        textRoleStore === "edit" ||
        textRoleStore === "view"
      ) {
        const dataProj = {
          srhtext: "projects",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
          projct: projSel,
        };
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
          console.log(projectsGet);
          //
        } catch (err: any) {
          //setError(err.message);
          alert("Error al leer Proyectos...");
          //
        } finally {
          //setLoading(false);
        }
      } else {
        alert("Sin privilegios para modificar datos.");
      }
    }
  };
  //
  //
  useEffect(() => {
    //
    getTitlesPanel();
    //
    // Esta función se pasará al hijo 'BtnsDynCall' como props
    const manejarDatoDesdeCall = (btnSel: string) => {
      console.log("manejaDatoDesdeCall", btnSel);
      // Llamada a funcion pata activar los 'useState()'
      activacionCompFetch(btnSel, selPrjCode);
      // Recibe mensaje de BtnsDymCall
      setMensajeDesdeCall(btnSel);
      //
      // Filtra con datos del Hijo
      //console.log("Button Hijo:", btnSel, dataTable[0].buttName);
    };
    //
    // Despliega 'Bouttons' al inicio
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
              <BtnsDynCall
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
      setRenderButton(false);
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
      <span style={{ fontStyle: "-moz-initial", fontSize: "20px" }}>View </span>
      <div>
        <label className="input-label-proj" htmlFor="project">
          Project{" "}
        </label>
        <input
          type="text"
          id="project"
          name="project"
          value={selecProject}
          onChange={handleChangeProject}
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
              value={option.code + " | " + option.name + " | " + option.client}
            >
              {option.code} {option.name}
            </option>
          ))}
        </select>
      </div>
      {contenidoADibujar1}
      Proyecto: <strong>{codiPrjFetch}</strong>
      {" / "}
      Botón: <strong>{datoBtnFetch}</strong>
      <p>...</p>
      <strong>Información almacenada.</strong>
      {activarFetch && (
        <FetchDataView
          activarFetch={activarFetch}
          datoBtnFetch={datoBtnFetch}
          codiPrjFetch={selecPrjCode}
          cliePrjFetch={selecPrjClie}
          onActivar={setActivarFetch}
        />
      )}
    </>
  );
};

export default ClientButtEdit;
