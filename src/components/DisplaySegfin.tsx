import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface segfinProps {
  id?: number | undefined;
  cup: string;
  client?: string | undefined;
  codeprj: string | undefined;
  proyec?: string | undefined;
  tiproy?: string | undefined;
  etapa?: string | undefined;
  estado?: string | undefined;
  clpcom?: string | undefined;
  usdcom?: string | undefined;
  uffcom?: string | undefined;
  estcom?: string | undefined;
  clppen?: string | undefined;
  usdpen?: string | undefined;
  uffpen?: string | undefined;
  status?: string | undefined;
  datein?: string | undefined;
}
/*
sfn_id sfn_entity sfn_cup sfn_client sfn_projec sfn_tiproy sfn_etapa sfn_esttec sfn_clpcom 
sfn_usdcom sfn_uffcom sfn_estcom sfn_clppen sfn_usdpen sfn_uffpen sfn_status sfn_datein 
*/
const SegfinDisplay: React.FC = () => {
  const [segfinsGet, setSegfinsGet] = useState<segfinProps[]>([]);
  const [ubihost, setUbihost] = useState<string>("");
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
    //display: "block",
    // O si usas Tailwind:
    // className={`transition-opacity duration-500 ${estaVisible ? 'opacity-100' : 'opacity-0'}`}
  };

  //
  const getSegfins = async () => {
    const dataSegfin = {
      srhtext: "search_segfin",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      //proct: clientSel,
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
        //console.log(segfins);
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
    //alert(userSelect);
    if (projectSelect !== "") {
      //
      if (
        window.confirm(
          `¿Estás seguro de que quieres eliminar proyecto <${projectSelect}>?`,
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
  useEffect(() => {
    //
    getSegfins();
    //
  }, []);
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
  return (
    <div>
      <p style={{ fontStyle: "italic", fontSize: "18px" }}>
        Información para Seguimiento Financiero
      </p>
      <div style={estiloGrilla}>
        {/* Renderizado condicional: solo mapea si está visible para optimizar */}
        {estaVisible && (
          <table>
            <thead style={{ fontSize: "12px", fontFamily: "Arial" }}>
              <tr className="row-head">
                <th style={{ width: "85px", marginLeft: "1px" }}> Acciones</th>
                <th
                  style={{
                    width: "80px",
                    marginLeft: "5px",
                    textAlign: "revert-layer",
                  }}
                >
                  Cod-Proy
                </th>
                <th style={{ width: "150px", marginLeft: "1px" }}>Cliente</th>
                <th style={{ width: "150px", marginLeft: "5px" }}>Proyecto</th>
                <th style={{ width: "070px", marginLeft: "5px" }}>
                  Tipo-Proy<noscript></noscript>
                </th>
                <th style={{ width: "060px", marginLeft: "5px" }}>Etapa</th>
                <th style={{ width: "100px", marginLeft: "5px" }}>
                  Desarrollo
                </th>
                <th
                  style={{
                    width: "060px",
                    marginLeft: "5px",
                    textAlign: "right",
                  }}
                >
                  CLP-Com
                </th>
                <th
                  style={{
                    width: "070px",
                    marginLeft: "5px",
                    textAlign: "right",
                  }}
                >
                  USD-Com
                </th>
                <th
                  style={{
                    width: "060px",
                    marginLeft: "5px",
                    textAlign: "right",
                  }}
                >
                  U.F-Com
                </th>
                <th
                  style={{
                    width: "100px",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  Ingreso
                </th>
                <th
                  style={{
                    width: "060px",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  CLP-Pen
                </th>
                <th
                  style={{
                    width: "060px",
                    marginLeft: "5px",
                    textAlign: "right",
                  }}
                >
                  USD-Pen
                </th>
                <th
                  style={{
                    width: "060px",
                    marginLeft: "5px",
                    textAlign: "right",
                  }}
                >
                  U.F-Pen
                </th>
                <th
                  style={{
                    width: "80px",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  Ingresado
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
                        fontSize: "15px",
                      }}
                    >
                      Eliminar
                    </button>
                    {/*
                    <button
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
                    </button>
                    */}
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      color: "brown",
                      fontWeight: "bold",
                    }}
                  >
                    {item.cup}
                  </td>
                  <td style={{ fontSize: "14px" }}>{item.client}</td>
                  <td>{item.proyec}</td>
                  <td
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "brown",
                    }}
                  >
                    {item.tiproy}
                  </td>
                  <td>{item.etapa}</td>
                  <td>{item.estado}</td>
                  <td style={{ textAlign: "right", color: "blue" }}>
                    {item.clpcom}
                  </td>
                  <td style={{ textAlign: "right", color: "blue" }}>
                    {item.usdcom}
                  </td>
                  <td style={{ textAlign: "right", color: "blue" }}>
                    {item.uffcom}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.estcom}</td>
                  <td style={{ textAlign: "right", color: "magenta" }}>
                    {item.clppen}
                  </td>
                  <td style={{ textAlign: "right", color: "magenta" }}>
                    {item.usdpen}
                  </td>
                  <td style={{ textAlign: "right", color: "magenta" }}>
                    {item.uffpen}
                  </td>
                  <td style={{ fontSize: "11px", textAlign: "center" }}>
                    {item.datein}
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

export default SegfinDisplay;
