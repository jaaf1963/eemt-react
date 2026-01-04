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

//----- LOGIN --------

const API_URL_LOGIN = "http://localhost:5055/login_user_react";

export const LoginFetch = (username: string, password: string): FetchMsg => {
  const [result, setResult] = useState<boolean>(false);
  const [msgFetch, setMsgFetch] = useState<string>("");
  //
  const postData: PostData = {
    entty: "EMM",
    insta: "authenticate",
    usern: username,
    passw: password,
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
      //
      try {
        // Simula una llamada a una API
        const response = await fetch(API_URL_LOGIN, requestOptions);
        const data = await response.json();
        console.log("Success:", data);
        //
        // Handle the successful response for REGISTER
        //
        setResult(true);
        setMsgFetch("Success");
        localStorage.setItem("user", JSON.stringify(data));
        //
      } catch (error) {
        setResult(false);
        setMsgFetch("Error during fetch.");
        console.error("Catch: Error during fetch:", error);
        //
      } finally {
        setResult(false);
        setMsgFetch("");
        console.error("finally");
        //setLoading(false); // Finaliza la carga
      }
    };
    fetchData();
    //
  }, []);

  return { result: result, msg: msgFetch };
};
