import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

interface panelProps {
  id?: number | undefined;
  entype: string | undefined;
  panel: string;
  ptitle: string | undefined;
  pwidth: string | undefined;
  pheigh: string | undefined;
  bcolor?: string | undefined;
  pfontt?: string | undefined;
  psizee?: string | undefined;
  pcolor?: string | undefined;
  status?: string | undefined;
}

const PanelsDisplay: React.FC = () => {
  const [panelsGet, setPanelsGet] = useState<panelProps[]>([]);
  //const [ubihost, setUbihost] = useState<string>("");
  const [estaVisible, setEstaVisible] = useState<boolean>(false);
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

  const getPanels = async () => {
    const dataPanel = {
      instance: "titles_panel",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      //panel: panelSel,
    };
    const API_URL_BACKEND = `${ubihost}/search_titlespanels_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_titlespanel_react";
    //
    try {
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataPanel),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      const panelsResp = await response.json();
      //
      if (panelsResp.success === "err") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Data ClientsGet for map() select
      const panels = panelsResp.msg;
      if (panels) {
        //
        setPanelsGet(panels);
        setEstaVisible(true);
        //console.log(pnaelsGet);
      }
      //
    } catch (err: any) {
      //setError(err.message);
      alert("Error al leer lista de panales.");
      //
    } finally {
      //setLoading(false);
    }
  };
  //
  // Delete user
  //
  const handleDeleteUser = async (panelSelect: string) => {
    //
    //alert(userSelect);
    if (panelSelect !== "") {
      //
      if (
        window.confirm(
          `¡¡CUIDADO!! ¿Seguro de que quieres eliminar panel <${panelSelect}>?`,
        )
      ) {
        //setProgress(0);
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
              instance: "delete_pan",
              entity: entyUserStore,
              userna: textUserStore,
              authen: authUserStore,
              pandel: panelSelect,
            };
            //
            const API_URL_BACKEND = `${ubihost}/delete_panel_react`;
            //onst API_URL_BACKEND = "http://localhost:5055/delete_panel_react";
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
              alert("Error al Eliminar usuario.");
              //
            } finally {
              setIsLoading(false);
            }
          } else {
            alert("NO tiene credenciales para Eliminar paneles.");
          }
        } else {
          alert("No se advierte usuario...hacer Login");
        }
      }
    }
  };
  //
  //
  /*
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
  */
  //
  //
  useEffect(() => {
    //
    getPanels();
    //
  }, [isLoading]);
  //
  //
  return (
    <div>
      <p style={{ fontStyle: "italic", fontSize: "18px" }}>
        Información de paneles
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
                  Panel
                </th>
                <th style={{ width: "270px", marginLeft: "5px" }}>Titulo</th>
                <th style={{ width: "080px", marginLeft: "5px" }}>Ancho</th>
                <th style={{ width: "080px", marginLeft: "5px" }}>Alto</th>
                <th style={{ width: "200px", marginLeft: "5px" }}>BG-Color</th>
                <th style={{ width: "100px", marginLeft: "5px" }}>Tipo-Font</th>
                <th style={{ width: "200px", marginLeft: "5px" }}>
                  Color-Font
                </th>
                <th
                  style={{
                    width: "080px",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  Size-Font
                </th>
              </tr>
            </thead>
            <tbody>
              {panelsGet.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "row-even" : "row-odd"}
                >
                  <td>
                    <button
                      onClick={() => handleDeleteUser(item.panel)}
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
                  <td style={{ color: "blue" }}>{item.panel}</td>
                  <td>{item.ptitle}</td>
                  <td>{item.pwidth}</td>
                  <td>{item.pheigh}</td>
                  <td>{item.bcolor}</td>
                  <td>{item.pfontt}</td>
                  <td>{item.pcolor}</td>
                  <td>{item.psizee}</td>
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

export default PanelsDisplay;
