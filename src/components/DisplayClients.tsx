import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

interface clieProps {
  id?: number | undefined;
  client: string;
  activity?: string | undefined;
  dnicom: string;
  owner?: string | undefined;
  contact?: string | undefined;
  email?: string | undefined;
  country?: string | undefined;
  usercpny?: string | undefined;
  dateing?: string | undefined;
  status?: string | undefined;
}

const ClientsDisplay: React.FC = () => {
  const [clientsGet, setClientsGet] = useState<clieProps[]>([]);
  const [estaVisible, setEstaVisible] = useState<boolean>(false);
  //const [ubihost, setUbihost] = useState<string>("");
  const [isLoading, setIsLoading] = React.useState(true);
  //
  const [textRoleStore, setTextRoleStore] = useState(() => {
    const roleStore = localStorage.getItem("role");
    if (roleStore) {
      return roleStore;
    }
    //setTextRoleStore("");
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
  const getClients = async () => {
    const dataClient = {
      srhtext: "search_cli",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      //client: clientSel,
    };
    const API_URL_BACKEND = `${ubihost}/search_clients_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_clients_react";
    //
    try {
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataClient),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      const clientsResp = await response.json();
      //
      if (clientsResp.success === "err") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Data ClientsGet for map() select
      const clients = clientsResp.msg;
      if (clientsGet) {
        //
        setClientsGet(clients);
        setEstaVisible(true);
      }
      //
    } catch (err: any) {
      //setError(err.message);
      alert("Error al leer lista de clientes.");
      //
    } finally {
      //setLoading(false);
    }
  };
  //
  // Delete Client
  //
  const handleDeleteClient = async (clientSelect: string) => {
    //
    //alert(userSelect);
    if (clientSelect !== "") {
      //
      if (
        window.confirm(
          `¿Estás seguro de que quieres eliminar  cliente <${clientSelect}>?`,
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
              instance: "delete_cli",
              entity: entyUserStore,
              userna: textUserStore,
              authen: authUserStore,
              clidel: clientSelect,
            };
            //
            const API_URL_BACKEND = `${ubihost}/delete_client_react`;
            //const API_URL_BACKEND = "http://localhost:5055/delete_client_react";
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
            alert("NO tiene credenciales para Eliminar usuarios.");
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
    //
    let numApp = process.env.REACT_APP_NUM;
    if (Number(numApp) === 1) {
      // api web
      const ubiho = process.env.REACT_APP_API_URL;
      ////
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
  //
  useEffect(() => {
    //
    getClients();
    //
  }, [isLoading]);
  //
  //
  return (
    <div>
      <p style={{ fontStyle: "italic", fontSize: "18px" }}>
        Información de clientes
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
                    width: "280px",
                    marginLeft: "5px",
                    textAlign: "revert-layer",
                  }}
                >
                  Cliente
                </th>
                <th style={{ width: "130px", marginLeft: "1px" }}>Dni-trib.</th>
                <th style={{ width: "150px", marginLeft: "5px" }}>Actividad</th>
                <th style={{ width: "260px", marginLeft: "5px" }}>Dueño</th>
                <th style={{ width: "095px", marginLeft: "5px" }}>Contacto</th>
                <th style={{ width: "220px", marginLeft: "5px" }}>E-mail</th>
                <th style={{ width: "135px", marginLeft: "5px" }}>Pais</th>
                <th style={{ width: "110px", marginLeft: "5px" }}>Ingreso</th>
              </tr>
            </thead>
            <tbody>
              {clientsGet.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "row-even" : "row-odd"}
                >
                  <td>
                    <button
                      onClick={() => handleDeleteClient(item.dnicom)}
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

                  <td style={{ textAlign: "left", color: "blue" }}>
                    {item.client}
                  </td>
                  <td>{item.dnicom}</td>
                  <td>{item.activity}</td>
                  <td>{item.owner}</td>
                  <td>{item.contact}</td>
                  <td style={{ color: "tomato" }}>{item.email}</td>
                  <td>{item.country}</td>
                  <td>{item.dateing}</td>
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

export default ClientsDisplay;
