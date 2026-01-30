import React, { useState, useEffect, ChangeEvent } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SegfinImage from "../services/segfinImage";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

/*
interface projProps {
  id?: number | undefined;
  codeprj?: string;
  client?: string | undefined;
  projec?: string | undefined;
  theme?: string | undefined;
  typroj?: string | undefined;
  descrip?: string | undefined;
  observ?: string | undefined;
  advance?: string | undefined;
  dateini?: string | undefined;
  datefin?: string | undefined;
}
*/

interface clieProps {
  id?: number | undefined;
  client?: string | undefined;
  owner?: string | undefined;
  dnicom?: string | undefined;
  contact: string | undefined;
  email?: string | undefined;
  usercpny?: string | undefined;
  activity?: string | undefined;
  country?: string | undefined;
  dateing?: string | undefined;
}

interface segfinProps {
  id?: number | undefined;
  cup?: string | undefined;
  client?: string | undefined;
  //codeprj: string | undefined;
  proyec?: string | undefined;
  tiproy?: string | undefined;
  etapa?: string | undefined;
  estado?: string | undefined;
  clpcom?: string | undefined;
  usdcom?: string | undefined;
  uffcom?: string | undefined;
  ingcom?: string | undefined;
  clppen?: string | undefined;
  usdpen?: string | undefined;
  uffpen?: string | undefined;
  pendie?: string | undefined;
  datein?: string | undefined;
}

const BoardSegfin: React.FC = () => {
  /*
  const [proyectQ, setProyectQ] = useState<string>("");
  const [clienteQ, setClienteQ] = useState<string>("");
  const [tiproyeQ, setTiproyeQ] = useState<string>("");
  const [anoCom1Q, setAnoCom1Q] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [anoCom2Q, setAnoCom2Q] = useState<string>(
    new Date().getFullYear().toString(),
  );
  */
  //
  const [clientsGet, setClientsGet] = useState<clieProps[]>([]);
  const [segfinsGet, setSegfinsGet] = useState<segfinProps[]>([]);
  //const [codeprjNew, setCodeprjNew] = useState<string>("");
  const [codeprjInp, setCodeprjInp] = useState<string>("");
  const [clientInp, setClientInp] = useState<string>("");
  const [nameprjInp, setNameprjInp] = useState<string>("");
  const [typrojInp, setTyprojInp] = useState<string>("");
  const [etapaaInp, setEtapaaInp] = useState<string>("");
  const [clpcomInp, setClpcomInp] = useState<string>("");
  const [usdcomInp, setUsdcomInp] = useState<string>("");
  const [uffcomInp, setUffcomInp] = useState<string>("");
  const [estcomInp, setEstcomInp] = useState<string>("");
  const [clppenInp, setClppenInp] = useState<string>("");
  const [usdpenInp, setUsdpenInp] = useState<string>("");
  const [uffpenInp, setUffpenInp] = useState<string>("");
  const [estpenInp, setEstpenInp] = useState<string>("");
  const [descriInp, setDescriInp] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);
  const [showClient, setShowClient] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  //const [selectedValue, setSelectedValue] = useState<string>(""); // Default to empty string
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
  // Inicia leyendo Proyectos
  //
  const getSegfin_projects = async () => {
    const dataProject = {
      srhtext: "search_segfin",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      codprj: "",
      client: "",
      tiproy: "",
      anoco1: "0",
      anoco2: "9999",
    };
    //
    const API_URL_BACKEND = `${ubihost}/search_segfin_react`;
    //const API_URL_BACKEND = `${ubihost}/gets_projects_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_segfin_projects_react";
    //
    try {
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataProject),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      const segfinResp = await response.json();
      console.log(segfinResp);
      //
      if (segfinResp.success === "err") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Data ClientsGet for map() select
      const segfinData = segfinResp.msg;
      if (segfinData) {
        //
        setSegfinsGet(segfinData);
        //console.log(segfinsGet);
      }
      //
    } catch (err: any) {
      //setError(err.message);
      alert("Error al leer lista de SegFin.");
      //
    } finally {
      setDescriInp("");
      //setLoading(false);
    }
  };
  //
  //
  useEffect(() => {
    //
    getSegfin_projects();
    //
  }, []);
  //
  //
  const initialValues = {
    cup: "",
    client: "",
    proyec: "",
    tiproy: "",
    etapa: "",
    estado: "",
    clpcom: "",
    usdcom: "",
    uffcom: "",
    estcom: "",
    clppen: "",
    usdpen: "",
    uffpen: "",
    pendie: "",
    descri: "",
  };

  interface PostData {
    srhtext?: string;
    entity?: string;
    userna?: string;
    cup?: string;
    client?: string;
    proyec?: string;
    tiproy?: string;
    etapa?: string;
    estado?: string;
    clpcom?: string;
    usdcom?: string;
    uffcom?: string;
    estcom?: string;
    clppen?: string;
    usdpen?: string;
    uffpen?: string;
    pendie?: string;
    descri?: string;
  }

  const validationSchema = Yup.object().shape({
    /*
    client: Yup.string()
      .test(
        "len",
        "The client-name must be between 3 and 45 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 45,
      )
      .required("This field is required!"),

    */
  });

  // se asigna PostData a formValue para igualar las variables
  // al desEstructurar los valores ingresados por el usuario
  const handleRegisterSegfin = async (formValue: PostData) => {
    if (!codeprjInp || !nameprjInp || !clientInp || !typrojInp || !etapaaInp) {
      alert("Debe digitar toda la Identificación del Proyecto.");
      return null;
    }
    if (
      textRoleStore !== null &&
      entyUserStore !== null &&
      textUserStore !== null &&
      authUserStore !== null
    ) {
      //
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        //
        /*
        const {
          //entity,
          //userna,
          cup,
          client,
          proyec,
          tiproy,
          etapa,
          estado,
          clpcom,
          usdcom,
          uffcom,
          estcom,
          clppen,
          usdpen,
          uffpen,
          pendie,
        } = formValue;
         */

        console.log(formValue);

        const postData: PostData = {
          srhtext: "insert_segfin",
          entity: entyUserStore,
          userna: textUserStore,
          cup: codeprjInp,
          client: clientInp,
          proyec: nameprjInp,
          tiproy: typrojInp,
          etapa: etapaaInp,
          estado: estcomInp,
          clpcom: clpcomInp,
          usdcom: usdcomInp,
          uffcom: uffcomInp,
          estcom: estcomInp,
          clppen: clpcomInp,
          usdpen: usdcomInp,
          uffpen: uffcomInp,
          pendie: estpenInp,
          descri: descriInp,
        };
        //
        const API_URL_BACKEND = `${ubihost}/insert_segfin_react`;
        //const API_URL_BACKEND = "http://localhost:5055/insert_segfin_react";
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
            setSuccessful(false);
            setMessage(respMessage);
            console.error("Error al obtener datos:", respMessage);
          }
          //
        } catch (error) {
          setSuccessful(false);
          setMessage("error");
          //console.error("Error en el inicio de sesión:", error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      }
    }
  };
  //
  //
  const getClients = async () => {
    const dataClient = {
      srhtext: "search_cli",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      client: "",
      propie: "",
      activi: "",
    };
    const API_URL_BACKEND = `${ubihost}/search_clients_react`;
    //const API_URL_BACKEND = "http://localhost:5055/search_clients_react";
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
      const cliens = clientsResp.msg;
      if (cliens) {
        //
        setClientsGet(cliens);
        //console.log(cliens);
      }
      //
    } catch (err: any) {
      //setError(err.message);
      alert("Error al leer lista de Clientes.");
      //
    } finally {
      //setLoading(false);
    }
  };
  //
  //
  const changeProject = (valor: string) => {
    //
    const txt = valor.split("|");
    setCodeprjInp(txt[0]);
    setClientInp(txt[1]);
    setNameprjInp(txt[2]);
    setTyprojInp(txt[3]);
    //setThemeInp(txt[4]);
    setEtapaaInp(txt[4]);
    setClpcomInp(txt[5]);
    setUsdcomInp(txt[6]);
    setUffcomInp(txt[7]);
    setEstcomInp(txt[8]);
    setClppenInp(txt[9]);
    setUsdpenInp(txt[10]);
    setUffpenInp(txt[11]);
    setEstpenInp(txt[12]);
  };
  //
  // Handle the change event para lista del Project
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      // Obtiene la lista de datos del Project
      changeProject(event.target.value);
    }
  };
  //
  const handleChangeCup = (e: ChangeEvent<HTMLInputElement>) => {
    setCodeprjInp(e.target.value);
  };
  // Solo el Cliente
  const handleChangeCli = (e: ChangeEvent<HTMLSelectElement>) => {
    setClientInp(e.target.value);
  };
  //
  const handleChangeNanPrj = (e: ChangeEvent<HTMLInputElement>) => {
    setNameprjInp(e.target.value);
  };
  //
  const handleChangeTypPrj = (e: ChangeEvent<HTMLInputElement>) => {
    setTyprojInp(e.target.value);
  };
  //
  const handleChangeEtaPrj = (e: ChangeEvent<HTMLInputElement>) => {
    setEtapaaInp(e.target.value);
  };
  //
  const handleChangeClpCom = (e: ChangeEvent<HTMLInputElement>) => {
    setClpcomInp(e.target.value);
  };
  //
  const handleChangeUsdCom = (e: ChangeEvent<HTMLInputElement>) => {
    setUsdcomInp(e.target.value);
  };
  //
  const handleChangeUffCom = (e: ChangeEvent<HTMLInputElement>) => {
    setUffcomInp(e.target.value);
  };
  //
  const handleChangeEstCom = (e: ChangeEvent<HTMLInputElement>) => {
    setEstcomInp(e.target.value);
  };
  //
  const handleChangeClpPen = (e: ChangeEvent<HTMLInputElement>) => {
    setClppenInp(e.target.value);
  };
  //
  const handleChangeUsdPen = (e: ChangeEvent<HTMLInputElement>) => {
    setUsdpenInp(e.target.value);
  };
  //
  const handleChangeUffPen = (e: ChangeEvent<HTMLInputElement>) => {
    setUffpenInp(e.target.value);
  };
  //
  const handleChangeEstPen = (e: ChangeEvent<HTMLInputElement>) => {
    setEstpenInp(e.target.value);
  };
  //
  // NUEVO PROYECTO
  //
  const handleNuevoProjCode = () => {
    console.log(codeprjInp);
    if (segfinsGet.length) {
      // 1. Extraer (map) y 2. Ordenar descendentemente (sort)
      const codigosLeidos = segfinsGet.map((item) => item.cup);
      // Ordenar de mayor a menor (Z a A)
      const codigosOrdenados = [...codigosLeidos].sort((a, b) =>
        (b || "").localeCompare(a || ""),
      );
      //
      // 2. Rescatar el primer elemento (el mayor)
      const mayorElemento = codigosOrdenados[0];
      //
      if (mayorElemento) {
        //
        let num = mayorElemento.split("-")[1];
        if (num) {
          let n = 1 + Number(num);
          let s = "0000" + n.toString();
          num = "EEMT-" + s.slice(-4);
          //
          //setCodeprjNew(num);
          setCodeprjInp(num);
        }
        //
        //setCodeprjNew(mayorElemento);
        //setCodeprjInp(mayorElemento);
        //
        setClientInp("");
        setNameprjInp("");
        setTyprojInp("");
        //setThemeInp("");
        setEtapaaInp("");
        setClpcomInp("0");
        setUsdcomInp("0");
        setUffcomInp("0");
        setEstcomInp("");
        setClppenInp("0");
        setUsdpenInp("0");
        setUffpenInp("0");
        setEstpenInp("");
      }
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
      <h4>Entrada de información comercial</h4>

      {!successful && (
        <div className="card card-container">
          <SegfinImage />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegisterSegfin}
          >
            <Form>
              {!successful && (
                <div>
                  <div>
                    <div className="">
                      <label htmlFor="cup-select">Seleccione C.U.P.</label>
                      <select
                        id="cup-select"
                        className=""
                        value={codeprjInp}
                        onChange={handleSelectChange}
                        style={{
                          width: "20px",
                          height: "25px",
                          backgroundColor: "#f2f6f9",
                          fontStyle: "normal",
                          border: "0px solid #ccc",
                          borderRadius: "4px",
                          marginLeft: "20px",
                        }}
                      >
                        {/* Optional: Add a default disabled option */}
                        <option value=""> </option> {/* Opcion por defecto */}
                        {segfinsGet.map((option) => (
                          <option
                            key={option.id}
                            value={
                              option.cup +
                              "|" +
                              option.client +
                              "|" +
                              option.proyec +
                              "|" +
                              option.tiproy +
                              "|" +
                              option.etapa +
                              "|" +
                              option.clpcom +
                              "|" +
                              option.usdcom +
                              "|" +
                              option.uffcom +
                              "|" +
                              option.ingcom +
                              "|" +
                              option.clppen +
                              "|" +
                              option.usdpen +
                              "|" +
                              option.uffpen +
                              "|" +
                              option.pendie
                            }
                          >
                            {option.cup}
                          </option>
                        ))}
                      </select>

                      <label></label>
                      <input
                        onClick={handleNuevoProjCode}
                        className="btn-modifi-user"
                        type="button"
                        value="Nuevo"
                        style={{
                          width: "80px",
                          height: "25px",
                          border: "4px",
                          color: "blue",
                          backgroundColor: "#edcacf",
                          marginLeft: "29px",
                          borderRadius: "4px",
                        }}
                      />
                    </div>

                    <Field
                      name="cup"
                      type="text"
                      value={codeprjInp}
                      onChange={handleChangeCup}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "tomato",
                        fontStyle: "italic",
                        fontWeight: "bold",
                      }}
                    />
                    <ErrorMessage
                      name="cup"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <div className="">
                      <label htmlFor="cup-select">Seleccione Cliente</label>
                      <select
                        id="cli-select"
                        className=""
                        value={codeprjInp}
                        onChange={handleChangeCli}
                        style={{
                          width: "20px",
                          height: "25px",
                          backgroundColor: "#f2f6f9",
                          fontStyle: "normal",
                          border: "0px solid #ccc",
                          borderRadius: "4px",
                          marginLeft: "20px",
                        }}
                      >
                        {/* Optional: Add a default disabled option */}
                        <option value=""> </option> {/* Opcion por defecto */}
                        {clientsGet.map((option) => (
                          <option key={option.id} value={option.client}>
                            {option.client}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Field
                      name="clien"
                      type="text"
                      value={clientInp}
                      onChange={handleChangeCli}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "brown",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="clien"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="proyec" style={{ height: "15px" }}>
                      {" "}
                      Nombre Proyecto{" "}
                    </label>
                    <Field
                      name="proyec"
                      type="text"
                      value={nameprjInp}
                      onChange={handleChangeNanPrj}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "blue",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="proyec"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="tiproy" style={{ height: "15px" }}>
                      {" "}
                      Tipo Proyecto: ( Estudio, Ensayo, . . .)
                    </label>
                    <Field
                      name="tiproy"
                      type="text"
                      value={typrojInp}
                      onChange={handleChangeTypPrj}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "blue",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="tiproy"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="etapa" style={{ height: "15px" }}>
                      {" "}
                      Etapa: ( EO , PES, . . . )
                    </label>
                    <Field
                      name="etapa"
                      type="text"
                      value={etapaaInp}
                      onChange={handleChangeEtaPrj}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "blue",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="etapa"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="clpcom" style={{ height: "15px" }}>
                      {" "}
                      Valor CLP${" "}
                    </label>
                    <Field
                      name="clpcom"
                      type="text"
                      value={clpcomInp}
                      onChange={handleChangeClpCom}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "blue",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="clpcom"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="usdcom" style={{ height: "15px" }}>
                      {" "}
                      Valor USD${" "}
                    </label>
                    <Field
                      name="usdcom"
                      type="text"
                      value={usdcomInp}
                      onChange={handleChangeUsdCom}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "blue",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="usdcom"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="uffcom" style={{ height: "15px" }}>
                      {" "}
                      Valor UF${" "}
                    </label>
                    <Field
                      name="uffcom"
                      type="text"
                      value={uffcomInp}
                      onChange={handleChangeUffCom}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "blue",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="uffcom"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="estcom" style={{ height: "15px" }}>
                      {" "}
                      Estado Comercial: ( facturado, porCobrar, desarrollo, . .
                      . )
                    </label>
                    <Field
                      name="estcom"
                      type="text"
                      value={estcomInp}
                      onChange={handleChangeEstCom}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "blue",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="estcom"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="clppen" style={{ height: "15px" }}>
                      {" "}
                      Pendiente CLP${" "}
                    </label>
                    <Field
                      name="clppen"
                      type="text"
                      value={clppenInp}
                      onChange={handleChangeClpPen}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "tomato",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="clppen"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="usdpen" style={{ height: "15px" }}>
                      {" "}
                      Pendiente USD${" "}
                    </label>
                    <Field
                      name="usdpen"
                      type="text"
                      value={usdpenInp}
                      onChange={handleChangeUsdPen}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "tomato",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="usdpen"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="uffpen" style={{ height: "15px" }}>
                      {" "}
                      Pendiente UF${" "}
                    </label>
                    <Field
                      name="uffpen"
                      type="text"
                      value={uffpenInp}
                      onChange={handleChangeUffPen}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "tomato",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="uffpen"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="status" style={{ height: "15px" }}>
                      {" "}
                      Instancia de cobro{" "}
                    </label>
                    <Field
                      name="status"
                      type="text"
                      value={estpenInp}
                      onChange={handleChangeEstPen}
                      className="form-control"
                      style={{
                        height: "25px",
                        color: "brown",
                        fontStyle: "italic",
                      }}
                    />
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className=""></div>
                  <p> </p>
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

export default BoardSegfin;
