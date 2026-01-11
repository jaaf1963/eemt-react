import React, { useState, FormEvent } from "react";
import ButtonsTableImage from "../services/buttonTableImage";
import ButtonsPanelImage from "../services/buttonPanelImage";
import "../styles/InputGroup.css";
//import { srv_host } from "../types/user.type";

//const posic = Number(srv_host[0]);
//const ubihost = srv_host[posic];
let apiUrlSrv;
apiUrlSrv = process.env.REACT_LOC_API_URL;
if (Number(apiUrlSrv) === 1) {
  apiUrlSrv = process.env.REACT_APP_API_URL;
}
const ubihost = apiUrlSrv;

// Define el tipo para los datos del formulario
interface FormData {
  cbutton: string;
  nbutton: string;
  panel: string;
  level: string;
  type: string;
  buttsize: string;
  classnam: string;
  status: string;
}

const PrjFlow = () => {
  // Estado para los datos del formulario
  //const [adminUserRole, setAdminUserRole] = useState<boolean>(false);
  //const [moderUserRole, setModerUserRole] = useState<boolean>(false);
  const [panelButtons, setPanelButtons] = useState<string[]>([]);
  //
  const [error, setError] = useState<string | null>(null);
  //
  const [activesino, setActivesino] = useState(false);
  const [visiblesino, setVisiblesino] = useState(false);
  //const [classnam, setClassnam] = useState<string>("inactive");
  const [statusss, setStatusss] = useState<string>("inactive");
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
  const [inputsData, setInputsData] = useState<FormData>({
    cbutton: "",
    nbutton: "",
    panel: "",
    level: "",
    type: "",
    buttsize: "",
    classnam: "inactive",
    status: "inactive",
  });

  const getPanelButtons = async (panelSel: string) => {
    //
    if (
      textUserStore !== null &&
      entyUserStore !== null &&
      authUserStore !== null &&
      panelSel !== ""
    ) {
      if (textRoleStore === "admin" || textRoleStore === "moder") {
        //
        const dataPanel = {
          buttext: "panel_buttons",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
          buttpane: panelSel,
        };
        const API_URL_BACKEND = ubihost + "/select_panel_butts_react";
        //
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(dataPanel),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          const panelResp = await response.json();
          //
          if (panelResp.success === "err") {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          //
          const butts = panelResp.msg;
          setPanelButtons(butts);
          //
          //setUser(data);
        } catch (err: any) {
          //setError(err.message);
          alert("Error al leer buttons panel...");
          //
        } finally {
          //setLoading(false);
        }
      } else {
        alert("Código de Panel es nulo...revisar");
      }
    }
  };

  function validateNumber(inpValue: string, min: number, max: number) {
    const numValue = Number(inpValue);
    //const min = 10;
    //const max = 100;
    if (Number.isNaN(numValue)) {
      setError("Por favor, introduce un número válido.");
      return false;
      //
    } else if (numValue < min || numValue > max) {
      setError(`El valor debe estar entre ${min} y ${max}.`);
      return false;
      //
    } else {
      setError(null); // Limpiar error si es válido
      return true;
      //
    }
  }

  // Maneja los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //setClassnam("inactivo");
    setStatusss("inactivo");
    const { name, value } = e.target;
    //
    if (value === "") {
      setError(null); // Limpiar error si está vacío
      return;
    }
    //
    if (name === "panel") {
      //
      let valid = validateNumber(value, 1, 3);
      if (valid) {
        setInputsData({
          ...inputsData, // Copia el estado actual
          [name]: value, // Actualiza la propiedad correspondiente
        });
      }
      //
      getPanelButtons(value);
      //
    } else if (name === "nbutton") {
      //
      if (value !== "") {
        setInputsData({
          ...inputsData, // Copia el estado actual
          [name]: value.toUpperCase().replace(/[^A-Z0-9]/g, ""), // Actualiza la propiedad correspondiente
        });
      } else {
        setInputsData({
          ...inputsData, // Copia el estado actual
          [name]: "", // Actualiza la propiedad correspondiente
        });
      }
      //
    } else {
      //
      if (name === "classnam") {
        setActivesino(false);
        //const value2 = "inactivo";
        setInputsData({
          ...inputsData, // Copia el estado actual
          [name]: "classname", // Actualiza la propiedad correspondiente
        });
        //
      } else if (name === "status") {
        //
        setVisiblesino(!visiblesino);
        //let value2 = "Apagado"; //gris
        setStatusss("inactive");
        if (!visiblesino) {
          setStatusss("active");
        }
        setInputsData({
          ...inputsData, // Copia el estado actual
          [name]: statusss, // Actualiza la propiedad correspondiente
        });
        //
      } else if (name === "cbutton") {
        //
        let valid = validateNumber(value, 1, 9);
        if (valid) {
          setInputsData({
            ...inputsData, // Copia el estado actual
            [name]: value, // Actualiza la propiedad correspondiente
          });
        }
        //
      } else if (name === "level") {
        //
        let valid = validateNumber(value, 0, 5);
        if (valid) {
          setInputsData({
            ...inputsData, // Copia el estado actual
            [name]: value, // Actualiza la propiedad correspondiente
          });
        }
        //
      } else if (name === "type") {
        //
        let valid = validateNumber(value, 0, 3);
        if (valid) {
          setInputsData({
            ...inputsData, // Copia el estado actual
            [name]: value, // Actualiza la propiedad correspondiente
          });
        }
        //
      } else {
        //
        // Resto de Inputs
        setInputsData({
          ...inputsData, // Copia el estado actual
          [name]: value, // Actualiza la propiedad correspondiente
        });
      }
    }
    //
  };
  //
  // Maneja el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene la recarga de la página
    //

    const userStore = localStorage.getItem("username");
    const roleStore = localStorage.getItem("role");
    const entyStore = localStorage.getItem("entity");
    const authStore = localStorage.getItem("token");
    //console.log(roleStore, entyStore, userStore, authStore);
    //
    if (
      roleStore &&
      entyStore !== null &&
      userStore !== null &&
      authStore !== null
    ) {
      //setTextUserStore(userStore);
      //const adm: boolean = roleStore === "admin";
      //const mod: boolean = roleStore === "moder";
      //setAdminUserRole(adm);
      //setModerUserRole(mod);
      setTextUserStore(userStore);
      setEntyUserStore(entyStore);
      setAuthUserStore(authStore);
      //dataUser(entyStore, userStore);
      //console.log("adminRole:", adminUserRole);
      //console.log("moderRole:", moderUserRole);
      //console.log(textUserStore);
      //console.log(entyUserStore);
      //setShowAdminBoard(adminUserRole);
      //
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        // Creamos un FormData para enviar los archivos
        //const formData = new FormData();
        //
        //console.log("formValues:", inputsData);
        const data = {
          buttext: "buttons_send",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
          buttcode: inputsData.cbutton,
          buttname: inputsData.nbutton,
          buttpane: inputsData.panel,
          buttleve: inputsData.level,
          buttypee: inputsData.type,
          buttsize: inputsData.buttsize,
          buttclas: inputsData.classnam,
          buttstat: inputsData.status,
        };
        //
        const API_URL_BACKEND = ubihost + "/insert_button_react";
        // Send data to Backend
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          //
          if (response.ok) {
            const result = await response.json();
            console.log("Datos enviados con éxito:", result);
            //
            // Opcional: limpiar el formulario o redirigir
            setInputsData({
              cbutton: "",
              nbutton: "",
              panel: "",
              level: "",
              type: "",
              buttsize: "",
              classnam: "",
              status: "",
            });
            //setClassnam("inactivo");
            setStatusss("inactivo");
            //
          } else {
            console.error("Error al enviar los datos");
          }
          //
        } catch (error) {
          //
          console.error("Error al generar solicitud:", error);
        }
        //
      } else {
        //
        alert("No tiene privilegios para modificar la informacion.");
      }
    }
  };
  //
  return (
    <div className="input-group-container">
      <h4>Creación Estructura de Botones por Panel.</h4>
      <div style={{ display: "flex" }}>
        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: "beige", width: "550px" }}
        >
          <div className="input-grid-btns">
            <div>
              <label className="input-label" htmlFor="panel">
                Código de Panel{" "}
              </label>
              <input
                type="number"
                id="panel"
                name="panel"
                min="1"
                max="3"
                value={inputsData.panel}
                onChange={handleChange}
                required
                className="input-field"
              />{" "}
              panels = [ 1, 2, 3 ]
            </div>

            <div>
              <label className="input-label" htmlFor="cbutton">
                Código del Botón{" "}
              </label>
              <input
                type="number"
                id="cbutton"
                name="cbutton"
                min="1"
                max="9"
                value={inputsData.cbutton}
                onChange={handleChange}
                required
                className="input-field"
              />{" "}
              names = [ 1 - 9 ]
            </div>

            <div>
              <label className="input-label" htmlFor="nbutton">
                Nombre del Botón{" "}
              </label>
              <input
                type="text"
                id="nbutton"
                name="nbutton"
                placeholder="RI, ECAP, SEO"
                value={inputsData.nbutton}
                onChange={handleChange}
                required
                className="input-field"
              />{" "}
              "Espacio" para limpiar
            </div>

            <div>
              <label className="input-label" htmlFor="level">
                Nivel del Botón{" "}
              </label>
              <input
                type="number"
                id="level"
                name="level"
                min="0"
                max="1"
                value={inputsData.level}
                onChange={handleChange}
                required
                className="input-field"
              />{" "}
              levels = [ 0, 5 ]
            </div>

            <div>
              <label className="input-label" htmlFor="type">
                Posición de botón{" "}
              </label>
              <input
                type="number"
                id="type"
                name="type"
                min="1"
                max="3"
                value={inputsData.type}
                onChange={handleChange}
                required
                className="input-field"
              />{" "}
              spot = [ 1, 2, 3 ]
            </div>

            <div>
              <label className="input-label" htmlFor="buttsize">
                Ancho de botón{" "}
              </label>
              <input
                type="number"
                id="buttsize"
                name="buttsize"
                min="10"
                max="96"
                value={inputsData.buttsize}
                onChange={handleChange}
                required
                className="input-field"
              />{" "}
              10% - 96%
            </div>

            <div>
              <label className="input-label" htmlFor="classnam">
                Activo yes/no ?{" "}
              </label>
              <input
                type="checkbox"
                id="classnam"
                name="classnam"
                value={inputsData.classnam}
                onChange={handleChange}
                required
                className="input-field"
                disabled
              />
              {!activesino ? <span> Inactivo</span> : <span> Activado</span>}
            </div>

            <div>
              <label className="input-label" htmlFor="status">
                Apagado yes/no ?{" "}
              </label>
              <input
                type="checkbox"
                id="status"
                name="status"
                value={inputsData.status}
                onChange={handleChange}
                className="input-field"
              />
              {!visiblesino ? (
                <span> Activo ( verde )</span>
              ) : (
                <span> Apagado ( gris )</span>
              )}
            </div>
          </div>
          <button className="button-send" type="submit">
            Guardar
          </button>
          <p style={{ marginLeft: "10px", marginTop: "30px" }}>
            Lista botones del panel: [ <strong> {panelButtons} </strong> ]
          </p>
          <p>
            {error && (
              <p style={{ marginLeft: "10px", color: "red" }}>{error}</p>
            )}
          </p>
        </form>
        <div style={{ display: "block" }}>
          <div>
            <ButtonsTableImage />
          </div>
          <div>
            <ButtonsPanelImage />
          </div>
        </div>
      </div>
      <span>
        Como se aprecia en la botonera del lado derecho los botones pueden ir de
        forma individual o en bloque.
      </span>
      <p>
        Ejemplo: ( BTN1 ) , ( BTN1, BTN2, BTN3, BTN4 ) , ( BTN1... ). Se aplica
        un color de sombra distinto a cada grupo de botones.
      </p>
      <b>Eso es: un botón Padre puede tener uno o mas botones Hijos.</b>
      <p>
        Level = 0, indica que es un botón individual. Level = 1, para indica que
        el botón va en grupo.
      </p>
    </div>
  );
};

export default PrjFlow;
