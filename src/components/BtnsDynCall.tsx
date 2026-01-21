import React from "react";
import { useState, useEffect } from "react";
import DynamicButton from "./BtnsDynamic";

const shad = [
  // desplazX, desplazY, blur, color
  "10px 5px 10px rgba(100, 238, 231, 0.5)",
  "10px 5px 10px rgba(7, 7, 7, 0.5)",
  "10px 5px 10px rgba(241, 7, 15, 0.5)",
  "10px 5px 10px rgba(216, 253, 9, 0.5)",
  "10px 5px 10px rgba(246, 8, 226, 0.49)",
  "10px 5px 10px rgba(162, 10, 244, 0.5)",
];
//-----------------------------------------------------------------------
interface Items {
  panel: string;
  level: string;
  type: string;
  clasname: string;
  buttname: string;
  buttsize: string;
  buttShad: string;
  buttstat: string; //"active" | "inactive" | "disabled";
  flowbutt: string;
}
//-----------------------------------------------------------------------
interface FilterState {
  panel: string;
  level: string | null; // null: Permite que el nivel no este seleccionado
  type: string;
}
//----------------------------------------------------------------------
interface pnlProp {
  pnl: string;
  siz: string;
  hgh: string;
  shd: string;
  tit: string;
  enviarDatoACliEdit: (btnSel: string) => void; // Esta es la función callback
}
// Define una interfaz para el resultado que esperas
interface buttonsProps {
  id: number;
  panel: string;
  level: string;
  type: string;
  clasname: string;
  buttname: string;
  buttsize: string;
  buttstat: string;
  flowbutt: string;
}
//
// Define la interfaz para las props del componente hijo
let contenidoADibujar1: React.ReactNode;
let btnSelect = "";

function BtnsDynCall(pnl: pnlProp) {
  const [buttonSel, setButtonSel] = useState("");
  const [ubihost, setHubihost] = useState<string>("");
  //console.log(panels);
  const [filters, setFilters] = useState<FilterState>({
    panel: pnl.pnl,
    level: null,
    type: "",
  });
  //
  const [buttonsPanel, setButtonsPanel] = useState<buttonsProps[]>([]);
  //const [loading, setLoading] = useState<boolean>(true);
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
  if (!filters) {
    setFilters({
      panel: pnl.pnl,
      level: null,
      type: "",
    });
  }
  //
  //--------------------------------------------------------------------------
  //
  const API_URL_BACKEND = `${ubihost}/search_buttons_react`;
  //const API_URL_BACKEND = "http://localhost:5055/search_buttons_react";
  //
  // 1. Leer botones
  const fetchButtonsPanel = async () => {
    //setLoading(true);
    //
    if (
      textUserStore !== null &&
      entyUserStore !== null &&
      authUserStore !== null
    ) {
      if (
        textRoleStore === "admin" ||
        textRoleStore === "edit" ||
        textRoleStore === "view"
      ) {
        //
        try {
          const dataRead = {
            buttext: "search_buttons",
            entity: entyUserStore,
            userna: textUserStore,
            authen: authUserStore,
            action: "read",
          };
          //
          // Asegúrate que esta URL coincida
          const response = await fetch(API_URL_BACKEND, {
            method: "POST",
            body: JSON.stringify(dataRead),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          });
          //
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          //console.log("data:", data.msg);
          setButtonsPanel(data.msg);
          //
        } catch (error) {
          console.error("Error al obtener paneles:", error);
        } finally {
          //setLoading(false);
        }
      } else {
        alert("No tiene privilegios para modificar datos.");
      }
    }
  };
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
  // Inicia leyendo botones
  // Este 'hayClick' debe estar aqui... no mover
  let hayClick = false;
  //
  useEffect(() => {
    //
    fetchButtonsPanel();
    //
  }, []);

  //
  //--------------------------------------------------------------------------
  //
  // Filtra tabla de 'Botones' sgun 'Panel' con 'state' = "filters.panel"
  //
  //const filteredTable = dataTable.filter((item) => {
  const filteredTable = buttonsPanel.filter((item) => {
    // Filtrar por panel
    const matchesPanel = !filters.panel || item.panel === filters.panel;
    // Filtrar por level (si está definido)
    const matchesLevel = filters.level === null || item.level === filters.level;
    // Filtrar por type
    const matchesType = !filters.type || item.type === filters.type;
    //
    //setFilters({  panel: filters.panel,  level: filters.level,  type: filters.type });
    //
    return matchesPanel && matchesLevel && matchesType;
  });
  //
  //----------------------------------------------------------------------
  //
  const [items, setItems] = useState<Items[]>([]);
  //
  const addItemsRow = (newItem: Items) => {
    // 8. Crear un nuevo array con el nuevo elemento
    setItems((prevItems) => [...prevItems, newItem]);
  };

  if (items.length === 0) {
    //
    // Aqui se almacenan los datos
    filteredTable.map((item) => {
      //
      addItemsRow({
        panel: item.panel,
        level: item.level,
        type: item.type,
        clasname: item.clasname,
        buttname: item.buttname,
        buttsize: item.buttsize,
        buttShad: shad[Number(item.level)],
        buttstat: item.buttstat,
        flowbutt: item.flowbutt,
      });
      //
    });
  }

  const handleAllActive = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item, // Copia todas las propiedades del item anterior
        //isActive: !item.isActive, // Cambia negando el estado si: isActive = true/false
        //buttonStatus: "inactive", //Deja todos los estados en 'activo'
        buttstat: item.buttstat === "disabled" ? "disabled" : "inactive",
        clasname: item.buttstat,
      })),
    );
  };

  // Funcion para cambiar el estado de un boton
  const handleButtonClick = (itemId: string) => {
    // Todos los botones en estado original
    // delivery_buttons();
    handleAllActive();
    //
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.flowbutt === itemId
          ? {
              ...item,
              buttstat: item.buttstat === "disabled" ? "disabled" : "active",
              clasname: item.buttstat,
            }
          : item,
      ),
    );
    //
    // Envio al Padre 'BtnsDynCliEdit'
    //
    btnSelect = itemId;
    // Llama a la función del padre con el dato
    pnl.enviarDatoACliEdit(btnSelect);
    //console.log(btnSelect);
    setButtonSel(itemId);
  };
  //
  //
  if (hayClick === false) {
    contenidoADibujar1 = (
      <div
        style={{
          backgroundColor: pnl.shd, //"#10bfcbff",
          width: pnl.siz, //"265px",
          height: pnl.hgh,
          padding: "5px",
          //overflow: "auto",
        }}
      >
        <h3 style={{ textAlign: "center" }}>{pnl.tit}</h3>

        {items.map((item) => {
          let itemContent;

          if (Number(item.level) === 0) {
            //
            // Button alone
            itemContent = (
              <DynamicButton
                idButton={item.flowbutt}
                clasname={item.clasname}
                buttname={item.buttname}
                buttsize={item.buttsize}
                buttshad={shad[Number(item.level)]}
                buttstat={item.buttstat}
                onClick={() => handleButtonClick(item.flowbutt)}
              />
            );
            //
          } else {
            //
            // Button group
            if (item.panel === "1") {
              <div
                style={{
                  backgroundColor: "#25a4a4cd",
                }}
              ></div>;
            }
            //
            itemContent = (
              <DynamicButton
                idButton={item.flowbutt}
                clasname={item.clasname}
                buttname={item.buttname}
                buttsize={item.buttsize}
                buttshad={shad[Number(item.level)]}
                buttstat={item.buttstat}
                onClick={() => handleButtonClick(item.flowbutt)}
              />
            );
            //
          }
          return <span key={item.flowbutt}>{itemContent}</span>;
        })}
      </div>
    );
    hayClick = true;
    //
  } else {
    //
    contenidoADibujar1 = <span>{buttonSel}</span>;
  }
  return <>{contenidoADibujar1}</>;
  //
}

export default BtnsDynCall;
