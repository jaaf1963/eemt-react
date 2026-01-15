// DisplayCompanys.tsx
import { useState, useEffect } from "react";
//import { srv_host } from "../types/user.type";
//const posic = Number(srv_host[0]);
//const ubihost = srv_host[posic];

interface cmpnyProps {
  id: number | undefined;
  name: string | undefined;
}

interface dataProps {
  onCompanysRecibidas: (datos: cmpnyProps) => void;
  entity: string;
  userna: string;
  authen: string;
  rolee: string;
}

function SearchCompanys({
  onCompanysRecibidas,
  entity,
  userna,
  authen,
  rolee,
}: dataProps) {
  //
  const [ubihost, setHubihost] = useState<string>("");

  const handleClick = async () => {
    // Ejemplo de fetch que podría hacer el hijo
    const entyUserStore = entity;
    const textUserStore = userna;
    const authUserStore = authen;
    const textRoleStore = rolee;
    //
    try {
      //
      if (
        textUserStore !== null &&
        textRoleStore !== null &&
        entyUserStore !== null &&
        authUserStore !== null
      ) {
        //
        const dataSearch = {
          srhtext: "search_cpy",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
        };
        //
        const API_URL_BACKEND = ubihost + "/search_companys_react";
        //try {
        // Reemplaza con la URL de tu API de FastAPI
        const response = await fetch(API_URL_BACKEND, {
          method: "POST",
          body: JSON.stringify(dataSearch),
          headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const datosParaEnviar = await response.json();
        // Llamamos a la función del padre
        onCompanysRecibidas(datosParaEnviar.msg);

        //setSearchResult(data);
        //
        //} catch (err) {
        //  console.error("Error al buscar el código:", err);
        //  setError("No se pudo buscar el código. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al hacer fetch:", error);
    }
  };
  // <button onClick={handleClick}>Obtener datos y enviar al padre</button>
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
    //
    handleClick();
    //
  }, []);
  //
  return (
    <div>
      <h4>Companys Hijo</h4>
    </div>
  );
}

export default SearchCompanys;
