import React, { useState } from "react";

// Define una interfaz para el resultado que esperas del backend
interface CodigoResultado {
  // Define las propiedades que esperas recibir
  id: number;
  nombre: string;
  // ... otras propiedades
}

// Define los tipos para las propiedades de tu componente (si es necesario)
interface MiComponenteProps {
  // ... props si las hay
}

const MiComponente: React.FC<MiComponenteProps> = () => {
  const [adminUserRole, setAdminUserRole] = useState<boolean>(false);
  const [moderUserRole, setModerUserRole] = useState<boolean>(false);
  const [entyUserStore, setEntyUserStore] = useState<string>("");
  const [textUserStore, setTextUserStore] = useState<string>("");
  const [authUserStore, setAuthUserStore] = useState<string>("");
  const [projectCodemp, setProjectCodemp] = useState<string>("");
  //
  const [codigo, setCodigo] = useState<string>("");
  const [resultado, setResultado] = useState<CodigoResultado | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuscarClick = async () => {
    setError(null);
    setResultado(null);
    //
    const userStore = localStorage.getItem("username");
    const roleStore = localStorage.getItem("role");
    const entyStore = localStorage.getItem("entity");
    const authStore = localStorage.getItem("token");
    //const panelSel = inputsData.panel;
    //
    if (
      roleStore &&
      entyStore !== null &&
      userStore !== null &&
      authStore !== null
    ) {
      //setTextUserStore(userStore);
      const adm: boolean = roleStore === "admin";
      const mod: boolean = roleStore === "moder";
      setAdminUserRole(adm);
      setModerUserRole(mod);
      setTextUserStore(userStore);
      setEntyUserStore(entyStore);
      setAuthUserStore(authStore);
      //

      const dataSearch = {
        buttext: "documents_button",
        entity: entyUserStore,
        userna: textUserStore,
        authen: authUserStore,
        projct: projectCodemp,
      };
      //
      try {
        // Reemplaza con la URL de tu API de FastAPI
        const response = await fetch(
          "http://localhost:5055/search_projects_react",
          {
            method: "POST",
            body: JSON.stringify(dataSearch),
            headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
          }
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setResultado(data);
      } catch (err) {
        console.error("Error al buscar el código:", err);
        setError("No se pudo buscar el código. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Ingresa un código"
      />
      <button onClick={handleBuscarClick}>Buscar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {resultado && (
        <div>
          <h2>Resultado:</h2>
          <p>ID: {resultado.id}</p>
          <p>Nombre: {resultado.nombre}</p>
          {/* Muestra otros resultados según tu interfaz */}
        </div>
      )}
    </div>
  );
};

export default MiComponente;
