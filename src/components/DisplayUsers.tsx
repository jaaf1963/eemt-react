import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

interface userProps {
  id?: number | undefined;
  entype: string | undefined;
  usern: string;
  fname: string | undefined;
  lname: string | undefined;
  email: string | undefined;
  profe?: string | undefined;
  inses?: string | undefined;
  dases?: string | undefined;
  typus?: string | undefined;
  statu?: string | undefined;
}

const UsersDisplay: React.FC = () => {
  const [usersGet, setUsersGet] = useState<userProps[]>([]);
  //onst [ubihost, setUbihost] = useState<string>("");
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

  const getUsers = async () => {
    const dataClient = {
      usrtext: "search_usr",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      //client: clientSel,
    };
    //
    const API_URL_BACKEND = `${ubihost}/search_users_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_users_react";
    //
    try {
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataClient),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      const usersResp = await response.json();
      //
      if (usersResp.success === "err") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Data ClientsGet for map() select
      const users = usersResp.msg;
      if (users) {
        //
        setUsersGet(users);
        setEstaVisible(true);
        //console.log(usersGet);
      }
      //
    } catch (err: any) {
      //setError(err.message);
      alert("Error al leer lista de usuarios.");
      //
    } finally {
      //setLoading(false);
    }
  };
  //
  // Delete user
  //
  const handleDeleteUser = async (userSelect: string) => {
    //
    //alert(userSelect);
    if (userSelect !== "") {
      if (
        window.confirm(
          `¿Estás seguro de que quieres eliminar usuario <${userSelect}>?`,
        )
      ) {
        //
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
              instance: "delete_user",
              entity: entyUserStore,
              userna: textUserStore,
              authen: authUserStore,
              usrdel: userSelect,
            };
            //
            const API_URL_BACKEND = `${ubihost}/delete_user_react`;
            //const API_URL_BACKEND = "http://localhost:5055/delete_user_react";
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
    getUsers();
    //
  }, [isLoading]);
  //
  //
  return (
    <div>
      <p style={{ fontStyle: "italic", fontSize: "18px" }}>
        Información de usuarios
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
                    width: "120px",
                    marginLeft: "5px",
                    textAlign: "revert-layer",
                  }}
                >
                  Username
                </th>
                <th style={{ width: "100px", marginLeft: "1px" }}>InSession</th>
                <th style={{ width: "100px", marginLeft: "5px" }}>Session</th>
                <th style={{ width: "160px", marginLeft: "5px" }}>Nombres</th>
                <th style={{ width: "190px", marginLeft: "5px" }}>Apellidos</th>
                <th style={{ width: "220px", marginLeft: "5px" }}>E-mail</th>
                <th style={{ width: "135px", marginLeft: "5px" }}>TipoUser</th>
                <th style={{ width: "120px", marginLeft: "5px" }}>Profesión</th>
              </tr>
            </thead>
            <tbody>
              {usersGet.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "row-even" : "row-odd"}
                >
                  <td>
                    <button
                      onClick={() => handleDeleteUser(item.usern)}
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
                  <td>{item.usern}</td>
                  <td>{item.inses}</td>
                  <td>{item.dases}</td>
                  <td style={{ color: "blue" }}>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td style={{ color: "brown" }}>{item.email}</td>
                  <td>{item.typus}</td>
                  <td>{item.profe}</td>
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

export default UsersDisplay;
