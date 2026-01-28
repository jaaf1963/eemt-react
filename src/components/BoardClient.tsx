import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import CompanyImage from "../services/clientImage";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

interface entypeProps {
  id: number | undefined;
  name?: string | undefined;
  descrip?: string | undefined;
}

const BoardClient: React.FC = () => {
  const [activityGet, setActivityGet] = useState<entypeProps[]>([]);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [showClient, setShowClient] = useState<boolean>(false);
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
    entity: "",
    username: "",
    activity: "",
    company: "",
    dnicom: "",
    owner: "",
    country: "",
    contact: "",
    eemail: "",
    usercpy: "",
    password: "",
    passconf: "",
    dataini: new Date().toString(),
    dataend: new Date().toString(),
  };

  interface PostData {
    instance?: string;
    entity: string;
    username: string;
    activity: string;
    company: string;
    dnicom: string;
    owner: string;
    country: string;
    contact: string;
    eemail: string;
    usercpy?: string;
    password?: string;
    passconf?: string;
    dataini?: string;
    dataend?: string;
  }

  const validationSchema = Yup.object().shape({
    company: Yup.string()
      .test(
        "len",
        "The company-name must be between 3 and 35 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 35,
      )
      .required("This field is required!"),
    dnicom: Yup.string()
      .test(
        "len",
        "The Owner must be between 9 and 15 characters.",
        (val: any) =>
          val && val.toString().length >= 9 && val.toString().length <= 15,
      )
      .required("This field is required!"),
    owner: Yup.string()
      .test(
        "len",
        "The Owner must be between 3 and 35 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 35,
      )
      .required("This field is required!"),
    country: Yup.string()
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
  });
  //
  // se asigna PostData a formValue para igualar las variables
  // al desEstructurar los valores ingresados por el usuario
  const handleRegisterClient = async (formValue: PostData) => {
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
          //username,
          activity,
          company,
          dnicom,
          owner,
          country,
          contact,
          eemail,
        } = formValue;

        const postData: PostData = {
          instance: "insert_cli",
          entity: entyUserStore,
          username: textUserStore,
          activity: activity,
          company: company, // client
          dnicom: dnicom,
          owner: owner,
          country: country,
          contact: contact,
          eemail: eemail,
          usercpy: eemail,
        };
        //
        const API_URL_BACKEND = `${ubihost}/insert_client_react`;
        //const API_URL_BACKEND = "http://localhost:5055/insert_client_react";
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
          //console.log("Registro exitoso:", data);
          // Aquí puedes manejar la respuesta del servidor (por ejemplo, guardar un token)
          //
          if (data) {
            //
            setMessage("");
            setSuccessful(true);
            setShowClient(true);
            //
          } else {
            //
            const respMessage = data.msg;
            setSuccessful(false);
            setShowClient(false);
            setMessage(respMessage);
            console.error("Error al obtener datos:", respMessage);
          }
          //
        } catch (error) {
          setSuccessful(false);
          setMessage("error");
          console.error("Error en el inicio de sesión:", error);
        }
      }
    }
    //
  };
  //
  //
  const getActivitys = async () => {
    if (
      textUserStore !== null &&
      entyUserStore !== null &&
      authUserStore !== null
      // && clientSel !== ""
    ) {
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        const dataClient = {
          srhtext: "search_acty",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
          //client: clientSel,
        };
        const API_URL_BACKEND = `${ubihost}/search_activity_react`;
        //const API_URL_BACKEND = "http://localhost:5055/search_activity_react";
        //
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(dataClient),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          const activityResp = await response.json();
          //
          if (activityResp.success === "err") {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const activityGets = activityResp.msg;
          setActivityGet(activityGets);
          //
        } catch (err: any) {
          //setError(err.message);
          alert("Error al leer Activity...");
          //
        } finally {
          //setLoading(false);
        }
      } else {
        alert("Código deactivity es nulo...revisar");
      }
    }
  };
  //
  //
  useEffect(() => {
    //
    getActivitys();
    setShowClient(true);
    //
  }, [showClient]);
  //
  //
  return (
    <div className="col-md-12">
      <h4>Registro de Clientes</h4>

      {!successful && (
        <div className="card card-container">
          <CompanyImage />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegisterClient}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="">
                    <label htmlFor="activity" style={{ height: "15px" }}>
                      Actividad
                    </label>
                    <Field as="select" name="activity" className="form-control">
                      <option value="">
                        - - - - - - Selec actividad - - - - - -
                      </option>{" "}
                      {/* Opción por defecto */}
                      {/* entypeOptions.map((option) */}
                      {activityGet.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.descrip}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="activity"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" style={{ height: "15px" }}>
                      {" "}
                      Nombre cliente{" "}
                    </label>
                    <Field
                      name="company"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="company"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="dnicom" style={{ height: "15px" }}>
                      {" "}
                      R.U.T. cliente{" "}
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

                  <div className="">
                    <label htmlFor="owner" style={{ height: "15px" }}>
                      {" "}
                      Propietario{" "}
                    </label>
                    <Field
                      name="owner"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="owner"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="country" style={{ height: "15px" }}>
                      {" "}
                      País cliente{" "}
                    </label>
                    <Field
                      name="country"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="contact" style={{ height: "15px" }}>
                      {" "}
                      Contacto client{" "}
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

                  <div className="">
                    <label htmlFor="eemail" style={{ height: "15px" }}>
                      {" "}
                      Email cliente{" "}
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

                  <p></p>
                  <div className="">
                    <button type="submit" className="btn btn-primary btn-block">
                      Enviar Datos
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

export default BoardClient;
