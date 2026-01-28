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
  };

  const getPanels = async () => {
    const dataPanel = {
      instance: "titles_panel",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      //panel: panelSel,
    };
    const API_URL_BACKEND = `${ubihost}/search_titlespanel_react`;
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
    if (panelSelect !== "") {
      //
      if (
        window.confirm(
          `¡¡CUIDADO!! ¿Seguro de que quieres eliminar panel <${panelSelect}>?`,
        )
      ) {
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
  useEffect(() => {
    //
    getPanels();
    //
  }, [isLoading]);
  //
  //
  return (
    <div>
      <p
        style={{
          fontStyle: "italic",
          fontSize: "18px",
          textAlign: "center",
          width: "450px",
          paddingLeft: "1px",
          paddingRight: "20px",
          color: "yellow",
          backgroundColor: "blue",
          borderRadius: "9px",
          boxShadow: "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff",
        }}
      >
        Información de paneles
      </p>
      <div style={estiloGrilla}>
        {/* Renderizado condicional: solo mapea si está visible para optimizar */}
        {estaVisible && (
          <table>
            <thead>
              <tr className="row-head">
                <th
                  style={{
                    width: "85px",
                    marginLeft: "1px",
                  }}
                >
                  {" "}
                  Acciones
                </th>
                <th
                  className="fija-head"
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
                        fontSize: "14px",
                        width: "70px",
                        height: "25px",
                        border: "4px",
                        color: "tomato",
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td style={{ color: "blue" }}>{item.panel}</td>
                  <td style={{ fontSize: "13px" }}>{item.ptitle}</td>
                  <td style={{ fontSize: "13px" }}>{item.pwidth}</td>
                  <td style={{ fontSize: "13px" }}>{item.pheigh}</td>
                  <td style={{ fontSize: "13px" }}>{item.bcolor}</td>
                  <td style={{ fontSize: "13px" }}>{item.pfontt}</td>
                  <td style={{ fontSize: "13px" }}>{item.pcolor}</td>
                  <td style={{ fontSize: "13px", textAlign: "center" }}>
                    {item.psizee}
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

export default PanelsDisplay;
