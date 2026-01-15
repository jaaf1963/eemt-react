import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  //srv_host,
  entityOptions,
  entypeOptions,
  moduleOptions,
} from "../types/user.type";
//const posic = Number(srv_host[0]);
//const ubihost = srv_host[posic];

interface PickProp {
  field: any;
  form: any;
  // Puedes añadir más propiedades aquí
}

// Componente de campo de fecha personalizado
const DatePickerField = ({ field, form, ...props }: PickProp) => {
  const { setFieldValue } = form;
  return (
    <DatePicker
      {...field}
      {...props}
      selected={field.value}
      onChange={(val) => setFieldValue(field.name, val)}
      inputFormat="yyyy-MM-dd"
      format="yyyy-MM-dd"
      //style={{ width: "270px", height: "25px" }}
    />
  );
};
//
const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [ubihost, setHubihost] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const initialValues = {
    entype: "",
    entity: "",
    eemail: "",
    module: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    passconf: "",
    entini: new Date().toString(),
    entend: new Date().toString(),
    usrmai: "",
    roles: [],
  };

  interface PostData {
    instance?: string;
    entity: string;
    firstname: string;
    lastname: string;
    username: string;
    usrmail?: string;
    password: string;
    passconf?: string;
    eemail: string;
    entype?: string;
    module?: string;
    enttok?: string;
    entini?: string;
    entend?: string;
    roless?: string;
  }

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

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .test(
        "len",
        "The username must be between 2 and 30 characters.",
        (val: any) =>
          val && val.toString().length >= 1 && val.toString().length <= 30
      )
      .required("This field is required!"),
    lastname: Yup.string()
      .test(
        "len",
        "The username must be between 2 and 30 characters.",
        (val: any) =>
          val && val.toString().length >= 1 && val.toString().length <= 30
      )
      .required("This field is required!"),
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    eemail: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passconf: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    entity: Yup.string().required("This field is required!"),
    entype: Yup.string().required("This field is required!"),
    module: Yup.string().required("This field is required!"),
    entini: Yup.string().required("This field is required!"),
    entend: Yup.string().required("This field is required!"),
    //usrmail: Yup.string().required("This field is required!"),
    //  .email("This is not a valid email.")
    //enttok: Yup.string().required("This field is required!"),
    //entity: Yup.string().required("This field is required!"),
  });

  // se asigna PostData a formValue para igualar las variables
  // al desEstructurar los valores ingresados por el usuario
  const handleRegister = async (formValue: PostData) => {
    const {
      entype,
      entity,
      eemail,
      module,
      firstname,
      lastname,
      username,
      //usrmail,
      password,
      //passconf,
      entini,
      entend,
    } = formValue;

    const postData: PostData = {
      instance: "register",
      entype: entype,
      entity: entity,
      eemail: eemail,
      module: module,
      firstname: firstname,
      lastname: lastname,
      username: username,
      usrmail: eemail,
      password: password,
      //passconf: passconf,
      entini: entini,
      entend: entend,
      roless: module?.split("-")[0],
    };

    //-------------
    //console.log(entend);
    const API_URL_REGISTER = ubihost + "/register_user_react";
    //
    try {
      const response = await fetch(API_URL_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
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
    //
  };
  //
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="entype" style={{ height: "15px" }}>
                    Entype
                  </label>
                  <Field as="select" name="entype">
                    <option value="">
                      - - - - - - Select Entity type - - - - - -
                    </option>{" "}
                    {/* Opción por defecto */}
                    {entypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="entype"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="entity" style={{ height: "15px" }}>
                    Entity
                  </label>
                  <Field as="select" name="entity">
                    <option value="">
                      - - - - - - - Select Entity - - - - - - - -
                    </option>{" "}
                    {/* Opción por defecto */}
                    {entityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="entity"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="module" style={{ height: "15px" }}>
                    Module
                  </label>
                  <Field as="select" name="module">
                    <option value="">
                      - - - - - - - Select Module - - - - - -
                    </option>{" "}
                    {/* Opción por defecto */}
                    {moduleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="module"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div>
                  <label htmlFor="entend" style={{ height: "15px" }}>
                    Date End
                  </label>
                  <Field
                    name="entend"
                    component={DatePickerField}
                    placeholderText="Selecciona una fecha"
                  />
                  <ErrorMessage
                    name="entend"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstname" style={{ height: "15px" }}>
                    {" "}
                    First name{" "}
                  </label>
                  <Field
                    name="firstname"
                    type="text"
                    className="form-control"
                    style={{ height: "25px" }}
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname" style={{ height: "15px" }}>
                    {" "}
                    Last name{" "}
                  </label>
                  <Field
                    name="lastname"
                    type="text"
                    className="form-control"
                    style={{ height: "25px" }}
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username" style={{ height: "15px" }}>
                    {" "}
                    Username{" "}
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="form-control"
                    style={{ height: "25px" }}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eemail" style={{ height: "15px" }}>
                    {" "}
                    Entity Email{" "}
                  </label>
                  <Field
                    name="eemail"
                    type="email"
                    className="form-control"
                    style={{ height: "25px" }}
                  />
                  <ErrorMessage
                    name="eemail"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    Password:
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      className="error"
                      name="password"
                      component="div"
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="passconf">
                    Confirm Password:
                    <Field
                      name="passconf"
                      type="password"
                      className="form-control"
                      style={{ height: "25px" }}
                    />
                    <ErrorMessage
                      className="error"
                      name="passconf"
                      component="div"
                    />
                  </label>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
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
    </div>
  );
};

export default Register;
