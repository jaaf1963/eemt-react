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
    if (userSelect !== "") {
      if (
        window.confirm(
          `¿Estás seguro de que quieres eliminar usuario <${userSelect}>?`,
        )
      ) {
        //
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
  useEffect(() => {
    //
    getUsers();
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
          width: "400px",
          paddingLeft: "1px",
          paddingRight: "20px",
          color: "yellow",
          backgroundColor: "blue",
          borderRadius: "9px",
          boxShadow: "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff",
        }}
      >
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
                  <td
                    style={{
                      fontSize: "13px",
                      color: "blue",
                      fontWeight: "bold",
                    }}
                  >
                    {item.usern}
                  </td>
                  <td style={{ fontSize: "13px" }}>{item.inses}</td>
                  <td style={{ fontSize: "13px" }}>{item.dases}</td>
                  <td style={{ fontSize: "13px", color: "blue" }}>
                    {item.fname}
                  </td>
                  <td style={{ fontSize: "13px" }}>{item.lname}</td>
                  <td style={{ fontSize: "13px", color: "brown" }}>
                    {item.email}
                  </td>
                  <td style={{ fontSize: "13px" }}>{item.typus}</td>
                  <td style={{ fontSize: "13px" }}>{item.profe}</td>
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
