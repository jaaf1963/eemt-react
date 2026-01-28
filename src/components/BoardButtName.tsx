import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

interface buttNameProps {
  id: number | undefined;
  name?: string | undefined;
  title?: string | undefined;
}

const BoardButtNames: React.FC = () => {
  const [buttNameSearch, setButtNameSearch] = useState<buttNameProps[]>([]);
  const [searchNames, setSearchNames] = useState<boolean>(true);
  const [panelTitle, setPanelTitle] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);
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

  const searchButtonsName = async (panelSel: boolean) => {
    //
    // Busca Button Names en DB para seleccion
    //
    if (
      textUserStore !== null &&
      entyUserStore !== null &&
      authUserStore !== null
    ) {
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        //
        const dataButtons = {
          instance: "search_buttnames",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
        };
        const API_URL_BACKEND = `${ubihost}/search_buttonames_react`;
        //const API_URL_BACKEND = "http://localhost:5055/search_buttonames_react";
        //
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(dataButtons),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          const projectResp = await response.json();
          //
          if (projectResp.success === "err") {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          //
          const projs = projectResp.msg;
          setButtNameSearch(projs);
          //
          setSearchNames(false);
          //
        } catch (err: any) {
          //setError(err.message);
          alert("Error al leer panels in DB...");
          //
        } finally {
          //setLoading(false);
        }
      } else {
        alert("Código de Panel es nulo...revisar");
      }
    }
  };
  //
  //
  useEffect(() => {
    //
    searchButtonsName(searchNames);
    //
  }, []);
  //
  //
  const initialValues = {
    entity: "",
    username: "",
    panel: "",
    title: "",
  };

  interface PostData {
    instance?: string;
    entity: string;
    username: string;
    panel: string;
    title: string;
    action?: string;
  }

  const validationSchema = Yup.object().shape({
    panel: Yup.string()
      .test(
        "len",
        "The client-name must be between 2 and 15 characters.",
        (val: any) =>
          val && val.toString().length >= 2 && val.toString().length <= 15,
      )
      .required("This field is required!"),
    title: Yup.string().test(
      "len",
      "The Owner must be between 1 and 25 characters.",
      (val: any) =>
        val && val.toString().length >= 1 && val.toString().length <= 25,
    ),
  });
  //
  // se asigna PostData a formValue para igualar las variables
  // al desEstructurar los valores ingresados por el usuario
  const handleRegisterPanel = async (formValue: PostData) => {
    //
    if (
      textRoleStore !== null &&
      entyUserStore !== null &&
      textUserStore !== null &&
      authUserStore !== null
    ) {
      //
      if (textRoleStore === "admin" || textRoleStore === "moder") {
        //
        const {
          //entity,
          //username,
          panel,
          title,
        } = formValue;
        //
        if (panel.slice(0, 2) !== "--") {
          const postData: PostData = {
            instance: "panel_update",
            entity: entyUserStore,
            username: textUserStore,
            panel: panel,
            title: title,
            action: "UPDATE",
          };
          //
          const API_URL_BACKEND = `${ubihost}/update_buttonames_react`;
          //const API_URL_BACKEND = ubihost + "/update_buttonames_react";
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
              //
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
    }
  };
  //
  //
  return (
    <div className="col-md-12">
      <h4>Buton names</h4>
      <div className="card card-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegisterPanel}
          //handleChange
          //touched
          //{({ handleChange, values, touched, errors }) => (
        >
          {({ setFieldValue }) => (
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="panel" style={{ height: "15px" }}>
                      Panel
                    </label>
                    <Field
                      as="select"
                      name="panel"
                      onChange={(
                        event: React.ChangeEvent<HTMLSelectElement>,
                      ) => {
                        //
                        const tar = event.target.value;
                        const foundOption = buttNameSearch.find(
                          (option) => option.name === tar,
                        );
                        if (foundOption) {
                          const panelDeLaOp = foundOption.name;
                          const tituloDeLaOp = foundOption.title;
                          // Puedes usar las variables panelDeLaOpcion y tituloDeLaOpcion
                          if (tituloDeLaOp) {
                            setPanelTitle(tituloDeLaOp);
                          }
                          setFieldValue("panel", panelDeLaOp);
                          //
                        }
                      }}
                    >
                      <option value={panelTitle}>
                        - - - - - - Select panel - - - - - -
                      </option>

                      {/* Opción por defecto */}
                      {buttNameSearch.map((option) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="panel"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="title" style={{ height: "15px" }}>
                      {" "}
                      Panel title{" "}
                    </label>
                    <Field
                      name="title"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new title"
                    />
                    <label
                      style={{
                        backgroundColor: "lightcyan",
                        fontStyle: "italic",
                        color: "brown",
                        marginTop: "5px",
                      }}
                    >
                      {panelTitle}
                    </label>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="alert alert-danger"
                    />

                    <ErrorMessage
                      name="hpanel"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <p style={{ marginTop: "40px" }}> </p>

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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BoardButtNames;
