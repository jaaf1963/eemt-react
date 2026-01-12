import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { entityOptions } from "../types/user.type";
//import { srv_host } from "../types/user.type";

//const posic = Number(srv_host[0]);
//const ubihost = srv_host[posic];
let numApp;
let apiUrlSrv;
numApp = process.env.REACT_APP_NUM;
if (Number(numApp) === 1) {
  // api web
  apiUrlSrv = process.env.REACT_APP_API;
} else {
  // local
  apiUrlSrv = process.env.REACT_APP_LOC;
}
const ubihost = apiUrlSrv;

//type Props = {};
interface Props {
  onRoleChange: (value: boolean) => void;
}

const Login: React.FC<Props> = ({ onRoleChange }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  let navigate: NavigateFunction = useNavigate();

  const initialValues: {
    username: string;
    password: string;
    entity: string;
  } = {
    username: "",
    password: "",
    entity: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
    entity: Yup.string().required("This field is required!"),
  });

  const handleLogin = async (formValue: {
    username: string;
    password: string;
    entity: string;
  }) => {
    const { username, password, entity } = formValue;

    setMessage("");
    setLoading(true);
    onRoleChange(false);

    const storageDataUser = (item: string, newDat: string) => {
      //setDato(nuevoDato);
      localStorage.setItem(item, newDat);
    };

    interface PostData {
      instance: string;
      entity: string;
      username: string;
      password: string;
      token?: string;
      usrmail?: string;
    }

    const postData: PostData = {
      instance: "authenticate",
      entity: entity,
      username: username,
      password: password,
      //token: tokenusr,
    };
    //
    const API_URL_BACKEND = ubihost + "/login_user_react";
    //-------------
    //
    try {
      const response = await fetch(API_URL_BACKEND, {
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
      // Aquí puedes manejar la respuesta del servidor (por ejemplo, guardar un token)
      //
      if (data.success !== "err") {
        storageDataUser("id", data.data.tkn_id);
        storageDataUser("entity", data.data.tkn_entity);
        storageDataUser("username", data.data.tkn_user);
        storageDataUser("module", data.data.tkn_subsyst);
        storageDataUser("token", data.data.tkn_token);
        storageDataUser("role", data.role);
        storageDataUser("datein", data.data.tkn_datein);
        onRoleChange(true); // Dispara el efecto en el componente padre
        //
        navigate("/profile");
        window.location.reload();
        //
      } else {
        //
        const respMessage = data.msg;

        setLoading(false);
        setMessage(respMessage);
      }
      //
    } catch (error) {
      setLoading(false);
      setMessage("error");
      console.error("Error en el inicio de sesión:", error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
    //
    ////////////////////////////////////////////////////////////////
  };

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
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="entity">Entity</label>
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
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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

export default Login;

/*

            <div className="form-group">
              <label htmlFor="entity">Entity</label>
              <Field name="entity" type="text" className="form-control" />
              <ErrorMessage
                name="entity"
                component="div"
                className="alert alert-danger"
              />
            </div>
*/
