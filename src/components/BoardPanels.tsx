import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import PanelsImage from "../services/panelsImage";

interface panelProps {
  id: number | undefined;
  spanel?: string | undefined;
  panel?: string | undefined;
  ptitle?: string | undefined;
  pwidth?: string | undefined;
  pheigh?: string | undefined;
  bcolor?: string | undefined;
  pfontt?: string | undefined;
  psizee?: string | undefined;
  pcolor?: string | undefined;
}

const BoardPanels: React.FC = () => {
  const [panelSearch, setPanelSearch] = useState<panelProps[]>([]);
  const [searchPanel, setSearchPanel] = useState<boolean>(true);
  const [panelTitle, setPanelTitle] = useState<string>("");
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
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const searchPanels = async (panelSel: boolean) => {
    //
    // Busca paneles en DB para seleccion
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
        //
        const API_URL_BACKEND = `${ubihost}/search_titlespanel_react`;
        //const API_URL_BACKEND ="http://localhost:5055/search_titlespanel_react";
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
          alert("Error al leer panels en DB...");
          //
        } finally {
          setPanelTitle("");
          //setLoading(false);
        }
      } else {
        alert("No se pudo acreditar Login...revisar");
      }
    }
  };
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
    searchPanels(searchPanel);
    //
  }, []);
  //

  const initialValues = {
    entity: "",
    username: "",
    spanel: "",
    panel: "",
    ptitle: "",
    wpanel: "",
    hpanel: "",
    bpanel: "",
    fpanel: "",
    zpanel: "",
    cpanel: "",
  };

  interface PostData {
    instance?: string;
    entity: string;
    username: string;
    panel: string;
    ptitle: string;
    wpanel: string;
    hpanel: string;
    bpanel: string;
    fpanel: string;
    zpanel: string;
    cpanel: string;
    action?: string;
  }

  const validationSchema = Yup.object().shape({
    /*
    spanel: Yup.string()
      .test(
        "len",
        "The Panel must be between 1 and 10 characters.",
        (val: any) =>
          val && val.toString().length >= 1 && val.toString().length <= 10
      )
      .required("This field is required!"),
      */
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
          ptitle,
          wpanel,
          hpanel,
          bpanel,
          fpanel,
          zpanel,
          cpanel,
        } = formValue;
        //
        if (panel.slice(0, 2) !== "--") {
          const postData: PostData = {
            instance: "panel_update",
            entity: entyUserStore,
            username: textUserStore,
            panel: panel,
            ptitle: ptitle,
            wpanel: wpanel,
            hpanel: hpanel,
            bpanel: bpanel,
            fpanel: fpanel,
            zpanel: zpanel,
            cpanel: cpanel,
            action: "UPDATE",
          };
          //
          const API_URL_BACKEND = ubihost + "/update_panel_react";
          //const API_URL_BACKEND = "http://localhost:5055/update_panel_react";
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
                    <label htmlFor="spanel" style={{ height: "15px" }}>
                      Panel
                    </label>
                    <Field
                      as="select"
                      name="spanel"
                      onChange={(
                        event: React.ChangeEvent<HTMLSelectElement>,
                      ) => {
                        //
                        const tar = event.target.value;
                        const foundOption = panelSearch.find(
                          (option) => option.panel === tar,
                        );
                        if (foundOption) {
                          //const spanelDeLaOp = foundOption.spanel;
                          /*
                          const panelDeLaOp = foundOption.panel;
                          const tituloDeLaOp = foundOption.ptitle;
                          */
                          // Puedes usar las variables panelDeLaOpcion y tituloDeLaOpcion
                          //console.log(panelDeLaOp); // 'B'
                          /*
                          if (tituloDeLaOp) {
                            setPanelTitle(tituloDeLaOp);
                          }
                          setFieldValue("panel", panelDeLaOp);
                          //
                          //console.log(  "Panel seleccionado:", event.target.value);
                          */
                        }
                      }}
                    >
                      <option value={panelTitle}>
                        - - - - - - Select panel - - - - - -
                      </option>

                      {/* Opción por defecto */}
                      {panelSearch.map((option) => (
                        <option key={option.id} value={option.panel}>
                          {option.panel}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div>
                    <label htmlFor="panel" style={{ height: "15px" }}>
                      {" "}
                      Panel{" "}
                    </label>
                    <Field
                      name="panel"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new title"
                    />
                    <ErrorMessage
                      name="panel"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="ptitle" style={{ height: "15px" }}>
                      {" "}
                      Panel title{" "}
                    </label>
                    <Field
                      name="ptitle"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new title"
                    />
                    <ErrorMessage
                      name="ptitle"
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
                    <ErrorMessage
                      name="hpanel"
                      component="div"
                      className="alert alert-danger"
                    />

                    <label htmlFor="bpanel" style={{ height: "15px" }}>
                      {" "}
                      <span>Panel backGrowndColor</span>
                      <br></br>
                      <span>( hsla(60, 41%, 93%, 1.00) )</span>
                    </label>
                    <Field
                      name="bpanel"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new bg-color"
                    />
                    <ErrorMessage
                      name="bpanel"
                      component="div"
                      className="alert alert-danger"
                    />

                    <label htmlFor="fpanel" style={{ height: "15px" }}>
                      {" "}
                      Panel Font style ( Normal )
                    </label>
                    <Field
                      name="fpanel"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new style"
                    />
                    <ErrorMessage
                      name="fpanel"
                      component="div"
                      className="alert alert-danger"
                    />

                    <label htmlFor="zpanel" style={{ height: "15px" }}>
                      {" "}
                      Panel Font size ( 6 , 16 ) pixels
                    </label>
                    <Field
                      name="zpanel"
                      type="number"
                      min="6"
                      max="16"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new size font"
                    />
                    <ErrorMessage
                      name="zpanel"
                      component="div"
                      className="alert alert-danger"
                    />

                    <label htmlFor="cpanel" style={{ height: "15px" }}>
                      {" "}
                      <span>Panel Font color</span>
                      <br></br>
                      <span>( hsla(184, 73%, 53%, 1.00) )</span>
                    </label>
                    <Field
                      name="cpanel"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                      placeholder="new color"
                    />
                    <ErrorMessage
                      name="cpanel"
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
