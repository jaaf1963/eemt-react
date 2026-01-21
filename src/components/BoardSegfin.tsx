import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SegfinImage from "../services/segfinImage";

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
// sfn_id sfn_entity sfn_cup sfn_client sfn_projec sfn_tiproy sfn_etapa sfn_esttec sfn_clpcom
// sfn_usdcom sfn_uffcom sfn_estcom sfn_clppen sfn_usdpen sfn_uffpen sfn_status sfn_datein

const BoardSegfin: React.FC = () => {
  const [clientsGet, setClientsGet] = useState<clieProps[]>([]);
  const [segfinsGet, setSegfinsGet] = useState<segfinProps[]>([]);
  const [estaVisible, setEstaVisible] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [showClient, setShowClient] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
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
  const getSegfins = async () => {
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
        setEstaVisible(true);
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
        //-------------
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
            //setLoading(false);
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
  //* cup, client, project, tiproy, etapa, estado, */}
  //* clpcom, usdcom, uffcom, estcom, clppen, usdpen, uffpen, status, */}
  //
  //
  const getClients = async () => {
    const dataClient = {
      srhtext: "search_cli",
      entity: entyUserStore,
      userna: textUserStore,
      authen: authUserStore,
      //client: clientSel,
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
        setEstaVisible(true);
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
      <h4>Seguimiento Financiero</h4>

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
                  <div className="form-group">
                    <label htmlFor="client" style={{ height: "15px" }}>
                      Client name
                    </label>
                    <Field as="select" name="client">
                      <option value="">
                        - - - - - - Select client - - - - - -
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
                      Project name{" "}
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
                    <label htmlFor="cup" style={{ height: "15px" }}>
                      {" "}
                      C. U. P.{" "}
                    </label>
                    <Field
                      name="cup"
                      type="text"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      name="cup"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div>
                    <label htmlFor="tiproy" style={{ height: "15px" }}>
                      {" "}
                      Tipo Proyecto: ( Estudio, Ensayo, ...)
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
                      Etapa: ( EO , PES, ... )
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
                      Desarrollo: ( en curso, aprobado, ... )
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
                      Estado Comercial: ( facturado, por cobrar, en desarrollo,
                      ... )
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
                      Status{" "}
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

                  <div className="form-group"></div>
                  <p> </p>
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
          </Formik>
        </div>
      )}
    </div>
  );
};

export default BoardSegfin;
