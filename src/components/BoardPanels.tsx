import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import PanelsImage from "../services/panelsImage";
//import { srv_host } from "../types/user.type";

//const posic = Number(srv_host[0]);
//const ubihost = srv_host[posic];
let apiUrlSrv;
apiUrlSrv = process.env.REACT_LOC_API_URL;
if (Number(apiUrlSrv) === 1) {
  apiUrlSrv = process.env.REACT_APP_API_URL;
}
const ubihost = apiUrlSrv;

interface panelProps {
  id: number | undefined;
  name?: string | undefined;
  title?: string | undefined;
  wpanel?: string | undefined;
  hpanel?: string | undefined;
}

const BoardPanels: React.FC = () => {
  const [panelSearch, setPanelSearch] = useState<panelProps[]>([]);
  const [searchPanel, setSearchPanel] = useState<boolean>(true);
  const [panelTitle, setPanelTitle] = useState<string>("");
  const [panelWidth, setPanelWidth] = useState<string>("");
  const [panelHeight, setPanelHeight] = useState<string>("");
  //const [panelBgColor, setPanelBgColor] = useState<string>("");
  //const [panelFntColor, setPanelFntColor] = useState<string>("");
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
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const searchPanels = async (panelSel: boolean) => {
    //
    // Busca paneles en DB para seleccion
    //
    if (
      textUserStore !== null &&
      entyUserStore !== null &&
      authUserStore !== null
    ) {
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        //
        const dataPanel = {
          instance: "titles_panel",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
        };
        const API_URL_BACKEND = ubihost + "/search_titlespanel_react";
        //
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(dataPanel),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          const panelsResp = await response.json();
          //
          if (panelsResp.success === "err") {
            //throw new Error(`HTTP error! status: ${response.status}`);
            alert(panelsResp.msg[0]);
            //
          } else {
            //
            const panels = panelsResp.msg;
            //console.log(panels);
            setPanelSearch(panels);
            //
            setSearchPanel(false);
            //
          }
        } catch (err: any) {
          //setError(err.message);
          alert("Error al leer panels in DB...");
          //
        } finally {
          //setLoading(false);
        }
      } else {
        alert("No se pudo acreditar Login...revisar");
      }
    }
  };

  //
  useEffect(() => {
    //
    searchPanels(searchPanel);
    //
  }, []);
  //

  const initialValues = {
    entity: "",
    username: "",
    panel: "",
    title: "",
    wpanel: "",
    hpanel: "",
  };

  interface PostData {
    instance?: string;
    entity: string;
    username: string;
    panel: string;
    title: string;
    wpanel: string;
    hpanel: string;
    action?: string;
  }

  const validationSchema = Yup.object().shape({
    panel: Yup.string()
      .test(
        "len",
        "The client-name must be between 2 and 15 characters.",
        (val: any) =>
          val && val.toString().length >= 2 && val.toString().length <= 15
      )
      .required("This field is required!"),
    title: Yup.string().test(
      "len",
      "The Owner must be between 1 and 25 characters.",
      (val: any) =>
        val && val.toString().length >= 1 && val.toString().length <= 25
    ),
    wpanel: Yup.number()
      .test(
        "len",
        "The widthpanel must be between 100 and 550 characters.",
        (val: any) => val && val >= 100 && val <= 550
      )
      .required("This field is required!"),
    hpanel: Yup.number()
      .test(
        "len",
        "The heightpanel must be between 200 and 999 characters.",
        (val: any) => val && val >= 200 && val <= 999
      )
      .required("This field is required!"),
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
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        //
        const {
          //entity,
          //username,
          panel,
          title,
          wpanel,
          hpanel,
        } = formValue;
        //
        if (panel.slice(0, 2) !== "--") {
          const postData: PostData = {
            instance: "panel_update",
            entity: entyUserStore,
            username: textUserStore,
            panel: panel,
            title: title,
            wpanel: wpanel,
            hpanel: hpanel,
            action: "UPDATE",
          };
          //-------------
          const API_URL_REGISTER = ubihost + "/update_panel_react";
          //
          try {
            const response = await fetch(API_URL_REGISTER, {
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
    //
    //

    //
    //
  };
  //
  //
  return (
    <div className="col-md-12">
      <h4>Panels system</h4>
      <div className="card card-container">
        <PanelsImage />
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
                        event: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        //
                        const tar = event.target.value;
                        const foundOption = panelSearch.find(
                          (option) => option.name === tar
                        );
                        if (foundOption) {
                          const panelDeLaOp = foundOption.name;
                          const tituloDeLaOp = foundOption.title;
                          const wpanelDeLaOp = foundOption.wpanel;
                          const hpanelDeLaOp = foundOption.hpanel;
                          // Puedes usar las variables panelDeLaOpcion y tituloDeLaOpcion
                          //console.log(panelDeLaOp); // 'B'
                          if (tituloDeLaOp) {
                            setPanelTitle(tituloDeLaOp);
                          }
                          setFieldValue("panel", panelDeLaOp);
                          //
                          if (wpanelDeLaOp) {
                            setPanelWidth(wpanelDeLaOp);
                          }
                          if (hpanelDeLaOp) {
                            setPanelHeight(hpanelDeLaOp);
                          }
                          //console.log(  "Panel seleccionado:", event.target.value);
                        }
                      }}
                    >
                      <option value={panelTitle}>
                        - - - - - - Select panel - - - - - -
                      </option>

                      {/* Opción por defecto */}
                      {panelSearch.map((option) => (
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

                    <label htmlFor="wpanel" style={{ height: "15px" }}>
                      {" "}
                      Panel width ( 265 , 550 ) pixels
                    </label>
                    <Field
                      name="wpanel"
                      type="number"
                      min="100"
                      max="700"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new width"
                    />
                    <label
                      style={{
                        backgroundColor: "lightcyan",
                        fontStyle: "italic",
                        color: "brown",
                        marginTop: "5px",
                      }}
                    >
                      {panelWidth}
                    </label>
                    <ErrorMessage
                      name="wpanel"
                      component="div"
                      className="alert alert-danger"
                    />

                    <label htmlFor="hpanel" style={{ height: "15px" }}>
                      {" "}
                      Panel height ( 500 , 900 ) pixels
                    </label>
                    <Field
                      name="hpanel"
                      type="number"
                      min="200"
                      max="999"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new height"
                    />
                    <label
                      style={{
                        backgroundColor: "lightcyan",
                        fontStyle: "italic",
                        color: "brown",
                        marginTop: "5px",
                      }}
                    >
                      {panelHeight}
                    </label>
                    <ErrorMessage
                      name="hpanel"
                      component="div"
                      className="alert alert-danger"
                    />

                    <label htmlFor="bgpanel" style={{ height: "15px" }}>
                      {" "}
                      <span>Panel backGrowndColor</span>
                      <br></br>
                      <span>( hsla(60, 41%, 93%, 1.00) )</span>
                    </label>
                    <Field
                      name="bgpanel"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new bg-color"
                    />
                    <label
                      style={{
                        backgroundColor: "lightcyan",
                        fontStyle: "italic",
                        color: "brown",
                        marginTop: "5px",
                      }}
                    >
                      {/*panelBgColor*/}
                    </label>
                    <ErrorMessage
                      name="bgpanel"
                      component="div"
                      className="alert alert-danger"
                    />

                    <label htmlFor="fntpanel" style={{ height: "15px" }}>
                      {" "}
                      Panel Font style ( Normal )
                    </label>
                    <Field
                      name="fntpanel"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new style"
                    />
                    <label
                      style={{
                        backgroundColor: "lightcyan",
                        fontStyle: "italic",
                        color: "brown",
                        marginTop: "5px",
                      }}
                    >
                      {/*panelFntColor*/}
                    </label>
                    <ErrorMessage
                      name="fntpanel"
                      component="div"
                      className="alert alert-danger"
                    />

                    <label htmlFor="fntcolor" style={{ height: "15px" }}>
                      {" "}
                      <span>Panel Font color</span>
                      <br></br>
                      <span>( hsla(184, 73%, 53%, 1.00) )</span>
                    </label>
                    <Field
                      name="fntcolor"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new color"
                    />
                    <label
                      style={{
                        backgroundColor: "lightcyan",
                        fontStyle: "italic",
                        color: "brown",
                        marginTop: "5px",
                      }}
                    >
                      {/*panelFntColor*/}
                    </label>
                    <ErrorMessage
                      name="fntcolor"
                      component="div"
                      className="alert alert-danger"
                    />
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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BoardPanels;
