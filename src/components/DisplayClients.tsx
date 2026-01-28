import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ExportCsvTable from "./ExportDataToCsv";
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
interface OptionType {
  value: string;
  label: string;
}

const ClientsDisplay: React.FC = () => {
  const [clienteQ, setClienteQ] = useState<string | null>(null);
  const [actividQ, setActividQ] = useState<string | null>(null);
  const [propietQ, setPropietQ] = useState<string | null>(null);
  const [segfinClieG, setSegfinClieG] = useState<OptionType[]>([]);
  const [segfinActiG, setSegfinActiG] = useState<OptionType[]>([]);
  const [segfinPropG, setSegfinPropG] = useState<OptionType[]>([]);
  const [selectedClie, setSelectedClie] = useState<string>("");
  const [selectedProp, setSelectedProp] = useState<string>("");
  const [selectedActi, setSelectedActi] = useState<string>("");
  const [clientsGet, setClientsGet] = useState<clieProps[]>([]);
  const [estaVisible, setEstaVisible] = useState<boolean>(false);
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
  };

  //
  const getClients = async () => {
    const dataClient = {
      srhtext: "search_cli",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      client: clienteQ,
      propie: propietQ,
      activi: actividQ,
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
      if (clients) {
        setClientsGet(clients);
        setEstaVisible(true);
        console.log(isLoading);
      } else {
        setEstaVisible(false);
      }
      //
    } catch (err: any) {
      //setError(err.message);
      alert("Error al hacer filtro de clientes.");
      setTextRoleStore(textRoleStore);
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
    if (clientSelect !== "") {
      //
      if (
        window.confirm(
          `¿Estás seguro de que quieres eliminar  cliente <${clientSelect}>?`,
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
  // Lee todos los proyectos para el popoup
  //
  const getClients_segfin = async () => {
    const dataSegfin = {
      srhtext: "search_segfinClie",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
    };
    //
    const API_URL_BACKEND = `${ubihost}/search_clients_segfin_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_segfin_clients_react";
    //
    try {
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataSegfin),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      const clieSegfinResp = await response.json();
      //
      if (clieSegfinResp.success === "err") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Data segfinsGet for map() select
      const clieSegfin = clieSegfinResp.msg;
      if (clieSegfin) {
        //
        setSegfinClieG(clieSegfin["segClie"]);
        setSegfinPropG(clieSegfin["segProp"]);
        setSegfinActiG(clieSegfin["segActi"]);
        //setEstaVisible(true);
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
  const handlePropietario = (event: React.ChangeEvent<HTMLDataElement>) => {
    const item = event.target.value;
    //
    salvaProp(item);
    //
  };
  const salvaProp = (itm: string) => {
    setPropietQ(itm);
    setSelectedProp(itm);
  };
  //
  const handleActividad = (event: React.ChangeEvent<HTMLDataElement>) => {
    const item = event.target.value;
    //
    salvaActi(item);
    //
  };
  const salvaActi = (itm: string) => {
    setActividQ(itm);
    setSelectedActi(itm);
  };
  //
  //
  useEffect(() => {
    //
    if (clienteQ === null) salvaClie("");
    if (propietQ === null) salvaProp("");
    if (actividQ === null) salvaActi("");
    //
    if (propietQ !== null && propietQ !== null && actividQ !== null) {
      getClients();
    }
    //
  }, [clienteQ, propietQ, actividQ]);
  //
  //
  useEffect(() => {
    //
    getClients_segfin();
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
          Información de clientes
        </p>
        <div className="input-relieve">
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

          <label htmlFor="activ-select"></label>
          {/* The value prop makes it a controlled component */}
          <select
            id="activ-select"
            value={selectedActi}
            onChange={handleActividad}
            style={{
              marginLeft: "10px",
              borderRadius: "5px",
              borderWidth: "0.5px",
            }}
          >
            <option value="" disabled hidden>
              Rubro
            </option>
            {segfinActiG.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="prop-select"></label>
          {/* The value prop makes it a controlled component */}
          <select
            id="prop-select"
            value={selectedProp}
            onChange={handlePropietario}
            style={{
              marginLeft: "10px",
              borderRadius: "5px",
              borderWidth: "0.5px",
            }}
          >
            <option value="" disabled hidden>
              Propietario
            </option>
            {segfinPropG.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ExportCsvTable data={clientsGet} filename="eemt_clientes" />
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
                      width: "280px",
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
                    Cliente
                  </th>
                  <th
                    style={{
                      width: "130px",
                      marginLeft: "1px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Dni-trib.
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
                    Rubro
                  </th>
                  <th
                    style={{
                      width: "260px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Propietario
                  </th>
                  <th
                    style={{
                      width: "095px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Contacto
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
                    E-mail
                  </th>
                  <th
                    style={{
                      width: "135px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Pais
                  </th>
                  <th
                    style={{
                      width: "110px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Ingreso
                  </th>
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
                          fontSize: "14px",
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
                        fontSize: "13px",
                        textAlign: "left",
                        color: "blue",
                      }}
                    >
                      {item.client}
                    </td>
                    <td
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {item.dnicom}
                    </td>
                    <td
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {item.activity}
                    </td>
                    <td
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {item.owner}
                    </td>
                    <td
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {item.contact}
                    </td>
                    <td
                      style={{
                        fontSize: "13px",
                        color: "tomato",
                      }}
                    >
                      {item.email}
                    </td>
                    <td
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {item.country}
                    </td>
                    <td
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {item.dateing}
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

export default ClientsDisplay;
