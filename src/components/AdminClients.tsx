// AdminClients.tsx
import React, { useState, useCallback, useEffect } from "react";
import BoardClient from "./BoardClient";
import ClientsDisplay from "./ClientsDisplay";

//type ComponenteActual = 'A' | 'B' | 'C' | null;
type ComponenteActual = "A" | "B" | null;

const AdminClients: React.FC = () => {
  // Estado para saber qué componente está activo
  const [componenteActivo, setComponenteActivo] =
    useState<ComponenteActual>(null);

  // Función para cambiar el componente, optimizada con useCallback
  const mostrarComponente = useCallback((componente: ComponenteActual) => {
    setComponenteActivo(componente);
  }, []);
  //
  //
  useEffect(() => {
    //
    mostrarComponente("A");
    //
  }, []);
  //
  //
  return (
    <div>
      <button
        onClick={() => mostrarComponente("A")}
        className="btn-modifi-user"
        style={{
          width: "100px",
          height: "25px",
          border: "4px",
          color: "blue",
        }}
      >
        Clients list
      </button>{" "}
      <button
        onClick={() => mostrarComponente("B")}
        className="btn-modifi-user"
        style={{
          width: "100px",
          height: "25px",
          border: "4px",
          color: "blue",
        }}
      >
        New Client
      </button>
      {/*<button onClick={() => mostrarComponente('C')}>Mostrar C</button>*/}
      <hr />
      {/* Renderizado condicional del componente activo */}
      <div>
        {componenteActivo === "A" && <ClientsDisplay />}
        {componenteActivo === "B" && <BoardClient />}
        {/*componenteActivo === 'C' && <ComponenteC />*/}
        {/* Alternativamente, puedes usar un Switch o un Objeto de mapeo para más componentes */}
      </div>
    </div>
  );
};

export default AdminClients;
