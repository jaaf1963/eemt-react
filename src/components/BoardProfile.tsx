import React, { useEffect, useState } from "react";
//import { getCurrentUser } from "../services/auth.local.service";

const BoardProfile: React.FC = () => {
  const [dataId, setDataId] = useState("");
  const [dataEntity, setDataEntity] = useState("");
  const [dataUser, setDataUser] = useState("");
  const [dataModule, setDataModule] = useState("");
  const [dataToken, setDataToken] = useState("");
  const [dataDatein, setDataDatein] = useState("");
  const [dataRole, setDataRole] = useState("");
  //const currentUser = getCurrentUser();

  /*
        storageDataUser("username", data.data.tkn_user);
        storageDataUser("id", data.data.tkn_id);
        storageDataUser("entity", data.data.tkn_entity);
        storageDataUser("module", data.data.tkn_subsyst);
        storageDataUser("token", data.data.tkn_token);
        storageDataUser("datein", data.data.tkn_datein);

*/

  useEffect(() => {
    const idStore = localStorage.getItem("id");
    console.log(idStore);
    if (idStore) {
      setDataId(idStore);
    }
    const entityStore = localStorage.getItem("entity");
    console.log(entityStore);
    if (entityStore) {
      setDataEntity(entityStore);
    }
    const userStore = localStorage.getItem("username");
    console.log(userStore);
    if (userStore) {
      setDataUser(userStore);
    }
    const moduleStore = localStorage.getItem("module");
    if (moduleStore) {
      setDataModule(moduleStore);
    }
    const tokenStore = localStorage.getItem("token");
    if (tokenStore) {
      setDataToken(tokenStore);
    }
    const roleStore = localStorage.getItem("role");
    if (roleStore) {
      setDataRole(roleStore);
    }
    const dateinStore = localStorage.getItem("datein");
    if (dateinStore) {
      setDataDatein(dateinStore);
    }
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{dataUser}</strong> profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {dataId}
      </p>
      <p>
        <strong>Entity:</strong> {dataEntity}
      </p>
      <p>
        <strong>Module:</strong> {dataModule}
      </p>
      <p>
        <strong>Token:</strong> {dataToken?.substring(0, 20)} ...{" "}
        {dataToken.slice(dataToken.length - 20)}
      </p>
      <p>
        <strong>Date In:</strong> {dataDatein}
      </p>
      <strong>Authorities:</strong>
      <p>
        <strong>Role: </strong>
        {dataRole}
      </p>
    </div>
  );
};

export default BoardProfile;

/*
      <strong>Authorities:</strong>
      <ul>
        {currentUser?.roles &&
          currentUser?.roles.map((role: string, index: number) => (
            <li key={index}>{role}</li>
          ))}
      </ul>

*/
