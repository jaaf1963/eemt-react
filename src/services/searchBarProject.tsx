import React, { useState, useEffect } from "react";
//import ItemsDropdown from "../components/DropDownProj";

interface SearchResult {
  id: number;
  code: string;
  name: string;
  // ... otras propiedades
}

interface PropsPrjHijo {
  enviarProyectoAlPadre: (mensaje: string) => void;
}

const dataEjem = [
  //{ id: 0, name: "" },
  { id: 1, name: "proyecto electrico AAA" },
  { id: 2, name: "proyecto electrico BBB" },
  { id: 3, name: "proyecto electrico CCC" },
];

let datas: SearchResult[] = [];

function SearchBarProject({ enviarProyectoAlPadre }: PropsPrjHijo) {
  const [searchProject, setSearchProject] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
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

  useEffect(() => {
    if (searchProject.length > 1) {
      // Busca después de 2 caracteres para evitar búsquedas vacías
      const searchBackend = async () => {
        const userStore = localStorage.getItem("username");
        const roleStore = localStorage.getItem("role");
        const entyStore = localStorage.getItem("entity");
        const authStore = localStorage.getItem("token");
        //const panelSel = inputsData.panel;
        const API_URL_BACKEND = "http://localhost:5055/search_projects_react";
        //
        if (
          roleStore &&
          entyStore !== null &&
          userStore !== null &&
          authStore !== null
        ) {
          setTextUserStore(userStore);
          setEntyUserStore(entyStore);
          setAuthUserStore(authStore);
          //
          const dataProject = {
            srhtext: "projects",
            entity: entyUserStore,
            userna: textUserStore,
            authen: authUserStore,
            projct: searchProject,
          };
          try {
            // Reemplaza esta URL con la de tu endpoint de FastAPI
            const response = await fetch(API_URL_BACKEND, {
              method: "POST",
              body: JSON.stringify(dataProject),
              headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
            });
            //const documsResp = await response.json();
            //const data: SearchResult[] = await response.json();
            //
            let datas = await response.json();
            if (datas.success) {
              const data: SearchResult[] = datas.msg;
              setSearchResults(data);
              //setShowDropdown(true);
            }
            //
          } catch (error) {
            console.error("Error fetching search results:", error);
          }
        }
      };
      // Envio del proyecto al Padre
      enviarProyectoAlPadre(searchProject);

      // Debouncing o throttling pueden ser útiles aquí para evitar peticiones excesivas
      const timeoutId = setTimeout(() => {
        //
        searchBackend();
        //
      }, 300);
      // Limpia el timeout al desmontar o si el término de búsqueda cambia de nuevo
      return () => clearTimeout(timeoutId);
      //
    } else {
      //setSearchResults([]);
      //setShowDropdown(false);
      //
      // Codigo de prueba
      //const data = dataEjem;
      //
      const data: SearchResult[] = datas;
      setSearchResults(data);
      setShowDropdown(false);
    }
  }, [searchProject]); //searchProject

  // Input data search
  //const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setSearchTerm(event.target.value);
  //};
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProject(event.target.value);
    if (event.target.value.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleClick = () => {
    setShowDropdown(true);
  };

  // Select item result
  const handleResultClick = (result: SearchResult) => {
    console.log("Resultado seleccionado:", result);
    // Aquí puedes redirigir al usuario, actualizar estado, etc.
    // Opcional: llenar el input con el nombre seleccionado
    setSearchProject(result.code + ", " + result.name);
    setShowDropdown(false);
  };
  //
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchProject}
        onClick={handleClick}
        onChange={handleSearchChange}
        onFocus={() => {
          if (searchProject.length > 0) setShowDropdown(true);
        }}
        // Usa setTimeout para permitir clics en los items del desplegable
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
      />
      {showDropdown && searchResults.length > 0 && (
        <ul
          style={{
            border: "1px solid #ccc",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {searchResults.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                // Acción al seleccionar un item
                setSearchProject(item.name + ", " + item.code);
                setShowDropdown(false);
              }}
              onMouseOver={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
              style={{
                backgroundColor: hoveredItemId === item.id ? "yellow" : "white", // Cambia el color al hacer hover
                cursor: "pointer",
              }}
            >
              {item.name} {item.code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBarProject;

/*
          <ItemsDropdown items={searchResults} />

*/
