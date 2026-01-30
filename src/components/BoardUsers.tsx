import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import UserImage from "../services/usersImage";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

const modulos = [
  { label: "Admin", value: "admin" },
  { label: "Comercial", value: "comercial" },
  { label: "Tecnico", value: "tecnico" },
  { label: "Ninguno", value: "ninguno" },
];

const roles = [
  { label: "Edit", value: "edit" },
  { label: "View", value: "view" },
  { label: "Nada", value: "nada" },
];

interface entypeProps {
  id: number | undefined;
  name?: string | undefined;
  descrip?: string | undefined;
}

interface userProps {
  id?: number | undefined;
  entype: string | undefined;
  profe?: string | undefined;
  fname: string | undefined;
  lname: string | undefined;
  email: string | undefined;
  dnius: string | undefined;
  conta: string | undefined;
  usern: string;
  module?: string | undefined;
  roles: string | undefined;
  inses?: string | undefined;
  dases?: string | undefined;
  statu?: string | undefined;
}

const BoardUsers: React.FC = () => {
  const [profesionGet, setProfesionGet] = useState<entypeProps[]>([]);
  const [usersGet, setUsersGet] = useState<userProps[]>([]);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [showUser, setShowUser] = useState<boolean>(false);
  const [usernaInp, setUsernaInp] = useState<string>("");
  const [profesInp, setProfesInp] = useState<string>("");
  const [fnamesInp, setFnamesInp] = useState<string>("");
  const [lnamesInp, setLnamesInp] = useState<string>("");
  const [dnicomInp, setDnicomInp] = useState<string>("");
  const [eemailInp, setEemailInp] = useState<string>("");
  const [moduleInp, setModuleInp] = useState<string>("");
  const [rolessInp, setRolessInp] = useState<string>("");
  const [contacInp, setContacInp] = useState<string>("");
  const [message, setMessage] = useState<string>("");
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

  const initialValues = {
    //entity: "",
    profes: "",
    fname: "",
    lname: "",
    dnius: "",
    usern: "",
    module: "",
    roles: "",
    eemail: "",
    conta: "",
    password: "",
    passconf: "",
    //datain: new Date().toString(),
  };

  interface PostData {
    instance?: string;
    entity?: string;
    profes: string;
    fname: string;
    lname: string;
    dnius: string;
    usern: string;
    module: string;
    roles: string;
    eemail?: string;
    conta?: string;
    password?: string;
    passconf?: string;
    dataini?: string;
    dataend?: string;
    username?: string;
    //author?: string;
  }

  /*
  const validationSchema = Yup.object().shape({
    // Validacion de esquemas
  });
  */
  //
  // se asigna PostData a formValue para igualar las variables
  // al desEstructurar los valores ingresados por el usuario
  const handleRegisterUser = async (formValue: PostData) => {
    if (
      textRoleStore !== null &&
      entyUserStore !== null &&
      textUserStore !== null &&
      authUserStore !== null
    ) {
      //
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        //
        const postData: PostData = {
          instance: "user_insert",
          entity: entyUserStore,
          profes: profesInp,
          fname: fnamesInp,
          lname: lnamesInp,
          dnius: dnicomInp,
          eemail: eemailInp,
          usern: usernaInp,
          module: moduleInp,
          roles: rolessInp,
          conta: contacInp,
          username: textUserStore,
          //password: password,
        };
        //
        const API_URL_BACKEND = `${ubihost}/insert_users_react`;
        //const API_URL_BACKEND = "http://localhost:5055/insert_users_react";
        //
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(postData),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });

          if (!response.ok) {
            // Manejar errores del servidor
            throw new Error(`Error del servidor: ${response.status}`);
          }

          const data = await response.json();
          // Aquí puedes manejar la respuesta del servidor (por ejemplo, guardar un token)
          //
          if (data) {
            //
            setMessage("");
            setSuccessful(true);
            setShowUser(true);
            //
          } else {
            //
            const respMessage = data.msg;
            //setLoading(false);
            setSuccessful(false);
            setShowUser(false);
            setMessage(respMessage);
            console.error("Error al obtener datos:", respMessage);
          }
          //
        } catch (error) {
          setSuccessful(false);
          setMessage("error");
          console.error("Error en el inicio de sesión:", error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      }
    }
  };
  //
  //
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
        //setEstaVisible(true);
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
  //
  const getProfesions = async () => {
    if (
      textUserStore !== null &&
      entyUserStore !== null &&
      authUserStore !== null
      // && clientSel !== ""
    ) {
      //console.log(clientSel);
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        const dataClient = {
          srhtext: "search_prof",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
          //client: clientSel,
        };
        const API_URL_BACKEND = `${ubihost}/search_profesion_react`;
        //const API_URL_BACKEND = "http://localhost:5055/search_profesion_react";
        //
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(dataClient),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          const profesionResp = await response.json();
          //
          if (profesionResp.success === "err") {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          // Data ActivityGet for map() select
          const profesGets = profesionResp.msg;
          setProfesionGet(profesGets);
          //console.log(profesionGet);
          //
        } catch (err: any) {
          //setError(err.message);
          alert("Error al leer Profesion...");
          //
        } finally {
          //setLoading(false);
        }
      } else {
        alert("Código de profesion es nulo...revisar");
      }
    }
  };
  //
  //
  useEffect(() => {
    //
    getUsers();
    //
  }, []);
  //
  //
  useEffect(() => {
    //
    getProfesions();
    setShowUser(true);
    //
  }, [showUser]);
  //
  //
  //
  const changeUsers = (valor: string) => {
    //
    const txt = valor.split("|");
    console.log(txt);
    console.log(txt[0]);
    setUsernaInp(txt[0]);
    setProfesInp(txt[1]);
    setFnamesInp(txt[2]);
    setLnamesInp(txt[3]);
    setDnicomInp(txt[4]);
    setEemailInp(txt[5]);
    setContacInp(txt[6]);
    setModuleInp(txt[7]);
    setRolessInp(txt[8]);
    //
  };
  //
  //
  const handleChangeUsern = (event: React.ChangeEvent<HTMLDataElement>) => {
    if (event.target.value) {
      changeUsers(event.target.value);
    }
  };
  //
  const handleChangeProfes = (event: React.ChangeEvent<HTMLDataElement>) => {
    if (event.target.value) {
      setProfesInp(event.target.value);
    }
  };
  //
  const handleChangeFname = (event: React.ChangeEvent<HTMLDataElement>) => {
    if (event.target.value) {
      setFnamesInp(event.target.value);
    }
  };
  //
  const handleChangeLname = (event: React.ChangeEvent<HTMLDataElement>) => {
    if (event.target.value) {
      setLnamesInp(event.target.value);
    }
  };
  //
  const handleChangeDnius = (event: React.ChangeEvent<HTMLDataElement>) => {
    if (event.target.value) {
      setDnicomInp(event.target.value);
    }
  };
  //
  const handleChangeContact = (event: React.ChangeEvent<HTMLDataElement>) => {
    if (event.target.value) {
      setContacInp(event.target.value);
    }
  };
  //
  const handleChangeEmail = (event: React.ChangeEvent<HTMLDataElement>) => {
    if (event.target.value) {
      setEemailInp(event.target.value);
    }
  };
  //
  const handleChangeModule = (event: React.ChangeEvent<HTMLDataElement>) => {
    if (event.target.value) {
      setModuleInp(event.target.value);
    }
  };
  //
  const handleChangeRoless = (event: React.ChangeEvent<HTMLDataElement>) => {
    if (event.target.value) {
      setRolessInp(event.target.value);
    }
  };
  //
  // true true : muestra info
  // true false : muestra ingresar info
  //
  return (
    <div className="col-md-12">
      <h4>Registro de Usuarios</h4>

      {/*showUser && !successful && <UsersDisplay />*/}

      {!successful && (
        <div className="card card-container">
          <UserImage />
          <Formik
            initialValues={initialValues}
            //validationSchema={validationSchema}
            onSubmit={handleRegisterUser}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="">
                    <label
                      htmlFor="usern"
                      style={{ height: "15px", color: "tomato" }}
                    >
                      Selec. Username
                    </label>

                    <select
                      name="usern"
                      className="form-control"
                      value={usernaInp}
                      onChange={handleChangeUsern}
                    >
                      <option value="">
                        - - - - - - Selec usuario - - - - - -
                      </option>{" "}
                      {/* Opción por defecto */}
                      {/* entypeOptions.map((option) */}
                      {usersGet.map((option) => (
                        <option
                          key={option.usern}
                          value={
                            option.usern +
                            "|" +
                            option.profe +
                            "|" +
                            option.fname +
                            "|" +
                            option.lname +
                            "|" +
                            option.dnius +
                            "|" +
                            option.email +
                            "|" +
                            option.conta +
                            "|" +
                            option.module +
                            "|" +
                            option.roles
                          }
                        >
                          {option.usern}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="usern"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="profes" style={{ height: "15px" }}>
                      Selec. Profesión
                    </label>
                    <select
                      name="profes"
                      className=""
                      value={profesInp}
                      onChange={handleChangeProfes}
                      style={{
                        width: "20px",
                        height: "25px",
                        backgroundColor: "#f2f6f9",
                        fontStyle: "normal",
                        border: "0px solid #ccc",
                        borderRadius: "4px",
                        marginLeft: "20px",
                      }}
                    >
                      <option value=""></option> {/* Opción por defecto */}
                      {/* entypeOptions.map((option) */}
                      {profesionGet.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.descrip}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="profes"
                      component="div"
                      className="alert alert-danger"
                    />
                    <input
                      name="profesinp"
                      type="text"
                      value={profesInp}
                      onChange={handleChangeProfes}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "blue",
                        fontStyle: "italic",
                        fontWeight: "normal",
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="fname" style={{ height: "15px" }}>
                      {" "}
                      Nombres{" "}
                    </label>
                    <Field
                      name="fname"
                      type="text"
                      value={fnamesInp}
                      onChange={handleChangeFname}
                      style={{ height: "25px", color: "blue" }}
                      className="form-control"
                    />
                    <ErrorMessage
                      name="fname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="lname" style={{ height: "15px" }}>
                      {" "}
                      Apellidos{" "}
                    </label>
                    <Field
                      name="lname"
                      type="text"
                      value={lnamesInp}
                      onChange={handleChangeLname}
                      className="form-control"
                      style={{ height: "25px", color: "blue" }}
                    />
                    <ErrorMessage
                      name="lname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="dnicom" style={{ height: "15px" }}>
                      {" "}
                      DNI usuario{" "}
                    </label>
                    <Field
                      name="dnicom"
                      type="text"
                      value={dnicomInp}
                      onChange={handleChangeDnius}
                      //format="###-###-###-#"
                      placeholder="xxx-xxx-xxx-x"
                      className="form-control"
                      //onChange={handleChange}
                      style={{ height: "25px", color: "blue" }}
                    />
                    <ErrorMessage
                      name="dnicom"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact" style={{ height: "15px" }}>
                      {" "}
                      Contacto usuario{" "}
                    </label>
                    <Field
                      name="contact"
                      type="text"
                      value={contacInp}
                      onChange={handleChangeContact}
                      className="form-control"
                      style={{ height: "25px", color: "blue" }}
                    />
                    <ErrorMessage
                      name="contact"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="eemail" style={{ height: "15px" }}>
                      {" "}
                      Email usuario{" "}
                    </label>
                    <Field
                      name="eemail"
                      type="email"
                      value={eemailInp}
                      onChange={handleChangeEmail}
                      className="form-control"
                      style={{ height: "25px", color: "blue" }}
                    />
                    <ErrorMessage
                      name="eemail"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="module"
                      style={{ height: "15px", color: "brown" }}
                    >
                      {" "}
                      Modulos
                    </label>
                    <select
                      name="module"
                      className=""
                      value={moduleInp}
                      onChange={handleChangeModule}
                      style={{
                        width: "20px",
                        height: "25px",
                        backgroundColor: "#f2f6f9",
                        fontStyle: "normal",
                        border: "0px solid #ccc",
                        borderRadius: "4px",
                        marginLeft: "20px",
                      }}
                    >
                      <option value=""></option> {/* Opción por defecto */}
                      {/* entypeOptions.map((option) */}
                      {modulos.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="module"
                      component="div"
                      className="alert alert-danger"
                    />
                    <input
                      name="moduleinp"
                      type="text"
                      value={moduleInp}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "blue",
                        fontStyle: "italic",
                        fontWeight: "normal",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="roless"
                      style={{ height: "15px", color: "brown" }}
                    >
                      {" "}
                      Roles{" "}
                    </label>
                    <select
                      name="roles"
                      className=""
                      value={rolessInp}
                      onChange={handleChangeRoless}
                      style={{
                        width: "20px",
                        height: "25px",
                        backgroundColor: "#f2f6f9",
                        fontStyle: "normal",
                        border: "0px solid #ccc",
                        borderRadius: "4px",
                        marginLeft: "20px",
                      }}
                    >
                      <option value=""></option> {/* Opción por defecto */}
                      {/* entypeOptions.map((option) */}
                      {roles.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="roless"
                      component="div"
                      className="alert alert-danger"
                    />
                    <input
                      name="rolessinp"
                      type="text"
                      value={rolessInp}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "blue",
                        fontStyle: "italic",
                        fontWeight: "normal",
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">
                      Password usuario:
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        style={{ height: "25px" }}
                        disabled
                      />
                      <ErrorMessage
                        className="error"
                        name="password"
                        component="div"
                      />
                    </label>
                  </div>

                  <div>
                    <label htmlFor="passconf">
                      Confirme Password:
                      <Field
                        name="passconf"
                        type="password"
                        className="form-control"
                        style={{ height: "25px" }}
                        disabled
                      />
                      <ErrorMessage
                        className="error"
                        name="passconf"
                        component="div"
                      />
                    </label>
                  </div>

                  <div>
                    <p></p>
                    <button type="submit" className="btn btn-primary btn-block">
                      Send Data
                    </button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default BoardUsers;
