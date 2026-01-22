import React, { useState, useEffect, FormEvent } from "react";
import ButtonsTableImage from "../services/buttonTableImage";
import ButtonsPanelImage from "../services/buttonPanelImage";
import "../styles/InputGroup.css";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

const panels = [
  { label: "CEM Y OTROS", value: "1_CEM Y OTROS" },
  { label: "REQUISITOS PES", value: "2_REQUISITOS_PES" },
  { label: "REQUISITOS EO", value: "3_REQUISITOS_EO" },
];

const types = [
  { label: "Lonely", value: "0_lonely" },
  { label: "Header", value: "1_header" },
  { label: "Group", value: "2_group" },
];

const groups = [
  { label: "Group1", value: "1_group1" },
  { label: "Group2", value: "2_group2" },
  { label: "Group3", value: "3_group3" },
  { label: "Group4", value: "4_group4" },
  { label: "Group5", value: "5_group5" },
  { label: "Group6", value: "6_group6" },
  { label: "Group7", value: "7_group7" },
  { label: "Group8", value: "8_group8" },
];

const type_button = [
  { label: "--CEM Definitiva", value: "CEM Definitiva" },
  { label: "--ANIT y PLANOS", value: "ANIT y PLANOS" },
  { label: "DUF", value: "DUF" },
  { label: "ANIT", value: "ANIT" },
  { label: "RI", value: "RI" },
  { label: "Cronograma", value: "Cronograma" },
  { label: "--INFORMACIÓN TÉCNICA", value: "INFORMACIÓN TÉCNICA" },
  { label: "--INFOTÉCNICA PARA ESTUDIOS", value: "INFOTÉCNICA PARA ESTUDIOS" },
  { label: "IT e", value: "IT e" },
  { label: "IT e Inv", value: "IT e Inv" },
  { label: "IT NO DISPONIBLE", value: "IT NO DISPONIBLE" },
  { label: "PO no disponibles", value: "PO no disponibles" },
  { label: "IT no disponible", value: "IT no disponible" },
  { label: "--ESTUDIOS DE INERCONEXIÓN", value: "ESTUDIOS DE INTERCONEXIÓN" },
  { label: "ECAP", value: "ECAP" },
  { label: "ECC", value: "ECC" },
  { label: "ECA", value: "ECA" },
  { label: "EMT", value: "EMT" },
  { label: "ERV", value: "ERV" },
  { label: "--SCADA Y MEDIDAS", value: "SCADA Y MEDIDAS" },
  { label: "--SITR", value: "SITR" },
  { label: "--EME", value: "EME" },
  { label: "Enlace", value: "Enlace" },
  { label: "DIR/TAG", value: "DIR/TAG" },
  { label: "Fecha Pruebas", value: "Fecha Pruebas" },
  { label: "Pruebas", value: "Pruebas" },
  { label: "--OTRO PES", value: "OTRO PES" },
  { label: "PO N", value: "PO N" },
  { label: "Prot E", value: "Prot E" },
  { label: "Prot P", value: "Prot P" },
  { label: "Plan Ener Tx", value: "Plan Ener Tx" },
  { label: "GM", value: "GM" },
  { label: "Carta SEC", value: "Carta SEC" },
  { label: "--PLATAFORMAS PES", value: "PLATAFORMAS PES" },
  { label: "Neomantes", value: "Neomantes" },
  { label: "--PLATAFORMAS EO", value: "PLATAFORMAS EO" },
  { label: "REUC", value: "REUC" },
  { label: "P. Pagos", value: "P. Pagos" },
  { label: "--OTROS EO", value: "OTROS EO" },
  { label: "PO E", value: "PO E" },
  { label: "IT PES", value: "IT PES" },
  { label: "Pruebas End to End", value: "Pruebas End to End" },
  { label: "--REPORTES DEL PROCESO", value: "REPORTES DEL PROCESO" },
  { label: "Reporte IT Estudios", value: "Reporte IT Estudios" },
  { label: "Reporte PES", value: "Reporte PES" },
  { label: "Reporte EO", value: "Reporte EO" },
  //{ label: "", value: "" },
  //{ label: "", value: "" },
];

interface groupProps {
  id: number | undefined;
  name?: string | undefined;
  label?: string | undefined;
}

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
  const [panelss, setPanelss] = useState<string[]>([]);
  const [groupss, setGroupss] = useState<groupProps[]>([]);
  //const [ubihost, setUbihost] = useState<string>("");
  //
  const [selecTexPanel, setSelecTexPanel] = useState("");
  const [selecNumPanel, setSelecNumPanel] = useState(0);
  const [selecTexButton, setSelecTexButton] = useState("");
  const [selecNumButton, setSelecNumButton] = useState(0);
  const [selecTexLevel, setSelecTexLevel] = useState("");
  const [selecNumLevel, setSelecNumLevel] = useState(0);
  const [selecTexSpot, setSelecTexSpot] = useState("");
  const [selecNumSpot, setSelecNumSpot] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
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
    buttsize: "46",
    classnam: "inactive",
    status: "inactive",
  });
  //
  //
  /*
  useEffect(() => {
    let numApp = process.env.REACT_APP_NUM;
    if (Number(numApp) === 1) {
      // api web
      const ubiho = process.env.REACT_APP_API_URL;
      //
      if (ubiho) {
        setUbihost(ubiho);
      }
    } else {
      // local
      const ubiho = process.env.REACT_APP_LOC;
      //
      if (ubiho) {
        setUbihost(ubiho);
      }
    }
    //
  }, []);
  */
  //
  //---- Lee paneles al entrar
  //
  const getPanels = async (panelSel: string) => {
    if (
      textUserStore !== null &&
      entyUserStore !== null &&
      authUserStore !== null &&
      panelSel !== ""
    ) {
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        const dataPanel = {
          buttext: "panel_buttons",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
          pansel: panelSel,
        };
        //
        const API_URL_BACKEND = `${ubihost}/select_panels_react`;
        //const API_URL_BACKEND ="http://localhost:5055/select_panels_react";
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
          const panes = panelResp.msg;
          setPanelss(panes);
          //
        } catch (err: any) {
          //setError(err.message);
          alert("Error al leer buttons panel...");
          //
        } finally {
          //setLoading(false);
        }
      } else {
        alert("No se pudo acreditar Login...revisar");
      }
    }
  };

  //---- Lee buttons segun grupoSel

  const getGroups = async (groupSel: string) => {
    if (
      textUserStore !== null &&
      entyUserStore !== null &&
      authUserStore !== null &&
      groupSel !== ""
    ) {
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        const dataGroup = {
          grotext: "group_buttons",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
          pansel: selecNumPanel,
          grpsel: groupSel,
        };
        //
        const API_URL_BACKEND = `${ubihost}/select_buttons_group_react`;
        //const API_URL_BACKEND ="http://localhost:5055/select_buttons_group_react";
        //
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(dataGroup),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          const grpbuttResp = await response.json();
          //
          if (grpbuttResp.success === "err") {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          //
          const grpbutts = grpbuttResp.msg;
          //
          //
          setGroupss(grpbutts);
          //
        } catch (err: any) {
          //setError(err.message);
          alert("Error al leer group buttons panel...");
          //
        } finally {
          //setLoading(false);
        }
      } else {
        alert("No se pudo acreditar Login...revisar");
      }
    }
  };

  //----

  function validateNumber(inpValue: string, min: number, max: number) {
    const numValue = Number(inpValue);
    if (Number.isNaN(numValue)) {
      setError("Por favor, introduce un número válido.");
      return false;
      //
    } else if (numValue < min || numValue > max) {
      setError(`El valor debe estar entre ${min} y ${max}.`);
      return false;
      //
    } else {
      // Limpiar error si es valido
      setError(null);
      return true;
    }
  }
  //
  const handlePanelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //console.log("Opción seleccionada:", event.target.value);
    let panelSel = event.target.value;
    //
    const num = Number(panelSel.slice(0, 1));
    const txt = panelSel.slice(2, panelSel.length);
    setSelecNumPanel(num);
    setSelecTexPanel(txt);
    //console.log("Button seleccionado:", panelSel);
  };
  //
  const handleTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //console.log("Opción seleccionada:", event.target.value);
    let typeSel = event.target.value;
    //
    const num = Number(typeSel.slice(0, 1));
    const txt = typeSel.slice(2, typeSel.length);
    setSelecNumLevel(num);
    setSelecTexLevel(txt);
    //console.log("Type seleccionado:", typeSel);
  };
  //
  const handleGroupSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //console.log("Opción seleccionada:", event.target.value);
    let groupSel = event.target.value;
    //
    const num = Number(groupSel.slice(0, 1));
    const txt = groupSel.slice(2, groupSel.length);
    setSelecNumSpot(num);
    setSelecTexSpot(txt);
    //console.log("Type seleccionado:", groupSel);
    //
    // Get Buttons by Panel an Group in Backend
    //
    getGroups(num.toString());
    //
    //
  };
  //
  const handleButtonGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //console.log("Opción seleccionada:", event.target.value);
    let buttonSel = event.target.value;
    //
    const num = Number(buttonSel.slice(0, 1));
    const txt = buttonSel.slice(2, buttonSel.length);
    setSelecNumButton(num);
    setSelecTexButton(txt);
    //console.log("Button seleccionado:", buttonSel);
  };
  //
  const handleButtonItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let itemSel = event.target.value;
    //
    const num = 1 + groupss.length;
    //const num = Number(itemSel.slice(0, 1));
    //const txt = buttonSel.slice(2, buttonSel.length);
    setSelecNumButton(num);
    //setSelecTexButton(txt);
    setSelecTexButton(itemSel);
    //console.log("Item seleccionado:", itemSel);
  };
  //
  // Maneja los cambios en los inputs
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          // Actualiza la propiedad correspondiente
          [name]: value,
        });
      }
      //
      // Get Panels from DB
      //
      getPanels(value);
      //
      //
    } else if (name === "level") {
      //
      let valid = validateNumber(value, 0, 5);
      if (valid) {
        setInputsData({
          ...inputsData, // Copia el estado actual
          // Actualiza la propiedad correspondiente
          [name]: value,
        });
        //
        // Get Buttons by Panel an Group
        //
        getGroups(value);
        //
        //
      }
      //
    } else if (name === "nbutton") {
      //
      if (value !== "") {
        setInputsData({
          ...inputsData, // Copia el estado actual
          // Actualiza la propiedad correspondiente
          [name]: value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
        });
      } else {
        setInputsData({
          ...inputsData, // Copia el estado actual
          // Actualiza la propiedad correspondiente
          [name]: "",
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
          // Actualiza la propiedad correspondiente
          [name]: "classname",
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
          // Actualiza la propiedad correspondiente
          [name]: statusss,
        });
        //
      } else if (name === "cbutton") {
        //
        let valid = validateNumber(value, 1, 9);
        if (valid) {
          setInputsData({
            ...inputsData, // Copia el estado actual
            // Actualiza la propiedad correspondiente
            [name]: value,
          });
        }
        //
      } else if (name === "type") {
        //
        let valid = validateNumber(value, 0, 3);
        if (valid) {
          setInputsData({
            ...inputsData, // Copia el estado actual
            // Actualiza la propiedad correspondiente
            [name]: value,
          });
        }
        //
      } else {
        //
        // Resto de Inputs
        setInputsData({
          ...inputsData, // Copia el estado actual
          // Actualiza la propiedad correspondiente
          [name]: value,
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
    if (
      textRoleStore &&
      entyUserStore !== null &&
      textUserStore !== null &&
      authUserStore !== null
    ) {
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
          buttcode: selecNumButton,
          buttname: selecTexButton,
          buttpane: selecNumPanel,
          buttleve: selecNumLevel,
          buttypee: selecNumSpot,
          buttsize: inputsData.buttsize,
          buttclas: "inactive",
          buttstat: "inactive",
          eliminar: isChecked,
        };
        //
        const API_URL_BACKEND = `${ubihost}/insert_button_react`;
        //const API_URL_BACKEND ="http://localhost:5055/insert_button_react";
        //
        // Send data to Backend
        try {
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          //
          if (response.ok) {
            //const result = await response.json();
            //console.log("Datos enviados con éxito:", result);
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
      <h4>Create Buttons Struct for Panel.</h4>
      <div style={{ display: "flex" }}>
        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: "beige", display: "flex" }}
        >
          <div className="input-grid-btns">
            <p></p>
            <div className="div-select">
              <select
                onChange={handlePanelSelect}
                style={{ marginInlineStart: "8px", width: "190px" }}
              >
                <option value="">--- Select Panel ---</option>{" "}
                {/* Opcion por defecto */}
                {panels.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="div-grid-btns">
              <label className="input-label" htmlFor="panel">
                Encabezado de Panel{" "}
              </label>
              <input
                type="text"
                id="paneltext"
                name="paneltext"
                value={selecTexPanel}
                onChange={handleChangeInput}
                //required
                className="input-field-text"
              />{" "}
              <input
                type="number"
                id="panel"
                name="panel"
                min="1"
                max="3"
                value={selecNumPanel}
                //value={inputsData.panel}
                onChange={handleChangeInput}
                required
                className="input-field-num"
              />{" "}
              <span className="span-text-input">panels = [ 1 - 3 ]</span>
            </div>
            <p></p>

            <div className="div-select">
              <select
                onChange={handleGroupSelect}
                style={{ marginInlineStart: "8px", width: "190px" }}
              >
                <option value="">--- Select group ---</option>{" "}
                {/* Opcion por defecto */}
                {groups.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="div-grid-btns">
              <label className="input-label" htmlFor="type">
                Grupo del botón{" "}
              </label>
              <input
                type="text"
                id="spottext"
                name="spottext"
                value={selecTexSpot}
                onChange={handleChangeInput}
                required
                className="input-field-text"
              />{" "}
              <input
                type="number"
                id="type"
                name="type"
                min="0"
                max="7"
                value={selecNumSpot}
                onChange={handleChangeInput}
                required
                className="input-field-num"
              />{" "}
              <span className="span-text-input">spot = [ 0 - 6 ]</span>
            </div>
            <p></p>

            <div className="div-select">
              <select
                onChange={handleTypeSelect}
                style={{ marginInlineStart: "8px", width: "190px" }}
              >
                <option value="">--- Select type ---</option>{" "}
                {/* Opcion por defecto */}
                {types.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="div-grid-btns">
              <label className="input-label" htmlFor="leveltext">
                Tipo del Botón{" "}
              </label>
              <input
                type="text"
                id="leveltext"
                name="leveltext"
                value={selecTexLevel}
                onChange={handleChangeInput}
                required
                className="input-field-text"
              />{" "}
              <input
                type="number"
                id="level"
                name="level"
                min="0"
                max="3"
                value={selecNumLevel}
                onChange={handleChangeInput}
                required
                className="input-field-num"
              />{" "}
              <span className="span-text-input">levels = [ 0, 3 ]</span>
            </div>
            <p></p>

            <div className="form-group">
              <select
                onChange={handleButtonGroup}
                style={{ marginInlineStart: "8px", width: "190px" }}
              >
                <option value="">--- Select button ---</option>{" "}
                {/* Opcion por defecto */}
                {groupss.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                onChange={handleButtonItem}
                style={{
                  width: "130px",
                  marginLeft: "10px",
                  color: "gray",
                  fontFamily: "monospace",
                  fontSize: "13px",
                }}
              >
                <option value="">-- Items button --</option>{" "}
                {/* Opcion por defecto */}
                {type_button.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="div-grid-btns">
              <label className="input-label" htmlFor="cbuttontext">
                Nombre del Botón{" "}
              </label>
              <input
                type="text"
                id="nbuttontext"
                name="nbuttontext"
                placeholder={selecTexButton}
                value={selecTexButton}
                onChange={handleChangeInput}
                required
                className="input-field-text"
              />{" "}
              <input
                type="number"
                id="cbutton"
                name="cbutton"
                min="1"
                max="9"
                value={selecNumButton}
                onChange={handleChangeInput}
                required
                className="input-field-num"
              />{" "}
              <span className="span-text-input">names = [ text ]</span>
            </div>
            <p></p>

            <div className="div-grid-btns">
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
                onChange={handleChangeInput}
                required
                className="input-field"
              />{" "}
              <span className="span-text-input">10% - 96%</span>
            </div>

            <div className="div-grid-btns">
              <label className="input-label" htmlFor="classnam">
                Activo yes/no ?{" "}
              </label>
              <input
                type="checkbox"
                id="classnam"
                name="classnam"
                value={inputsData.classnam}
                onChange={handleChangeInput}
                required
                className="input-field"
                disabled
              />
              {!activesino ? (
                <span className="span-text-input">Inactivo</span>
              ) : (
                <span className="span-text-input">Activado</span>
              )}
            </div>

            <div className="div-grid-btns">
              <label className="input-label" htmlFor="status">
                <span>Apagado yes/no ? </span>
              </label>
              <input
                type="checkbox"
                id="status"
                name="status"
                checked
                disabled
                value={inputsData.status}
                onChange={handleChangeInput}
                className="input-field"
              />
              {visiblesino ? (
                <span className="span-text-input"> Activo ( verde )</span>
              ) : (
                <span className="span-text-input">Apagado ( gris )</span>
              )}
            </div>
            <div style={{ display: "flex", marginLeft: "50%" }}>
              <label>
                <input
                  className="check-send-delete"
                  type="checkbox"
                  name="elimina"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />{" "}
                Eliminar botón
              </label>
              <button className="button-send-update" type="submit">
                Actualizar
              </button>
            </div>
            <p className="list-buttons">
              Lista botones del panel: [ <strong> {panelss} </strong> ]
            </p>
            <p>
              {error && (
                <p style={{ marginLeft: "10px", color: "red" }}>{error}</p>
              )}
            </p>
          </div>
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
      <span className="span-texts">
        Como se aprecia en la botonera del lado derecho los botones pueden ir de
        forma individual o en bloque.
      </span>
      <p className="span-texts">
        Ejemplo: ( BTN1 ) , ( BTN1, BTN2, BTN3, BTN4 ) , ( BTN1... ). Se aplica
        un color de sombra distinto a cada grupo de botones.
      </p>
      <p className="span-texts">
        <b>Eso es: un botón Padre puede tener uno o mas botones Hijos.</b>
      </p>
      <p className="span-texts">
        Level = 0, indica que es un botón individual. Level = 1, para indica que
        el botón va en grupo.
      </p>
    </div>
  );
};

export default PrjFlow;
