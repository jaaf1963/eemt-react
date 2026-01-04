import React, { useState, useEffect } from "react";

// Define una interfaz para el resultado que esperas del backend
interface CodigoResultado {
  // Define las propiedades que esperas recibir
  id: number;
  name: string;
  // ... otras propiedades
}

// Define los tipos para las propiedades de tu componente (si es necesario)
interface ComponenteProps {
  // ... props si las hay
}

const SearchCompanys: React.FC<ComponenteProps> = () => {
  const [adminUserRole, setAdminUserRole] = useState<boolean>(false);
  const [moderUserRole, setModerUserRole] = useState<boolean>(false);
  //
  //const [searchResult, setSearchResult] = useState<CodigoResultado | null>(null);
  const [searchResult, setSearchResult] = useState<CodigoResultado[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  //
  const [searchCompany, setSearchCompany] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  //
  //
  //
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
  //
  useEffect(() => {
    //
    const handleBuscarClick = async () => {
      setError(null);
      setSearchResult([]);
      //
      if (
        textUserStore !== null &&
        textRoleStore !== null &&
        entyUserStore !== null &&
        authUserStore !== null
      ) {
        const adm: boolean = textRoleStore === "admin";
        const mod: boolean = textRoleStore === "moder";
        setAdminUserRole(adm);
        setModerUserRole(mod);
        setTextUserStore(textUserStore);
        setEntyUserStore(entyUserStore);
        setAuthUserStore(authUserStore);
        //
        const dataSearch = {
          srhtext: "search_cpy",
          entity: entyUserStore,
          userna: textUserStore,
          authen: authUserStore,
        };
        //
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXX");
        console.log("adm:", adminUserRole);
        console.log("usr:", textUserStore);
        console.log("ent:", entyUserStore);
        console.log("aut:", authUserStore);
        const API_URL_BACKEND = "http://localhost:5055/search_companys_react";
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

        const data = await response.json();
        setSearchResult(data);
        //} catch (err) {
        //  console.error("Error al buscar el código:", err);
        //  setError("No se pudo buscar el código. Por favor, inténtalo de nuevo.");
      }
      //}
    };
    //
    //
    handleBuscarClick();
    //
  }, []);
  //

  return (
    <div>
      {showDropdown && searchResult.length > 0 && (
        <ul
          style={{
            border: "1px solid #ccc",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {searchResult.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                // Acción al seleccionar un item
                setSearchCompany(item.name);
                setShowDropdown(false);
              }}
              onMouseOver={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
              style={{
                backgroundColor: hoveredItemId === item.id ? "yellow" : "white", // Cambia el color al hacer hover
                cursor: "pointer",
              }}
            >
              {item.name} {item.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCompanys;
