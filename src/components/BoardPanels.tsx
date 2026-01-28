import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import PanelsImage from "../services/panelsImage";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

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
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  //const [ubihost, setHubihost] = useState<string>("");
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
      <h4>Estructura de Paneles</h4>
      <div className="card card-container">
        <PanelsImage />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegisterPanel}
          //{({ handleChange, values, touched, errors }) => (
        >
          {({ setFieldValue }) => (
            <Form>
              {!successful && (
                <div>
                  <div className="">
                    <label htmlFor="spanel" style={{ height: "15px" }}>
                      Paneles
                    </label>
                    <Field
                      as="select"
                      name="spanel"
                      className="form-control"
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
                        }
                      }}
                    >
                      <option value={panelTitle}>
                        - - - - - - Selec panel - - - - - -
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
                      Titulo del panel{" "}
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
                      Ancho del Panel ( 265 , 550 ) pixels
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
                      Alto del Panel ( 500 , 900 ) pixels
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
                      <span>Color fondo del panel</span>
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
                      Tipo de Letra panel ( Normal )
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
                      Tamaño letra del Panel ( 6 , 16 ) pixels
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
                      <span>Color letra del Panel</span>
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

                  <div className="">
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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BoardPanels;
