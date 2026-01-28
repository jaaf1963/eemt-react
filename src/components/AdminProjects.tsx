// AdminClients.tsx
import React, { useState, useCallback, useEffect } from "react";
import ProjectsDisplay from "./DisplayProjects";
import BoardProject from "./BoardProject";

type ComponenteActual = "A" | "B" | null;

const AdminProjects: React.FC = () => {
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
        Projects list
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
        New Project
      </button>
      <hr />
      {/* Renderizado condicional del componente activo */}
      <div>
        {componenteActivo === "A" && <ProjectsDisplay />}
        {componenteActivo === "B" && <BoardProject />}
      </div>
    </div>
  );
};

export default AdminProjects;
