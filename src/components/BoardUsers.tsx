import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import UserImage from "../services/usersImage";

interface entypeProps {
  id: number | undefined;
  name?: string | undefined;
  descrip?: string | undefined;
}

const BoardUsers: React.FC = () => {
  const [profesionGet, setProfesionGet] = useState<entypeProps[]>([]);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [showUser, setShowUser] = useState<boolean>(false);
  const [ubihost, setHubihost] = useState<string>("");
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
    dnicom: "",
    usern: "",
    roles: "",
    eemail: "",
    password: "",
    passconf: "",
    contact: "",
    //insession: "",
    //dasession: "",
    //datain: new Date().toString(),
  };

  interface PostData {
    instance?: string;
    entity?: string;
    profes: string;
    fname: string;
    lname: string;
    dnicom: string;
    usern: string;
    roles: string;
    eemail?: string;
    contact?: string;
    password?: string;
    passconf?: string;
    dataini?: string;
    dataend?: string;
    username?: string;
    //author?: string;
  }

  const validationSchema = Yup.object().shape({
    profes: Yup.string()
      .test(
        "len",
        "The profession must be between 3 and 35 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 35,
      )
      .required("This field is required!"),

    fname: Yup.string()
      .test(
        "len",
        "The first-name must be between 3 and 35 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 35,
      )
      .required("This field is required!"),
    lname: Yup.string()
      .test(
        "len",
        "The last-name must be between 3 and 35 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 35,
      )
      .required("This field is required!"),
    dnicom: Yup.string()
      .test(
        "len",
        "The Owner must be between 8 and 12 characters.",
        (val: any) =>
          val && val.toString().length >= 8 && val.toString().length <= 12,
      )
      .required("This field is required!"),
    usern: Yup.string()
      .test(
        "len",
        "The Country must be between 3 and 25 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 25,
      )
      .required("This field is required!"),
    eemail: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    contact: Yup.string().test(
      "len",
      "The Contact must be between 6 and 12 characters.",
      (val: any) =>
        val && val.toString().length >= 6 && val.toString().length <= 12,
    ),
    roles: Yup.string()
      .test(
        "len",
        "The Role must be between 4 and 18 characters.",
        (val: any) =>
          val && val.toString().length >= 4 && val.toString().length <= 12,
      )
      .required("This field is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passconf: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
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
        const {
          //entity,
          profes,
          fname,
          lname,
          dnicom,
          eemail,
          usern,
          roles,
          password,
          contact,
        } = formValue;

        const postData: PostData = {
          instance: "user_insert",
          entity: entyUserStore,
          profes: profes,
          fname: fname,
          lname: lname,
          dnicom: dnicom,
          eemail: eemail,
          usern: usern,
          roles: roles,
          contact: contact,
          username: textUserStore,
          password: password,
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
    //
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
  //
  useEffect(() => {
    //
    let numApp = process.env.REACT_APP_NUM;
    if (Number(numApp) === 1) {
      // api web
      const ubiho = process.env.REACT_APP_API_URL;
      //
      if (ubiho) {
        setHubihost(ubiho);
      }
    } else {
      // local
      const ubiho = process.env.REACT_APP_LOC;
      //
      if (ubiho) {
        setHubihost(ubiho);
      }
    }
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
  // true true : muestra info
  // true false : muestra ingresar info
  //
  const handleAgregarUsers = async () => {
    //
    if (showUser === true) {
      setSuccessful(!successful);
      setShowUser(true);
    }
  };
  //
  //
  return (
    <div className="col-md-12">
      <h4>Users register</h4>

      {/*showUser && !successful && <UsersDisplay />*/}

      {!successful && (
        <div className="card card-container">
          <UserImage />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegisterUser}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="profes" style={{ height: "15px" }}>
                      Profession
                    </label>
                    <Field as="select" name="profes">
                      <option value="">
                        - - - - - - Select Profession - - - - - -
                      </option>{" "}
                      {/* Opción por defecto */}
                      {/* entypeOptions.map((option) */}
                      {profesionGet.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.descrip}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="profes"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="fname" style={{ height: "15px" }}>
                      {" "}
                      first name{" "}
                    </label>
                    <Field
                      name="fname"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
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
                      last name{" "}
                    </label>
                    <Field
                      name="lname"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="lname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dnicom" style={{ height: "15px" }}>
                      {" "}
                      DNI client{" "}
                    </label>
                    <Field
                      name="dnicom"
                      type="text"
                      //format="###-###-###-#"
                      placeholder="xxx-xxx-xxx-x"
                      className="form-control"
                      //onChange={handleChange}
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="dnicom"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact" style={{ height: "15px" }}>
                      {" "}
                      Contact user{" "}
                    </label>
                    <Field
                      name="contact"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="contact"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="eemail" style={{ height: "15px" }}>
                      {" "}
                      Email user{" "}
                    </label>
                    <Field
                      name="eemail"
                      type="email"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="eemail"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="usern" style={{ height: "15px" }}>
                      {" "}
                      Username{" "}
                    </label>
                    <Field
                      name="usern"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="usern"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="roles" style={{ height: "15px" }}>
                      {" "}
                      roles{" <view, edit, admin>"}
                    </label>
                    <Field
                      name="roles"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="roles"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      Password user:
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        style={{ height: "25px" }}
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
                      Confirm Password:
                      <Field
                        name="passconf"
                        type="password"
                        className="form-control"
                        style={{ height: "25px" }}
                      />
                      <ErrorMessage
                        className="error"
                        name="passconf"
                        component="div"
                      />
                    </label>
                  </div>

                  <div className="form-group">
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
