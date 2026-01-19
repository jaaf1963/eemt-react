import React from "react";

// Define las props que espera el componente
interface ModifyProps {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    prof: string;
    role: string;
  };
  onUserDataChange: (newUserData: Partial<any>) => void; // Función para notificar cambios
}

export const UserModify: React.FC<ModifyProps> = ({
  user,
  onUserDataChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Llama a la función del padre, enviando solo el dato modificado
    onUserDataChange({ [name]: value });
  };

  return (
    <div>
      <h2>Componente Hijo</h2>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <br />
      <label>Nombre:</label>
      <input
        type="text"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
      />
      <br />
      <label>Apellido:</label>
      <input
        type="text"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
      />
      <br />
      <label>Profesión:</label>
      <input
        type="text"
        name="prof"
        value={user.prof}
        onChange={handleChange}
      />
      <br />
      <label>Rol:</label>
      <input
        type="text"
        name="role"
        value={user.role}
        onChange={handleChange}
      />
      <p>
        Datos recibidos del padre: {user.firstName} {user.lastName}
      </p>
    </div>
  );
};
