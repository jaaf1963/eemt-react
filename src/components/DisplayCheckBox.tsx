import React, { useState, useEffect } from "react";

interface Propfile {
  file: string;
  onFileSelect: (dato: string) => void;
}

const DisplayCheckBox: React.FC<Propfile> = ({ file, onFileSelect }) => {
  // Estado para almacenar la lista de archivos y su estado de selección
  const [files, setFiles] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  //
  // Seleccion de archivos check
  const handleCheckboxChange = (item: string) => {
    // Llama a la función del padre con el nuevo valor
    onFileSelect(item);
    //
    setIsChecked(!isChecked);
    //
  };
  //
  // Despliegue de entrada
  useEffect(() => {
    //
    setFiles(file);
    //
  }, [files]);
  //
  // Función para manejar el cambio del checkbox
  // Esta funcion despliega el file proveniente de la DB
  // y asigna las funciones para manejar la seleccion del usr
  return (
    <div>
      <span>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckboxChange(files)}
          />
          {files}
        </label>
      </span>
    </div>
  );
};

export default DisplayCheckBox;
