import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProjectImage from "../services/projectImage";
interface PickProp {
  field: any;
  form: any;
  // Puedes añadir más propiedades aqui
}

// Componente de campo de fecha personalizado
const DatePickerField = ({ field, form, ...props }: PickProp) => {
  const { setFieldValue } = form;
  return (
    <DatePicker
      {...field}
      {...props}
      selected={field.value}
      onChange={(val) => setFieldValue(field.name, val)}
      inputFormat="yyyy-MM-dd"
      dateformat="yyyy-MM-dd hh:mm:ss"
      //style={{ width: "270px", height: "25px" }}
    />
  );
};

interface clieProps {
  id?: number | undefined;
  client?: string | undefined;
  activity?: string | undefined;
  dnicom?: string | undefined;
  owner?: string | undefined;
  contact?: string | undefined;
  email?: string | undefined;
  country?: string | undefined;
  usercpny?: string | undefined;
  dateing?: string | undefined;
  status?: string | undefined;
}
interface cmpnyProps {
  id: number | undefined;
  name?: string | undefined;
}

const BoardProject: React.FC = () => {
  const [cmpnySearch, setCmpnySearch] = useState<cmpnyProps[]>([]);
  const [searchCompany, setSearchCompany] = useState<boolean>(true);
  const [clientsGet, setClientsGet] = useState<clieProps[]>([]);
  const [estaVisible, setEstaVisible] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [showClient, setShowClient] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [ubihost, setHubihost] = useState<string>("");
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
  // Inici leyendo Proyectos
  //
  useEffect(() => {
    //
    console.log("hola...");
    //search_Companys(searchCompany);
    //
  }, []);
  //
  //
  const getClients = async () => {
    const dataClient = {
      srhtext: "search_cli",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      //client: clientSel,
    };
    //const API_URL_BACKEND = `${ubihost}/search_clients_react`;
    const API_URL_BACKEND = "http://localhost:5055/search_clients_react";
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
        console.log(clientsGet);
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
  useEffect(() => {
    //
    getClients();
    //
  }, []);
  //
  //
  const initialValues = {
    client: "",
    project: "",
    codeprj: "",
    theme: "",
    sigla: "",
    descrip: "",
    observ: "...",
    dateini: new Date().toString(),
    datefin: new Date().toString(),
  };

  interface PostData {
    instance?: string;
    entity?: string;
    userna?: string;
    client?: string;
    project: string;
    codeprj: string;
    theme: string;
    sigla: string;
    descrip: string;
    observ: string;
    dateini: string;
    datefin: string;
    enttok?: string;
  }

  const validationSchema = Yup.object().shape({
    client: Yup.string()
      .test(
        "len",
        "The client-name must be between 3 and 45 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 45
      )
      .required("This field is required!"),
    project: Yup.string()
      .test(
        "len",
        "The project-name must be between 5 and 35 characters.",
        (val: any) =>
          val && val.toString().length >= 5 && val.toString().length <= 35
      )
      .required("This field is required!"),
    descrip: Yup.string()
      .test(
        "len",
        "The Descrip must be between 2 and 512 characters.",
        (val: any) =>
          val && val.toString().length >= 2 && val.toString().length <= 512
      )
      .required("This field is required!"),
    theme: Yup.string()
      .test(
        "len",
        "The Theme must be between 5 and 128 characters.",
        (val: any) =>
          val && val.toString().length >= 5 && val.toString().length <= 128
      )
      .required("This field is required!"),
    sigla: Yup.string()
      .test(
        "len",
        "The Sigla must be between 3 and 10 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 10
      )
      .required("This field is required!"),
    observ: Yup.string().test(
      "len",
      "The Observ must be between 1 and 256 characters.",
      (val: any) =>
        val && val.toString().length >= 1 && val.toString().length <= 256
    ),
    codeprj: Yup.string().required("This field is required!"),
    dateini: Yup.string().required("This field is required!"),
    datefin: Yup.string().required("This field is required!"),
  });

  // se asigna PostData a formValue para igualar las variables
  // al desEstructurar los valores ingresados por el usuario
  const handleRegisterProject = async (formValue: PostData) => {
    //alert("Register...");
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
          //userna,
          project,
          codeprj,
          client,
          theme,
          sigla,
          descrip,
          observ,
          dateini,
          datefin,
        } = formValue;

        const postData: PostData = {
          instance: "project",
          entity: entyUserStore,
          userna: textUserStore,
          project: project,
          codeprj: codeprj,
          client: client,
          theme: theme,
          sigla: sigla,
          descrip: descrip,
          observ: observ,
          dateini: dateini,
          datefin: datefin,
        };
        //-------------
        //const API_URL_BACKEND = `${ubihost}/insert_project_react`;
        const API_URL_BACKEND = "http://localhost:5055/insert_project_react";
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
            // Handle the successful response for REGISTER
            setMessage("");
            setSuccessful(true);
            //
          } else {
            //
            const respMessage = data.msg;
            //setLoading(false);
            setSuccessful(false);
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
  useEffect(() => {
    //
    //getActivitys();
    setShowClient(true);
    //
  }, [showClient]);
  //
  //
  return (
    <div className="col-md-12">
      <h4>Project entry</h4>

      {/*<div>
        <button
          style={{ marginLeft: "1000px" }}
          className="btn btn-primary btn-block"
          onClick={handleAgregarClients}
        >
          {successful ? "Ver Proyectos" : "Nuevo Proyecto"}
        </button>
      </div> */}

      {/*showClient && !successful && <ProjectsDisplay />*/}

      {!successful && (
        <div className="card card-container">
          <ProjectImage />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegisterProject}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="client" style={{ height: "15px" }}>
                      Client name
                    </label>
                    <Field as="select" name="client">
                      <option value="">
                        - - - - - - Select client - - - - - -
                      </option>{" "}
                      {/* Opcion por defecto */}
                      {clientsGet.map((option) => (
                        <option key={option.id} value={option.client}>
                          {option.client}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="client"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="codeprj"
                      style={{ height: "15px", color: "blue" }}
                    >
                      {" "}
                      New Project code{" "}
                    </label>
                    <Field
                      name="codeprj"
                      type="text"
                      className="form-control"
                      style={{
                        height: "25px",
                        fontWeight: "bold",
                        color: "#611111ff",
                      }}
                    />
                    <ErrorMessage
                      name="codeprj"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div>
                    <label htmlFor="project" style={{ height: "15px" }}>
                      {" "}
                      Project name{" "}
                    </label>
                    <Field
                      name="project"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="project"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div>
                    <label htmlFor="theme" style={{ height: "15px" }}>
                      {" "}
                      Project theme{" "}
                    </label>
                    <Field
                      name="theme"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="theme"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div>
                    <label htmlFor="sigla" style={{ height: "15px" }}>
                      {" "}
                      Project SIGLA{" "}
                    </label>
                    <Field
                      name="sigla"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="sigla"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div>
                    <label htmlFor="dateini" style={{ height: "15px" }}>
                      Date initial project
                    </label>
                    <Field
                      name="dateini"
                      component={DatePickerField}
                      placeholderText="Selecciona una fecha"
                    />
                    <ErrorMessage
                      name="dateini"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div>
                    <label htmlFor="datefin" style={{ height: "15px" }}>
                      Date finish project
                    </label>
                    <Field
                      name="datefin"
                      component={DatePickerField}
                      placeholderText="Selecciona una fecha"
                    />
                    <ErrorMessage
                      name="datefin"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="descrip" style={{ height: "15px" }}>
                      {" "}
                      Project description{" "}
                    </label>
                    <Field
                      as="textarea"
                      name="descrip"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="descrip"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="observ"
                      style={{ height: "15px", color: "red" }}
                    >
                      {" "}
                      Project observation{" "}
                    </label>
                    <Field
                      as="textarea"
                      name="observ"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="observ"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group"></div>
                  <p> </p>
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

export default BoardProject;
