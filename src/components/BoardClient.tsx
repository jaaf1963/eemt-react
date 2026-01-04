import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CompanyImage from "../services/companyImage";

//import IRegist from "../types/user.type";
import {
  //entityOptions,
  entypeOptions,
  //moduleOptions,
} from "../types/user.type";

//
const BoardClient: React.FC = () => {
  //const [inputValue, setInputValue] = useState<string>(initialValue);
  //const [adminUserRole, setAdminUserRole] = useState<boolean>(false);
  //const [moderUserRole, setModerUserRole] = useState<boolean>(false);
  //
  const [textRoleStore, setTextRoleStore] = useState(() => {
    const roleStore = localStorage.getItem("role");
    if (roleStore) {
      return roleStore;
    }
    return ""; // O un valor por defecto, como { nombre: '', email: '' }
  });
  //
  const [textUserStore, setTextUserStore] = useState(() => {
    const userStore = localStorage.getItem("username");
    if (userStore) {
      return userStore;
    }
    return ""; // O un valor por defecto, como { nombre: '', email: '' }
  });
  //
  const [entyUserStore, setEntyUserStore] = useState(() => {
    const entyStore = localStorage.getItem("entity");
    if (entyStore) {
      return entyStore;
    }
    return ""; // O un valor por defecto, como { nombre: '', email: '' }
  });
  //
  const [authUserStore, setAuthUserStore] = useState(() => {
    const authStore = localStorage.getItem("token");
    if (authStore) {
      return authStore;
    }
    return ""; // O un valor por defecto, como { nombre: '', email: '' }
  });
  //
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues = {
    entity: "",
    username: "",
    activity: "",
    company: "",
    dnicom: "",
    owner: "",
    country: "",
    contact: "",
    eemail: "",
    usercpy: "",
    password: "",
    passconf: "",
    dataini: new Date().toString(),
    dataend: new Date().toString(),
  };

  interface PostData {
    instance?: string;
    entity: string;
    username: string;
    activity: string;
    company: string;
    dnicom: string;
    owner: string;
    country: string;
    contact: string;
    eemail: string;
    usercpy?: string;
    password?: string;
    passconf?: string;
    dataini?: string;
    dataend?: string;
    //author?: string;
  }

  const validationSchema = Yup.object().shape({
    company: Yup.string()
      .test(
        "len",
        "The company-name must be between 3 and 35 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 35
      )
      .required("This field is required!"),
    dnicom: Yup.string()
      .test(
        "len",
        "The Owner must be between 3 and 35 characters.",
        (val: any) =>
          val && val.toString().length >= 9 && val.toString().length <= 12
      )
      .required("This field is required!"),
    owner: Yup.string()
      .test(
        "len",
        "The Owner must be between 3 and 35 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 35
      )
      .required("This field is required!"),
    country: Yup.string()
      .test(
        "len",
        "The Country must be between 3 and 25 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 25
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
  });
  //
  // se asigna PostData a formValue para igualar las variables
  // al desEstructurar los valores ingresados por el usuario
  const handleRegisterClient = async (formValue: PostData) => {
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
          activity,
          company,
          dnicom,
          owner,
          country,
          contact,
          eemail,
          //usercpy,
          //password,
          //passconf,
          //dataini,
          //dataend,
        } = formValue;

        const postData: PostData = {
          instance: "company",
          entity: entyUserStore,
          username: textUserStore,
          activity: activity,
          company: company,
          dnicom: dnicom,
          owner: owner,
          country: country,
          contact: contact,
          eemail: eemail,
          usercpy: eemail,
          //dataini: dataini,
          //dataend: dataend,
        };
        //-------------
        const API_URL_REGISTER = "http://localhost:5055/insert_company_react";
        //
        try {
          const response = await fetch(API_URL_REGISTER, {
            method: "POST",
            body: JSON.stringify(postData),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });

          if (!response.ok) {
            // Manejar errores del servidor
            throw new Error(`Error del servidor: ${response.status}`);
          }

          const data = await response.json();
          console.log("Registro exitoso:", data);
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
    //
  };
  //
  return (
    <div className="col-md-12">
      <h4>Client register</h4>
      <div className="card card-container">
        <CompanyImage />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegisterClient}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="activity" style={{ height: "15px" }}>
                    Activity
                  </label>
                  <Field as="select" name="activity">
                    <option value="">
                      - - - - - - Select Activity - - - - - -
                    </option>{" "}
                    {/* Opción por defecto */}
                    {entypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="activity"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div>
                  <label htmlFor="company" style={{ height: "15px" }}>
                    {" "}
                    Client name{" "}
                  </label>
                  <Field
                    name="company"
                    type="text"
                    className="form-control"
                    style={{ height: "25px" }}
                  />
                  <ErrorMessage
                    name="company"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dnicom" style={{ height: "15px" }}>
                    {" "}
                    DNI client{" "}
                  </label>
                  <Field
                    name="dnicom"
                    type="text"
                    //format="###-###-###-#"
                    placeholder="xxx-xxx-xxx-x"
                    className="form-control"
                    //onChange={handleChange}
                    style={{ height: "25px" }}
                  />
                  <ErrorMessage
                    name="dnicom"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="owner" style={{ height: "15px" }}>
                    {" "}
                    Owner name{" "}
                  </label>
                  <Field
                    name="owner"
                    type="text"
                    className="form-control"
                    style={{ height: "25px" }}
                  />
                  <ErrorMessage
                    name="owner"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country" style={{ height: "15px" }}>
                    {" "}
                    Country client{" "}
                  </label>
                  <Field
                    name="country"
                    type="text"
                    className="form-control"
                    style={{ height: "25px" }}
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact" style={{ height: "15px" }}>
                    {" "}
                    Contact client{" "}
                  </label>
                  <Field
                    name="contact"
                    type="text"
                    className="form-control"
                    style={{ height: "25px" }}
                  />
                  <ErrorMessage
                    name="contact"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eemail" style={{ height: "15px" }}>
                    {" "}
                    Email client{" "}
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
                  <label htmlFor="username" style={{ height: "15px" }}>
                    {" "}
                    User client{" "}
                  </label>
                  <Field
                    name="username"
                    type="text"
                    disabled
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
                  <label htmlFor="password">
                    Password client:
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
    </div>
  );
};

export default BoardClient;
