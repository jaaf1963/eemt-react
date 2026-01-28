import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProjectImage from "../services/projectImage";
import dayjs from "dayjs";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

interface segfinProps {
  id?: number | undefined;
  cup: string;
  client?: string | undefined;
  proyec?: string | undefined;
  tiproy?: string | undefined;
  etapa?: string | undefined;
  instan?: string | undefined;
  clpcom?: string | undefined;
  usdcom?: string | undefined;
  uffcom?: string | undefined;
  ingcom?: string | undefined;
  clppen?: string | undefined;
  usdpen?: string | undefined;
  uffpen?: string | undefined;
  pendie?: string | undefined;
  datein?: string | undefined;
  datemv?: string | undefined;
  anofin: string | undefined;
  mesfin: string | undefined;
}

interface projProps {
  id?: number | undefined;
  codeprj: string;
  projec?: string | undefined;
  client?: string | undefined;
  theme?: string | undefined;
  typroj?: string | undefined;
  descrip?: string | undefined;
  observ?: string | undefined;
  advance: string;
  dateini?: string | undefined;
  datefin?: string | undefined;
  quedan?: string | undefined;
}

const BoardProject: React.FC = () => {
  const [projectsGet, setProjectsGet] = useState<projProps[]>([]);
  const [showClient, setShowClient] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  //
  const [codeprjInp, setCodeprjInp] = useState<string>("");
  const [clientInp, setClientInp] = useState<string>("");
  const [nameprjInp, setNameprjInp] = useState<string>("");
  const [themeInp, setThemeInp] = useState<string>("");
  const [typrojInp, setTyprojInp] = useState<string>("");
  const [avanceInp, setAvanceInp] = useState<string>("");
  const [descripInp, setDescripInp] = useState<string>("");
  const [observInp, setObservInp] = useState<string>("");
  const [dateinInp, setDateinInp] = useState<string>("");
  const [datefiInp, setDatefiInp] = useState<string>("");
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
  // Lectura para Selects
  const gets_Projects = async () => {
    const dataSegfin = {
      srhtext: "gets_projs",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      //proct: clientSel,
    };
    //
    const API_URL_BACKEND = `${ubihost}/gets_projects_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_segfin_react";
    //
    try {
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataSegfin),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      const projsResp = await response.json();
      //
      if (projsResp.success === "err") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Data segfinsGet for map() select
      const projs = projsResp.msg;
      if (projs) {
        //
        setProjectsGet(projs);
        //
        console.log(projs);
      }
      //
    } catch (err: any) {
      //setError(err.message);
      alert("Error al leer lista de proyectos.");
      //
    } finally {
      //setLoading(false);
    }
  };
  //
  //
  useEffect(() => {
    //
    gets_Projects();
    //
  }, []);
  //
  //
  interface PostData {
    instance?: string;
    entity?: string;
    userna?: string;
    codeprj: string;
    client?: string;
    project: string;
    theme: string;
    typroj: string;
    descrip: string;
    observ: string;
    avance?: string;
    dateini?: string;
    datefin?: string;
    accion: string;
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
        let fecIni = "";
        const datein = selecDateIni;
        if (datein !== null) {
          fecIni = dayjs(datein).format("YYYY/MM/DD");
          fecIni = fecIni.toString();
        }
        //
        let fecFin = "";
        const datefi = selecDateEnd;
        if (datefi !== null) {
          fecFin = dayjs(datefi).format("YYYY/MM/DD");
          fecFin = fecFin.toString();
        }
        //
        if (clientInp.trim() !== "") {
          const postData: PostData = {
            instance: "project",
            entity: entyUserStore,
            userna: textUserStore,
            project: nameprjInp,
            codeprj: codeprjInp,
            client: clientInp,
            theme: themeInp,
            typroj: typrojInp,
            descrip: descripInp,
            observ: observInp,
            avance: avanceInp,
            dateini: fecIni,
            datefin: fecFin,
            accion: "UPDATE",
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
            //
            if (!response.ok) {
              // Manejar errores del servidor
              throw new Error(`Error del servidor: ${response.status}`);
            }
            //
            const data = await response.json();
            //
            if (data) {
              //
              setMessage("");
              //
            } else {
              //
              const respMessage = data.msg;
              setMessage(respMessage);
              console.error("Error al obtener datos:", message);
            }
            //
          } catch (error) {
            setMessage("error");
            console.error("Error en el inicio de sesión:", error);
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
    setShowClient(true);
    //
  }, [showClient]);
  //
  //
  const changeProject = (valor: string) => {
    //
    const txt = valor.split("|");
    setCodeprjInp(txt[0]);
    setClientInp(txt[1]);
    setNameprjInp(txt[2]);
    setTyprojInp(txt[3]);
    setThemeInp(txt[4]);
    setAvanceInp(txt[5]);
    setDescripInp(txt[6]);
    setObservInp(txt[7]);
    setDateinInp(txt[8]);
    setDatefiInp(txt[9]);
    //
  };
  //
  const handleChangeProjec = (event: React.ChangeEvent<HTMLDataElement>) => {
    if (event.target.value) {
      changeProject(event.target.value);
    }
  };
  //
  const handleChangeTheme = (event: React.ChangeEvent<HTMLDataElement>) => {
    setThemeInp(event.target.value);
  };
  //
  const handleChangeTyproj = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTyprojInp(event.target.value);
  };
  //
  const handleChangeAvance = (event: React.ChangeEvent<HTMLDataElement>) => {
    setAvanceInp(event.target.value);
  };
  //
  const handleChangeDescrip = (event: React.ChangeEvent<HTMLDataElement>) => {
    setDescripInp(event.target.value);
  };
  //
  const handleChangeObserv = (event: React.ChangeEvent<HTMLDataElement>) => {
    setObservInp(event.target.value);
  };
  //
  //
  return (
    <>
      <h4>Planificación de Proyectos</h4>
      <div className="card card-container">
        <ProjectImage />
        <div>
          <div>
            <label htmlFor="codeprjInp" style={{ height: "15px" }}></label>
            <select
              id="flavor-select"
              className="form-control"
              value={codeprjInp}
              onChange={handleChangeProjec}
            >
              <option value="">- - - - - - Selec proyecto - - - - - -</option>{" "}
              {projectsGet.map((option) => (
                <option
                  key={option.id}
                  value={
                    option.codeprj +
                    "|" +
                    option.client +
                    "|" +
                    option.projec +
                    "|" +
                    option.typroj +
                    "|" +
                    option.theme +
                    "|" +
                    option.advance +
                    "|" +
                    option.descrip +
                    "|" +
                    option.observ +
                    "|" +
                    option.dateini +
                    "|" +
                    option.datefin
                  }
                >
                  {option.codeprj} | {option.client}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="codeprj" style={{ height: "15px" }}>
              {" "}
              Código proyecto{" "}
            </label>
            <input
              name="codeprj"
              type="text"
              value={codeprjInp}
              className="form-control"
              style={{
                height: "25px",
                color: "tomato",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            />
          </div>

          <div>
            <label htmlFor="client" style={{ height: "15px" }}>
              {" "}
              Clente{" "}
            </label>
            <input
              name="client"
              type="text"
              value={clientInp}
              className="form-control"
              style={{ height: "25px", color: "blue", fontStyle: "italic" }}
            />
          </div>

          <div>
            <label htmlFor="nameprj" style={{ height: "15px" }}>
              {" "}
              Nombre proyecto{" "}
            </label>
            <input
              name="nameprj"
              type="text"
              value={nameprjInp}
              className="form-control"
              style={{ height: "25px", color: "blue", fontStyle: "italic" }}
            />
          </div>

          <div>
            <label htmlFor="theme" style={{ height: "15px" }}>
              {" "}
              Tema proyecto ( glosa... )
            </label>
            <input
              name="theme"
              type="text"
              value={themeInp}
              className="form-control"
              onChange={handleChangeTheme}
              style={{ height: "25px", color: "blue", fontStyle: "italic" }}
            />
          </div>
          <div>
            <label htmlFor="typroj" style={{ height: "15px" }}>
              {" "}
              Tipo proyecto ( Estudio, Ensayo, ... )
            </label>
            <input
              name="typroj"
              type="text"
              value={typrojInp}
              className="form-control"
              onChange={handleChangeTyproj}
              style={{ height: "25px", color: "blue", fontStyle: "italic" }}
            />
          </div>

          <div>
            <label htmlFor="avance" style={{ height: "15px" }}>
              {" "}
              Avance Proyecto ( 0, 10, 20, ... )
            </label>
            <input
              name="avance"
              type="text"
              value={avanceInp}
              className="form-control"
              onChange={handleChangeAvance}
              style={{ height: "25px", color: "blue" }}
            />
          </div>

          <div>
            <label className="label-date-project">
              Inicio Proyecto / {dateinInp}
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
              Entrega Proyecto / {datefiInp}
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
            <div>
              <label htmlFor="descrip" style={{ height: "15px" }}>
                {" "}
                Descripción Proyecto{" "}
              </label>
              <textarea
                name="descrip"
                value={descripInp}
                onChange={handleChangeDescrip}
                className="form-control"
                style={{ height: "25px", color: "blue" }}
              />
            </div>
            <div>
              <label htmlFor="observ" style={{ height: "15px", color: "red" }}>
                {" "}
                Observación Proyecto{" "}
              </label>
              <textarea
                name="observ"
                value={observInp}
                onChange={handleChangeObserv}
                className="form-control"
                style={{ height: "25px", color: "brown" }}
              />
            </div>
            <div className="form-group"></div>
            <p> </p>
            <div className="">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={handleRegisterProject}
              >
                Enviar Datos
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardProject;
