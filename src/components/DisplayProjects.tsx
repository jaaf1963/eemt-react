import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ExportCsvTable from "./ExportDataToCsv";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

interface projProps {
  id?: number | undefined;
  codeprj: string;
  project?: string | undefined;
  client?: string | undefined;
  theme?: string | undefined;
  typroj?: string | undefined;
  descrip?: string | undefined;
  observ?: string | undefined;
  advance: string;
  dateini?: string | undefined;
  dateend?: string | undefined;
  quedan?: string | undefined;
}

interface OptionType {
  value: string;
  label: string;
}

const ProjectsDisplay: React.FC = () => {
  const [proyectQ, setProyectQ] = useState<string | null>(null);
  const [clienteQ, setClienteQ] = useState<string | null>(null);
  const [tiproyeQ, setTiproyeQ] = useState<string | null>(null);
  const [anoCom1Q, setAnoCom1Q] = useState<number>(
    new Date().getFullYear() - 1,
  );
  const [anoCom2Q, setAnoCom2Q] = useState<number>(new Date().getFullYear());
  const [segfinProjG, setSegfinProjG] = useState<OptionType[]>([]);
  const [segfinClieG, setSegfinClieG] = useState<OptionType[]>([]);
  const [segfinTipoG, setSegfinTipoG] = useState<OptionType[]>([]);
  const [projectsGet, setProjectsGet] = useState<projProps[]>([]);
  const [selectedProj, setSelectedProj] = useState<string>("");
  const [selectedClie, setSelectedClie] = useState<string>("");
  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [estaVisible, setEstaVisible] = useState<boolean>(false);
  //const [isLoading, setIsLoading] = React.useState(true);
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

  // Estilo para el efecto tenue (puedes usar CSS o Tailwind)
  const estiloGrilla = {
    opacity: estaVisible ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
  };

  //
  const getProjects = async () => {
    const dataProject = {
      srhtext: "search_prj",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      codprj: proyectQ,
      client: clienteQ,
      tiproy: tiproyeQ,
      anoco1: anoCom1Q,
      anoco2: anoCom2Q,
    };
    //
    const API_URL_BACKEND = `${ubihost}/search_projects_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_projects_react";
    //
    try {
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataProject),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      const projectsResp = await response.json();
      //
      if (projectsResp.success === "err") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Data ClientsGet for map() select
      const projects = projectsResp.msg;
      if (projects) {
        //
        setProjectsGet(projects);
        setEstaVisible(true);
      }
      //
    } catch (err: any) {
      //setError(err.message);
      alert("Error al hacer filtro de proyectos.");
      //
    } finally {
      //setLoading(false);
    }
  };
  //
  // Delete Project
  //
  const handleDeleteProject = async (projectSelect: string) => {
    //
    if (projectSelect !== "") {
      //
      if (
        window.confirm(
          `¿Estás seguro de que quieres eliminar proyecto <${projectSelect}>?`,
        )
      ) {
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
              instance: "delete_prj",
              entity: entyUserStore,
              userna: textUserStore,
              authen: authUserStore,
              prjdel: projectSelect,
            };
            //
            const API_URL_BACKEND = `${ubihost}/delete_project_react`;
            //const API_URL_BACKEND ="http://localhost:5055/delete_project_react";
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
              alert("Error al Eliminar Proyecto.");
              //
            } finally {
              //setIsLoading(false);
              console.log("");
            }
          } else {
            alert("NO tiene credenciales para Eliminar Proyectos.");
          }
        } else {
          alert("No se advierte Proyecto...hacer Login");
        }
      }
    }
  };
  //
  // Función para obtener el color basado en el texto
  //
  const getTextColor = (texto: string): string => {
    switch (texto) {
      case "adjudicado":
        return "tomato";
      case "urgente":
        return "red";
      case "normal":
        return "black";
      default:
        return "gray";
    }
  };
  //
  // Lee todos los proyectos para el popoup
  //
  const getSegfinProjects = async () => {
    const dataSegfin = {
      srhtext: "search_segfinProj",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
    };
    //
    const API_URL_BACKEND = `${ubihost}/search_projects_segfin_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_segfin_projects_react";
    //
    try {
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataSegfin),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      const segfinProjResp = await response.json();
      //
      if (segfinProjResp.success === "err") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Data segfinsGet for map() select
      const segfinProj = segfinProjResp.msg;
      if (segfinProj) {
        //
        setSegfinProjG(segfinProj["segProj"]);
        setSegfinClieG(segfinProj["segClie"]);
        setSegfinTipoG(segfinProj["segTipo"]);
      }
      //
    } catch (err: any) {
      //setError(err.message);
      alert("Error al leer lista de proyectos.");
      //
    } finally {
      //setLoading(false);
    }
  };
  //
  //
  const handleProyecto = (event: React.ChangeEvent<HTMLDataElement>) => {
    const item = event.target.value;
    //
    salvaProj(item);
    //
    //getSegfins();
  };
  const salvaProj = (itm: string) => {
    setProyectQ(itm);
    setSelectedProj(itm);
  };
  //
  const handleCliente = (event: React.ChangeEvent<HTMLDataElement>) => {
    const item = event.target.value;
    //
    salvaClie(item);
    //
  };
  const salvaClie = (itm: string) => {
    setClienteQ(itm);
    setSelectedClie(itm);
  };
  //
  const handleTiproyect = (event: React.ChangeEvent<HTMLDataElement>) => {
    const item = event.target.value;
    //
    salvaTipo(item);
    //
  };
  const salvaTipo = (itm: string) => {
    setTiproyeQ(itm);
    setSelectedTipo(itm);
  };
  //
  const handleAnoComer1 = (event: React.ChangeEvent<HTMLDataElement>) => {
    const item = event.target.value;
    //
    salvaAno1(Number(item));
    //
  };
  const salvaAno1 = (itm: number) => {
    setAnoCom1Q(itm);
  };
  //
  const handleAnoComer2 = (event: React.ChangeEvent<HTMLDataElement>) => {
    const item = event.target.value;
    //
    salvaAno2(Number(item));
    //
  };
  const salvaAno2 = (itm: number) => {
    setAnoCom2Q(itm);
  };
  //
  //
  useEffect(() => {
    //
    if (proyectQ === null) salvaProj("");
    if (clienteQ === null) salvaClie("");
    if (tiproyeQ === null) salvaTipo("");
    //
    if (proyectQ !== null && clienteQ !== null && tiproyeQ !== null) {
      getProjects();
    }
    //
  }, [proyectQ, clienteQ, tiproyeQ, anoCom1Q, anoCom2Q]);
  //
  //
  useEffect(() => {
    //
    getSegfinProjects();
    //
  }, []);
  //
  //
  return (
    <div>
      <div style={{ display: "flex" }}>
        <p
          style={{
            fontStyle: "italic",
            fontSize: "18px",
            textAlign: "center",
            width: "400px",
            marginRight: "20px",
            color: "yellow",
            backgroundColor: "blue",
            borderRadius: "9px",
            boxShadow:
              "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff",
          }}
        >
          Información técnica de proyectos
        </p>

        <div className="input-relieve">
          <label htmlFor="proj-select"></label>
          {/* The value prop makes it a controlled component */}
          <select
            id="proj-select"
            value={selectedProj}
            onChange={handleProyecto}
            style={{
              marginLeft: "10px",
              borderRadius: "5px",
              borderWidth: "0.5px",
            }}
          >
            <option value="" disabled hidden>
              Proyecto
            </option>
            {segfinProjG.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="clie-select"></label>
          {/* The value prop makes it a controlled component */}
          <select
            id="clie-select"
            value={selectedClie}
            onChange={handleCliente}
            style={{
              marginLeft: "10px",
              borderRadius: "5px",
              borderWidth: "0.5px",
            }}
          >
            <option value="" disabled hidden>
              Cliente
            </option>
            {segfinClieG.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="tipo-select"></label>
          {/* The value prop makes it a controlled component */}
          <select
            id="tipo-select"
            value={selectedTipo}
            onChange={handleTiproyect}
            style={{
              marginLeft: "10px",
              borderRadius: "5px",
              borderWidth: "0.5px",
            }}
          >
            <option value="" disabled hidden>
              Tipo
            </option>
            {segfinTipoG.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="2020"
            max="2099"
            value={anoCom1Q}
            placeholder="año 1"
            onChange={handleAnoComer1}
            style={{
              marginLeft: "10px",
              borderRadius: "5px",
              borderWidth: "0.5px",
            }}
          />
          <input
            type="number"
            min="2020"
            max="2099"
            value={anoCom2Q}
            placeholder="año 2"
            onChange={handleAnoComer2}
            style={{
              marginLeft: "10px",
              borderRadius: "5px",
              borderWidth: "0.5px",
            }}
          />

          <ExportCsvTable data={projectsGet} filename="eemt_Proyectos" />
        </div>
      </div>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <div style={estiloGrilla}>
          {/* Renderizado condicional: solo mapea si está visible para optimizar */}
          {estaVisible && (
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr className="row-head">
                  <th
                    style={{
                      width: "85px",
                      marginLeft: "1px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    {" "}
                    Acciones
                  </th>
                  <th
                    style={{
                      width: "90px",
                      marginLeft: "5px",
                      textAlign: "revert-layer",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Proyecto
                  </th>
                  <th
                    style={{
                      width: "150px",
                      marginLeft: "1px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Cliente
                  </th>
                  <th
                    style={{
                      width: "150px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Tema
                  </th>
                  <th
                    style={{
                      width: "180px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Descripción<noscript></noscript>
                  </th>
                  <th
                    style={{
                      width: "220px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Observación
                  </th>
                  <th
                    style={{
                      width: "100px",
                      textAlign: "center",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Avance
                  </th>
                  <th
                    style={{
                      width: "100px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Fecha-Ini
                  </th>
                  <th
                    style={{
                      width: "100px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Fecha-Fin
                  </th>
                  <th
                    style={{
                      width: "60px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Quenan
                  </th>
                  <th
                    style={{
                      width: "60px",
                      textAlign: "center",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Tipo
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectsGet.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "row-even" : "row-odd"}
                  >
                    <td>
                      <button
                        onClick={() => handleDeleteProject(item.codeprj)}
                        className="btn-delete-user"
                        style={{
                          width: "70px",
                          height: "25px",
                          border: "4px",
                          color: "tomato",
                          fontSize: "13px",
                        }}
                      >
                        Eliminar
                      </button>
                      {/*<button
                      onClick={() => handleUpdateUser(item.usern)}
                      className="btn-modifi-user"
                      style={{
                        width: "50px",
                        height: "25px",
                        border: "4px",
                        color: "blue",
                      }}
                    >
                      Modif
                    </button>*/}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "brown",
                      }}
                    >
                      {item.codeprj}
                    </td>
                    <td style={{ fontSize: "13px" }}>{item.client}</td>
                    <td style={{ fontSize: "13px" }}>{item.theme}</td>
                    <td style={{ color: "blue", fontSize: "12px" }}>
                      {item.descrip}
                    </td>
                    <td style={{ color: "brown", fontSize: "12px" }}>
                      {item.observ}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        fontWeight: "bold",
                        color: getTextColor(item.advance),
                      }}
                    >
                      {item.advance}
                    </td>
                    <td style={{ fontSize: "14px" }}>{item.dateini}</td>
                    <td style={{ fontSize: "14px" }}>{item.dateend}</td>
                    <td
                      style={{
                        fontSize: "13px",
                        textAlign: "right",
                        paddingRight: "5px",
                        color: "brown",
                      }}
                    >
                      {item.quedan}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                      }}
                    >
                      {item.typroj}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* Alternativa: mostrar siempre pero con estilos que lo "ocultan" */}
          {/* {!estaVisible && <p>No hay datos</p>} */}
        </div>
      </div>
    </div>
  );
};

export default ProjectsDisplay;
