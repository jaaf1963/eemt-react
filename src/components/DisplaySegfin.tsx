import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ExportCsvTable from "./ExportDataToCsv";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

interface segfinProps {
  id?: number | undefined;
  cup: string;
  client?: string | undefined;
  codeprj: string | undefined;
  proyec?: string | undefined;
  tiproy?: string | undefined;
  etapa?: string | undefined;
  instan?: string | undefined;
  clpcom?: string | undefined;
  usdcom?: string | undefined;
  uffcom?: string | undefined;
  ingcom?: string | undefined;
  clppen?: string | undefined;
  usdpen?: string | undefined;
  uffpen?: string | undefined;
  pendie?: string | undefined;
  datein?: string | undefined;
  datemv?: string | undefined;
  anofin: string | undefined;
  mesfin: string | undefined;
}
interface OptionType {
  value: string;
  label: string;
}

const SegfinDisplay: React.FC = () => {
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
  const [segfinsGet, setSegfinsGet] = useState<segfinProps[]>([]);
  const [selectedProj, setSelectedProj] = useState<string>("");
  const [selectedClie, setSelectedClie] = useState<string>("");
  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [estaVisible, setEstaVisible] = useState<boolean>(false);
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
  };
  //
  //
  const getSegfins = async () => {
    const dataSegfin = {
      srhtext: "search_segfin",
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
    const API_URL_BACKEND = `${ubihost}/search_segfin_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_segfin_react";
    //
    try {
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataSegfin),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      const segfinsResp = await response.json();
      //
      if (segfinsResp.success === "err") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Data segfinsGet for map() select
      const segfins = segfinsResp.msg;
      if (segfins) {
        //
        setSegfinsGet(segfins);
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
  const handleDeleteSegfin = async (projectSelect: string) => {
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
              instance: "delete_segfin",
              entity: entyUserStore,
              userna: textUserStore,
              authen: authUserStore,
              sfndel: projectSelect,
            };
            //
            const API_URL_BACKEND = `${ubihost}/delete_segfin_react`;
            //const API_URL_BACKEND = "http://localhost:5055/delete_segfin_react";
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
              //setIsLoading(false);
              alert("Cargado...");
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
  const getSegfinProjects = async () => {
    const dataSegfin = {
      srhtext: "search_segfinProj",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
    };
    //
    const API_URL_BACKEND = `${ubihost}/search_segfin_projects_react`;
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
      getSegfins();
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
          Información para Seguimiento Financiero
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

          <ExportCsvTable data={segfinsGet} filename="eemt_segfin" />
        </div>
      </div>

      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <div style={estiloGrilla}>
          {/* Renderizado condicional: solo mapea si está visible para optimizar */}
          {estaVisible && (
            <table
              style={{
                width: "1290px",
                marginLeft: "1px",
                textAlign: "center",
                position: "sticky",
              }}
            >
              <thead
                style={{
                  fontSize: "12px",
                  fontFamily: "Arial",
                  borderCollapse: "collapse",
                  width: "100%",
                }}
              >
                <tr className="row-head">
                  <th
                    style={{
                      width: "90px",
                      marginLeft: "0px",
                      paddingLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "5px",
                      borderBottom: "2px solid #ddd",
                    }}
                    className="fija-head"
                  >
                    {" "}
                    Acciones
                  </th>
                  <th
                    style={{
                      width: "120px",
                      marginLeft: "5px",
                      fontSize: "13px",
                      textAlign: "left",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "5px",
                      borderBottom: "2px solid #ddd",
                    }}
                    className="fija-head"
                  >
                    Cod-Proy
                  </th>
                  <th
                    style={{
                      width: "140px",
                      marginLeft: "1px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "5px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Cliente
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
                    Proyecto
                  </th>
                  <th
                    style={{
                      width: "070px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Tipo<noscript></noscript>
                  </th>
                  <th
                    style={{
                      width: "060px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Etapa
                  </th>
                  <th
                    style={{
                      width: "90px",
                      marginLeft: "5px",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Desarrollo
                  </th>
                  <th
                    style={{
                      width: "065px",
                      marginLeft: "5px",
                      textAlign: "right",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    CLP
                  </th>
                  <th
                    style={{
                      width: "070px",
                      marginLeft: "5px",
                      textAlign: "right",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    USD
                  </th>
                  <th
                    style={{
                      width: "070px",
                      marginLeft: "5px",
                      textAlign: "right",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    U.F.
                  </th>
                  <th
                    style={{
                      width: "110px",
                      marginLeft: "5px",
                      textAlign: "center",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Ingresos
                  </th>
                  <th
                    style={{
                      width: "070px",
                      marginLeft: "5px",
                      textAlign: "right",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    CLP
                  </th>
                  <th
                    style={{
                      width: "070px",
                      marginLeft: "5px",
                      textAlign: "right",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    USD
                  </th>
                  <th
                    style={{
                      width: "070px",
                      marginLeft: "5px",
                      textAlign: "right",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    U.F.
                  </th>
                  <th
                    style={{
                      width: "80px",
                      marginLeft: "3px",
                      textAlign: "center",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Pendien
                  </th>
                  <th
                    style={{
                      width: "100px",
                      marginLeft: "5px",
                      textAlign: "center",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Ult-Mov
                  </th>
                  <th
                    style={{
                      width: "70px",
                      marginLeft: "5px",
                      textAlign: "center",
                      top: 0,
                      position: "sticky",
                      backgroundColor: "#f2f2f2", // Fondo para no ver datos atrás
                      zIndex: 1, // Asegura que esté por encima
                      padding: "10px",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Año-Com
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "12px" }}>
                {segfinsGet.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "row-even" : "row-odd"}
                  >
                    <td>
                      <button
                        onClick={() => handleDeleteSegfin(item.cup.toString())}
                        className="btn-delete-user"
                        style={{
                          width: "70px",
                          height: "25px",
                          border: "4px",
                          color: "tomato",
                          textAlign: "center",
                          fontSize: "13px",
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        color: "brown",
                        fontWeight: "bold",
                        fontSize: "11px",
                      }}
                    >
                      {item.cup}
                    </td>
                    <td style={{ fontSize: "12px" }}>{item.client}</td>
                    <td style={{ fontSize: "12px" }}>{item.proyec}</td>
                    <td
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "brown",
                      }}
                    >
                      {item.tiproy}
                    </td>
                    <td>{item.etapa}</td>
                    <td>{item.instan}</td>
                    <td style={{ textAlign: "right", color: "blue" }}>
                      {item.clpcom}
                    </td>
                    <td style={{ textAlign: "right", color: "blue" }}>
                      {item.usdcom}
                    </td>
                    <td style={{ textAlign: "right", color: "blue" }}>
                      {item.uffcom}
                    </td>
                    <td style={{ textAlign: "center", color: "brown" }}>
                      {item.ingcom}
                    </td>
                    <td style={{ textAlign: "right", color: "magenta" }}>
                      {item.clppen}
                    </td>
                    <td style={{ textAlign: "right", color: "magenta" }}>
                      {item.usdpen}
                    </td>
                    <td style={{ textAlign: "right", color: "magenta" }}>
                      {item.uffpen}
                    </td>
                    <td style={{ textAlign: "center", color: "brown" }}>
                      {item.pendie}
                    </td>
                    <td style={{ textAlign: "right", fontSize: "11px" }}>
                      {item.datemv}
                    </td>
                    <td style={{ textAlign: "center", fontSize: "11px" }}>
                      {item.anofin}
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

export default SegfinDisplay;
