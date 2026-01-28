import React, { useState, useEffect, ChangeEvent } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SegfinImage from "../services/segfinImage";
const ubihost = process.env.REACT_APP_API_URL;
//const apiKey = process.env.REACT_APP_API_KEY;

interface clieProps {
  id?: number | undefined;
  cup?: string | undefined;
  client?: string | undefined;
  codeprj: string | undefined;
  proyec?: string | undefined;
  tiproy?: string | undefined;
  datein?: string | undefined;
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
  estcom?: string | undefined;
  clppen?: string | undefined;
  usdpen?: string | undefined;
  uffpen?: string | undefined;
  status?: string | undefined;
  datein?: string | undefined;
}

const BoardSegfin: React.FC = () => {
  const [proyectQ, setProyectQ] = useState<string>("");
  const [clienteQ, setClienteQ] = useState<string>("");
  const [tiproyeQ, setTiproyeQ] = useState<string>("");
  const [anoCom1Q, setAnoCom1Q] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [anoCom2Q, setAnoCom2Q] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [clientsGet, setClientsGet] = useState<clieProps[]>([]);
  const [segfinsGet, setSegfinsGet] = useState<segfinProps[]>([]);
  const [codeprjInp, setCodeprjInp] = useState<string>("");
  //const [clientInp, setClientInp] = useState<string>("");
  //const [nameprjInp, setNameprjInp] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);
  const [showClient, setShowClient] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>(""); // Default to empty string
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
  // Inici leyendo Proyectos
  //
  useEffect(() => {
    //
    console.log("hola...");
    //search_Companys(searchCompany);
    setProyectQ("");
    setClienteQ("");
    setTiproyeQ("");
    setAnoCom1Q("");
    setAnoCom2Q("");
    //
  }, []);
  //
  //
  const getSegfins = async () => {
    const dataClient = {
      srhtext: "search_segfin",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      codprj: proyectQ,
      client: clienteQ,
      tiproy: tiproyeQ,
      anoco1: anoCom1Q,
      anoco2: anoCom2Q,
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
      const segfinResp = await response.json();
      //
      if (segfinResp.success === "err") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Data ClientsGet for map() select
      const segfins = segfinResp.msg;
      if (segfins) {
        //
        setSegfinsGet(segfins);
        //setEstaVisible(true);
        console.log(segfinsGet);
      }
      //
    } catch (err: any) {
      //setError(err.message);
      alert("Error al leer lista de SegFin.");
      //
    } finally {
      //setLoading(false);
    }
  };
  //
  //
  useEffect(() => {
    //
    getSegfins();
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
    status: "",
  };

  interface PostData {
    instance?: string;
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
    status?: string;
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
          status,
        } = formValue;

        const postData: PostData = {
          instance: "segfin",
          entity: entyUserStore,
          userna: textUserStore,
          proyec: proyec,
          client: client,
          cup: cup,
          tiproy: tiproy,
          etapa: etapa,
          estado: estado,
          clpcom: clpcom,
          usdcom: usdcom,
          uffcom: uffcom,
          estcom: estcom,
          clppen: clppen,
          usdpen: usdpen,
          uffpen: uffpen,
          status: status,
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
      const segfins = clientsResp.msg;
      if (segfins) {
        //
        setClientsGet(segfins);
        console.log(clientsGet);
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
    //
  };
  //
  // Handle the change event
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    //
    changeProject(event.target.value);
    //
    console.log("Selected value:", event.target.value);
  };
  //
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCodeprjInp(e.target.value);
  };
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
                      <label htmlFor="fruit-select">Proyecto</label>
                      <select
                        id="fruit-select"
                        className="form-control"
                        value={selectedValue}
                        onChange={handleSelectChange}
                      >
                        {/* Optional: Add a default disabled option */}
                        <option value="" disabled>
                          - - - - - - Selec proyecto - - - - - -
                        </option>
                        {segfinsGet.map((option) => (
                          <option
                            key={option.id}
                            value={option.cup + "|" + option.client}
                          >
                            {option.client} | {option.cup}
                          </option>
                        ))}
                      </select>
                    </div>

                    <label htmlFor="cup" style={{ height: "15px" }}>
                      {" "}
                      C. U. P.{" "}
                    </label>
                    <Field
                      name="cup"
                      type="text"
                      value={codeprjInp}
                      onChange={handleChange}
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="cup"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="client" style={{ height: "15px" }}>
                      Cliente
                    </label>
                    <Field as="select" name="client" className="form-control">
                      <option value="">
                        - - - - - - Selec cliente - - - - - -
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

                  <div>
                    <label htmlFor="proyec" style={{ height: "15px" }}>
                      {" "}
                      Nombre Proyecto{" "}
                    </label>
                    <Field
                      name="proyec"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
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
                      className="form-control"
                      style={{ height: "25px" }}
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
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="etapa"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="estado" style={{ height: "15px" }}>
                      {" "}
                      Desarrollo: ( enCurso, aprobado, . . . )
                    </label>
                    <Field
                      name="estado"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="estado"
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
                      className="form-control"
                      style={{ height: "25px" }}
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
                      className="form-control"
                      style={{ height: "25px" }}
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
                      className="form-control"
                      style={{ height: "25px" }}
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
                      className="form-control"
                      style={{ height: "25px" }}
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
                      className="form-control"
                      style={{ height: "25px" }}
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
                      className="form-control"
                      style={{ height: "25px" }}
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
                      className="form-control"
                      style={{ height: "25px" }}
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
                      className="form-control"
                      style={{ height: "25px" }}
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
