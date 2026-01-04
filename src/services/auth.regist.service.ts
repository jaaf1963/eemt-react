//import axios from "axios";
import { useEffect, useState } from "react";

interface PostData {
  entty: string;
  insta: string;
  usern: string;
  passw: string;
  token?: string;
  email?: string;
}
type FetchMsg = {
  result: boolean;
  msg: string;
};

//----- REGISTER --------

const API_URL_REGISTER = "http://localhost:5055/register_user_react";

export const RegisterFetch = (
  username: string,
  usremail: string,
  password: string
): FetchMsg => {
  const [result, setResult] = useState<boolean>(false);
  const [msgFetch, setMsgFetch] = useState<string>("");
  //
  const postData: PostData = {
    entty: "EMM",
    insta: "authenticate",
    usern: username,
    passw: password,
    email: usremail,
    //token: tokenusr,
  };

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers like Authorization if needed
    },
    body: JSON.stringify(postData),
  };

  useEffect(() => {
    //
    const fetchData = async () => {
      //setLoading(true); // Inicia la carga
      try {
        // Simula una llamada a una API
        const response = await fetch(API_URL_REGISTER, requestOptions);
        const data = await response.json();
        console.log("Success:", data);
        //
        // Handle the successful response for REGISTER
        //
        setResult(true);
        setMsgFetch(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        //setLoading(false); // Finaliza la carga
      }
    };
    fetchData();
    //
  }, []);

  return { result: result, msg: msgFetch };
};
