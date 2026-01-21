import React, { useState, useEffect } from "react";
//import { Formik, Field, Form, ErrorMessage } from "formik";
//import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProjectImage from "../services/projectImage";

interface clieProps {
  id?: number | undefined;
  cup: string;
  client?: string | undefined;
  codeprj: string | undefined;
  proyec?: string | undefined;
  tiproy?: string | undefined;
  activity?: string | undefined;
  dnicom?: string | undefined;
  owner?: string | undefined;
  contact?: string | undefined;
  email?: string | undefined;
  country?: string | undefined;
  usercpny?: string | undefined;
  dateing?: string | undefined;
  status?: string | undefined;
  avance?: string | undefined;
}

const BoardProject: React.FC = () => {
  const [clientsGet, setClientsGet] = useState<clieProps[]>([]);
  const [estaVisible, setEstaVisible] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [showClient, setShowClient] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [ubihost, setHubihost] = useState<string>("");
  //
  const [projecInp, setProjecInp] = useState<string>("");
  const [clientInp, setClientInp] = useState<string>("");
  const [themeInp, setThemeInp] = useState<string>("");
  const [siglaInp, setSiglaInp] = useState<string>("");
  const [descripInp, setDescripInp] = useState<string>("");
  const [observInp, setObservInp] = useState<string>("");
  const [avanceInp, setAvanceInp] = useState<string>("");
  const [dateini, setDateini] = useState<string>("");
  const [datefin, setDatefin] = useState<string>("");
  const [selecDateIni, setSelecDateIni] = useState<Date | null>(null);
  const [selecDateEnd, setSelecDateEnd] = useState<Date | null>(null);
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
      srhtext: "search_segfin",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      //client: clientSel,
    };
    const API_URL_BACKEND = `${ubihost}/search_segfin_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_segfin_react";
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
  /*
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
    avance: "",
  };
  */
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
    avance: string;
  }

  // se asigna PostData a formValue para igualar las variables
  // al desEstructurar los valores ingresados por el usuario
  //   const handleClick = () => {
  //  const handleRegisterProject = async (formValue: PostData) => {
  const handleRegisterProject = async () => {
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
        if (clientInp.trim() !== "") {
          const postData: PostData = {
            instance: "project",
            entity: entyUserStore,
            userna: textUserStore,
            project: projecInp,
            codeprj: "UPDATE",
            client: clientInp,
            theme: themeInp,
            sigla: siglaInp,
            descrip: descripInp,
            observ: observInp,
            avance: avanceInp,
            dateini: dateini,
            datefin: datefin,
          };
          //
          const API_URL_BACKEND = `${ubihost}/insert_project_react`;
          //const API_URL_BACKEND = "http://localhost:5055/insert_project_react";
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
        } else {
          alert("Debe seleccionar un Cliente para actualizar.");
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
  //const handleSegfinClients = async (clients: object) => {
  //
  //  alert(clients);
  //
  //};
  //
  const handleChangeClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClientInp(event.target.value);
  };
  //
  const handleChangeProjec = (event: React.ChangeEvent<HTMLDataElement>) => {
    setProjecInp(event.target.value);
  };
  //
  const handleChangeTheme = (event: React.ChangeEvent<HTMLDataElement>) => {
    setThemeInp(event.target.value);
  };
  //
  const handleChangeSigla = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSiglaInp(event.target.value);
  };
  //
  const handleChangeAvance = (event: React.ChangeEvent<HTMLDataElement>) => {
    setAvanceInp(event.target.value);
  };
  //
  // Función para manejar el cambio de la 'Observacion'
  /*
  const handleChangeDescrip = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      //setDescrProj(e.target.value);
      descriPrj = e.target.value;
      setDescrProj(descriPrj);
    }
  };
  */
  //
  //  onChange={(avance) => setAvance(avance)}
  //
  // {!successful && (
  //
  return (
    <>
      <h4>Project entry</h4>
      <div className="card card-container">
        <ProjectImage />
        <div>
          <div className="form-group">
            <label htmlFor="client" style={{ height: "15px" }}>
              Client name
            </label>
            <select
              id="flavor-select"
              value={clientInp}
              onChange={handleChangeClient}
            >
              {clientsGet.map((option) => (
                <option
                  key={option.id}
                  value={
                    option.cup +
                    "|" +
                    option.client +
                    "|" +
                    option.proyec +
                    "|" +
                    option.tiproy
                  }
                >
                  {option.client} | {option.cup}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="project" style={{ height: "15px" }}>
              {" "}
              Project name{" "}
            </label>
            <input
              name="project"
              type="text"
              value={siglaInp}
              className="form-control"
              onChange={handleChangeProjec}
              style={{ height: "25px" }}
            />
          </div>
          <div>
            <label htmlFor="theme" style={{ height: "15px" }}>
              {" "}
              Project theme ( glosa... )
            </label>
            <input
              name="theme"
              type="text"
              value={themeInp}
              className="form-control"
              onChange={handleChangeTheme}
              style={{ height: "25px" }}
            />
          </div>
          <div>
            <label htmlFor="sigla" style={{ height: "15px" }}>
              {" "}
              Project Type ( Estudio, Ensayo, ... )
            </label>
            <input
              name="sigla"
              type="text"
              value={siglaInp}
              className="form-control"
              onChange={handleChangeSigla}
              style={{ height: "25px" }}
            />
          </div>

          <div>
            <label htmlFor="avance" style={{ height: "15px" }}>
              {" "}
              Project advance ( 0, 10, 20, ... )
            </label>
            <input
              name="avance"
              type="text"
              value={avanceInp}
              className="form-control"
              onChange={handleChangeAvance}
              style={{ height: "25px" }}
            />
          </div>

          <div>
            <label className="label-date-project">
              Init project
              <DatePicker
                className="picker-date-project"
                selected={selecDateIni}
                // Actualiza el estado con la nueva fecha
                onChange={(date) => setSelecDateIni(date)}
                dateFormat="yyyy-MM-dd"
                isClearable
                placeholderText="Fecha inicio"
              />
            </label>{" "}
            <label className="label-date-project">
              Final project
              <DatePicker
                className="picker-date-project"
                selected={selecDateEnd}
                // Actualiza el estado con la nueva fecha
                onChange={(date) => setSelecDateEnd(date)}
                dateFormat="yyyy-MM-dd"
                isClearable
                placeholderText="Fecha limite"
              />
            </label>
            <div className="form-group">
              <label htmlFor="descrip" style={{ height: "15px" }}>
                {" "}
                Project description{" "}
              </label>
              <textarea
                name="descrip"
                className="form-control"
                style={{ height: "25px" }}
              />
            </div>
            <div>
              <label htmlFor="observ" style={{ height: "15px", color: "red" }}>
                {" "}
                Project observation{" "}
              </label>
              <textarea
                name="observ"
                className="form-control"
                style={{ height: "25px" }}
              />
            </div>
            <div className="form-group"></div>
            <p> </p>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={handleRegisterProject}
              >
                Send Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardProject;
