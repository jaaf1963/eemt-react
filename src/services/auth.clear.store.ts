const SetClearStore = () => {
  //
  const storageDataUser = (item: string, newDat: string) => {
    //setDato(nuevoDato);
    localStorage.setItem(item, newDat);
  };

  storageDataUser("id", "");
  storageDataUser("entity", "");
  storageDataUser("username", "");
  storageDataUser("module", "");
  storageDataUser("token", "");
  storageDataUser("role", "");
  storageDataUser("datein", "");
  //onRoleChange(false); // Dispara el efecto en el componente padre
  //
  return false;
};

export default SetClearStore;
