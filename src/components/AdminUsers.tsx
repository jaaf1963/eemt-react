// AdminUsers.tsx
import React, { useState, useCallback, useEffect } from "react";
import BoardUsers from "./BoardUsers";
import UsersDisplay from "./DisplayUsers";

//type ComponenteActual = 'A' | 'B' | 'C' | null;
type ComponenteActual = "A" | "B" | null;

const AdminUsers: React.FC = () => {
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
          width: "80px",
          height: "25px",
          border: "4px",
          color: "blue",
        }}
      >
        Users list
      </button>{" "}
      <button
        onClick={() => mostrarComponente("B")}
        className="btn-modifi-user"
        style={{
          width: "80px",
          height: "25px",
          border: "4px",
          color: "blue",
        }}
      >
        New User
      </button>
      {/*<button onClick={() => mostrarComponente('C')}>Mostrar C</button>*/}
      <hr />
      {/* Renderizado condicional del componente activo */}
      <div>
        {componenteActivo === "A" && <UsersDisplay />}
        {componenteActivo === "B" && <BoardUsers />}
        {/*componenteActivo === 'C' && <ComponenteC />*/}
        {/* Alternativamente, puedes usar un Switch o un Objeto de mapeo para más componentes */}
      </div>
    </div>
  );
};

export default AdminUsers;
