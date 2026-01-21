import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
interface projProps {
  id?: number | undefined;
  codeprj: string;
  project?: string | undefined;
  company?: string | undefined;
  theme?: string | undefined;
  sigla?: string | undefined;
  descrip?: string | undefined;
  observ?: string | undefined;
  advance: string;
  dateini?: string | undefined;
  dateend?: string | undefined;
  quedan?: string | undefined;
}

const ProjectsDisplay: React.FC = () => {
  const [projectsGet, setProjectsGet] = useState<projProps[]>([]);
  const [ubihost, setUbihost] = useState<string>("");
  const [estaVisible, setEstaVisible] = useState<boolean>(false);
  //const [isLoading, setIsLoading] = React.useState(true);
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

  // Estilo para el efecto tenue (puedes usar CSS o Tailwind)
  const estiloGrilla = {
    opacity: estaVisible ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
    //display: "block",
    // O si usas Tailwind:
    // className={`transition-opacity duration-500 ${estaVisible ? 'opacity-100' : 'opacity-0'}`}
  };

  //
  const getProjects = async () => {
    const dataProject = {
      srhtext: "search_prj",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      //proct: clientSel,
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
      if (projectsGet) {
        //
        setProjectsGet(projects);
        setEstaVisible(true);
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
  // Delete Project
  //
  const handleDeleteProject = async (projectSelect: string) => {
    //
    //alert(userSelect);
    if (projectSelect !== "") {
      //
      if (
        window.confirm(
          `¿Estás seguro de que quieres eliminar proyecto <${projectSelect}>?`,
        )
      ) {
        //setProgress(0);
        //setIsLoading(true);
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
      case "aprobado":
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
  //
  useEffect(() => {
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
  }, []);
  //
  //
  useEffect(() => {
    //
    getProjects();
    //
  }, []);
  //
  //
  return (
    <div>
      <p style={{ fontStyle: "italic", fontSize: "18px" }}>
        Información técnica de proyectos
      </p>
      <div style={estiloGrilla}>
        {/* Renderizado condicional: solo mapea si está visible para optimizar */}
        {estaVisible && (
          <table>
            <thead>
              <tr className="row-head">
                <th style={{ width: "85px", marginLeft: "1px" }}> Acciones</th>
                <th
                  style={{
                    width: "90px",
                    marginLeft: "5px",
                    textAlign: "revert-layer",
                  }}
                >
                  Proyecto
                </th>
                <th style={{ width: "150px", marginLeft: "1px" }}>Cliente</th>
                <th style={{ width: "150px", marginLeft: "5px" }}>Tema</th>
                <th style={{ width: "180px", marginLeft: "5px" }}>
                  Descripción<noscript></noscript>
                </th>
                <th style={{ width: "220px", marginLeft: "5px" }}>
                  Observación
                </th>
                <th
                  style={{
                    width: "100px",
                    textAlign: "center",
                  }}
                >
                  Avance
                </th>
                <th style={{ width: "100px", marginLeft: "5px" }}>Fecha-Ini</th>
                <th style={{ width: "100px", marginLeft: "5px" }}>Fecha.Fin</th>
                <th
                  style={{
                    width: "60px",
                    marginLeft: "5px",
                  }}
                >
                  Quenan
                </th>
                <th
                  style={{
                    width: "60px",
                    textAlign: "center",
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
                      fontSize: "15px",
                      color: "brown",
                    }}
                  >
                    {item.codeprj}
                  </td>
                  <td style={{ fontSize: "13px" }}>{item.company}</td>
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
                    {item.sigla}
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
  );
};

export default ProjectsDisplay;
