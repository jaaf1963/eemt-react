// Frontend (React + TypeScript)
import React, { useState, useEffect } from "react";
import "../styles/InputGroup.css";

// Definir una interfaz para la estructura de un usuario
interface User {
  id: number;
  fname: string;
  lname: string;
  dnicom: string;
  email: string;
  usern: string;
  roles: string;
}

const BoardUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
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
  const API_URL_BACKEND = "http://localhost:5055/update_users_react";
  //
  // 1. Leer usuarios
  const fetchUsers = async () => {
    try {
      const dataUsers = {
        usrtext: "user_update",
        entity: entyUserStore,
        userna: textUserStore,
        authen: authUserStore,
        userup: users,
        action: "READ",
      };
      //
      // Asegúrate que esta URL coincida con tu backend
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataUsers),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      //
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data:", data.msg);
      setUsers(data.msg);
      //
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Inicia leyendo usuarios
  useEffect(() => {
    //
    fetchUsers();
    //
  }, []);

  // 2. Eliminar usuario
  const handleDelete = async (id: number) => {
    try {
      const dataUsers = {
        usrtext: "user_update",
        entity: entyUserStore,
        userna: textUserStore,
        authen: authUserStore,
        dnicom: users,
        userup: users,
        action: "DELETE",
      };
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(dataUsers),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      //
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Volver a cargar la lista después de eliminar
      fetchUsers();
      //
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // 3. Cambiar datos del usuario (ejemplo con prompt)
  const handleUpdate = async (id: number, user: User) => {
    const newFname = prompt(`Nuevo nombre para ${user.fname}:`, user.fname);
    const newLname = prompt(`Nuevo apellido para ${user.lname}:`, user.lname);
    const newEmail = prompt(`Nuevo email para ${user.email}:`, user.email);
    console.log(users);
    if (newLname === null || newFname === null || newEmail === null) return;

    try {
      const updateUsers = {
        usrtext: "user_update",
        entity: entyUserStore,
        userna: textUserStore,
        authen: authUserStore,
        lnames: newLname,
        fnames: newFname,
        emaill: newEmail,
        userup: user.usern,
        action: "UPDATE",
      };
      const response = await fetch(API_URL_BACKEND, {
        method: "POST",
        body: JSON.stringify(updateUsers),
        headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
      });
      //
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Volver a cargar la lista después de actualizar
      fetchUsers();
      //
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }
  //
  //
  return (
    <div>
      <h4>Users list</h4>
      <span style={{ marginLeft: "220px" }}>
        User ---- Role ---- First Names ------ Last Names ------ Email
      </span>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-text">
            <button
              onClick={() => handleUpdate(user.id, user)}
              className="button-upd-edit"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="button-upd-elim"
            >
              Remove
            </button>
            <span className="user-text-name">{user.usern}</span>
            <span className="user-text-email">{user.roles}</span>
            <span className="user-text-name">{user.lname}</span>
            <span className="user-text-email">{user.fname}</span> (
            <span className="user-text-name">{user.email}</span> )
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardUser;

/*
              style={{
                backgroundColor: "cyan",
                width: "80px",
                height: "24px",
                marginRight: "5px",
                borderWidth: "0px",
                borderRadius: "4px",
                transform: "scale(1.05)",
              }}


              style={{
                backgroundColor: "orange",
                width: "80px",
                height: "24px",
                marginRight: "5px",
                borderWidth: "0px",
                borderRadius: "4px",
              }}

*/
